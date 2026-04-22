import React, {
  Children,
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  type HTMLAttributes,
} from "react";
import gsap from "gsap";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  customClass?: string;
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ customClass, className, ...rest }, ref) => (
    <div
      ref={ref}
      {...rest}
      className={`card-swap-card-content ${customClass ?? ""} ${className ?? ""}`.trim()}
    />
  ),
);
Card.displayName = "Card";

type Slot = { x: number; y: number; z: number; zIndex: number };

const makeSlot = (
  i: number,
  distX: number,
  distY: number,
  total: number,
): Slot => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
});

const placeNow = (el: HTMLElement, slot: Slot, skew: number) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: "center center",
    zIndex: slot.zIndex,
    force3D: true,
  });

type Props = {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  /** When true, cards only advance on a click on the stack. No auto timer. */
  clickToAdvance?: boolean;
  onCardClick?: (index: number) => void;
  skewAmount?: number;
  easing?: "elastic" | "linear";
  children: React.ReactNode;
};

export default function CardSwap({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  clickToAdvance = false,
  onCardClick,
  skewAmount = 6,
  easing = "elastic",
  children,
}: Props) {
  const config = useMemo(
    () =>
      easing === "elastic"
        ? {
            ease: "elastic.out(0.6,0.9)",
            durDrop: 2,
            durMove: 2,
            durReturn: 2,
            promoteOverlap: 0.9,
            returnDelay: 0.05,
          }
        : {
            ease: "power1.inOut",
            durDrop: 0.8,
            durMove: 0.8,
            durReturn: 0.8,
            promoteOverlap: 0.45,
            returnDelay: 0.2,
          },
    [easing],
  );

  const childArr = useMemo(() => Children.toArray(children), [children]);

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const order = useRef<number[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<number | undefined>(undefined);
  // Holds the latest `swap` implementation so event handlers attached on
  // the container can trigger it without re-registering on every render.
  const swapRef = useRef<(() => void) | null>(null);
  // Blocks new swaps while one is running — prevents overlapping GSAP
  // timelines when the user spam-clicks the stack.
  const isAnimatingRef = useRef(false);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = cardRefs.current.filter(
      (el): el is HTMLDivElement => el !== null,
    );
    const total = els.length;
    if (total < 2) return;

    order.current = Array.from({ length: total }, (_, i) => i);

    els.forEach((el, i) => {
      placeNow(el, makeSlot(i, cardDistance, verticalDistance, total), skewAmount);
    });

    const swap = () => {
      if (order.current.length < 2) return;
      if (isAnimatingRef.current) return; // debounce spam clicks

      const [front, ...rest] = order.current;
      const elFront = els[front];
      if (!elFront) return;

      isAnimatingRef.current = true;
      const tl = gsap.timeline({
        onComplete: () => {
          isAnimatingRef.current = false;
        },
      });
      tlRef.current = tl;

      tl.to(elFront, {
        y: "+=500",
        duration: config.durDrop,
        ease: config.ease,
      });

      tl.addLabel("promote", `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el = els[idx];
        if (!el) return;
        const slot = makeSlot(i, cardDistance, verticalDistance, total);
        tl.set(el, { zIndex: slot.zIndex }, "promote");
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease,
          },
          `promote+=${i * 0.15}`,
        );
      });

      const backSlot = makeSlot(
        total - 1,
        cardDistance,
        verticalDistance,
        total,
      );
      tl.addLabel("return", `promote+=${config.durMove * config.returnDelay}`);
      tl.call(
        () => {
          gsap.set(elFront, { zIndex: backSlot.zIndex });
        },
        undefined,
        "return",
      );
      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: config.durReturn,
          ease: config.ease,
        },
        "return",
      );

      tl.call(() => {
        order.current = [...rest, front];
      });
    };

    swapRef.current = swap;

    // Auto-play only when we're not in click-to-advance mode.
    if (!clickToAdvance) {
      swap();
      intervalRef.current = window.setInterval(swap, delay);
    }

    const node = container.current;
    if (pauseOnHover && node && !clickToAdvance) {
      const pause = () => {
        tlRef.current?.pause();
        if (intervalRef.current !== undefined) {
          clearInterval(intervalRef.current);
          intervalRef.current = undefined;
        }
      };
      const resume = () => {
        tlRef.current?.play();
        intervalRef.current = window.setInterval(swap, delay);
      };
      node.addEventListener("mouseenter", pause);
      node.addEventListener("mouseleave", resume);
      return () => {
        node.removeEventListener("mouseenter", pause);
        node.removeEventListener("mouseleave", resume);
        if (intervalRef.current !== undefined) {
          clearInterval(intervalRef.current);
        }
      };
    }
    return () => {
      if (intervalRef.current !== undefined) {
        clearInterval(intervalRef.current);
      }
    };
  }, [
    childArr.length,
    cardDistance,
    verticalDistance,
    delay,
    pauseOnHover,
    clickToAdvance,
    skewAmount,
    config,
  ]);

  return (
    <div
      ref={container}
      className="card-swap-container"
      style={{ width, height }}
      onClick={() => {
        if (clickToAdvance) swapRef.current?.();
      }}
      role={clickToAdvance ? "button" : undefined}
      tabIndex={clickToAdvance ? 0 : undefined}
      onKeyDown={(e) => {
        if (clickToAdvance && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          swapRef.current?.();
        }
      }}
    >
      {childArr.map((child, i) => (
        <div
          key={i}
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
          className="card-swap-card"
          style={{ width, height, cursor: clickToAdvance ? "pointer" : undefined }}
          onClick={(e) => {
            onCardClick?.(i);
            if (clickToAdvance) {
              // Stop duplicate fire — container handler will swap.
              e.stopPropagation();
              swapRef.current?.();
            }
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
