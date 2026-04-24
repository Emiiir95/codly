import React, {
  Children,
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  type HTMLAttributes,
} from "react";
import { animate, type AnimationPlaybackControls } from "framer-motion";

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

const applyTransform = (
  el: HTMLElement,
  x: number,
  y: number,
  z: number,
  skew: number,
) => {
  el.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${z}px) skewY(${skew}deg)`;
};

type Ease = [number, number, number, number];

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
            ease: [0.34, 1.56, 0.64, 1] as Ease,
            durDrop: 2,
            durMove: 2,
            durReturn: 2,
            promoteOverlap: 0.9,
            returnDelay: 0.05,
          }
        : {
            ease: [0.4, 0, 0.6, 1] as Ease,
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
  const activeAnims = useRef<AnimationPlaybackControls[]>([]);
  const phaseTimeouts = useRef<number[]>([]);
  const intervalRef = useRef<number | undefined>(undefined);
  const swapRef = useRef<(() => void) | null>(null);
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
      const s = makeSlot(i, cardDistance, verticalDistance, total);
      applyTransform(el, s.x, s.y, s.z, skewAmount);
      el.style.zIndex = String(s.zIndex);
      el.style.transformOrigin = "center center";
    });

    const cancelActive = () => {
      activeAnims.current.forEach((a) => a.stop());
      activeAnims.current = [];
      phaseTimeouts.current.forEach((id) => window.clearTimeout(id));
      phaseTimeouts.current = [];
    };

    const swap = () => {
      if (order.current.length < 2) return;
      if (isAnimatingRef.current) return;

      const [front, ...rest] = order.current;
      const elFront = els[front];
      if (!elFront) return;

      isAnimatingRef.current = true;

      // Phase 1 — drop front from slot 0 (x=0, y=0, z=0) down by 500px.
      const dropAnim = animate(0, 500, {
        duration: config.durDrop,
        ease: config.ease,
        onUpdate: (v) => applyTransform(elFront, 0, v, 0, skewAmount),
      });
      activeAnims.current.push(dropAnim);

      const promoteDelayMs = config.durDrop * (1 - config.promoteOverlap) * 1000;

      // Phase 2 — promote rest[i] from slot (i+1) to slot i, with stagger.
      const promoteId = window.setTimeout(() => {
        rest.forEach((idx, i) => {
          const el = els[idx];
          if (!el) return;
          const fromSlot = makeSlot(i + 1, cardDistance, verticalDistance, total);
          const toSlot = makeSlot(i, cardDistance, verticalDistance, total);
          el.style.zIndex = String(toSlot.zIndex);
          const stagId = window.setTimeout(() => {
            const anim = animate(0, 1, {
              duration: config.durMove,
              ease: config.ease,
              onUpdate: (t) => {
                const x = fromSlot.x + (toSlot.x - fromSlot.x) * t;
                const y = fromSlot.y + (toSlot.y - fromSlot.y) * t;
                const z = fromSlot.z + (toSlot.z - fromSlot.z) * t;
                applyTransform(el, x, y, z, skewAmount);
              },
            });
            activeAnims.current.push(anim);
          }, i * 150);
          phaseTimeouts.current.push(stagId);
        });
      }, promoteDelayMs);
      phaseTimeouts.current.push(promoteId);

      // Phase 3 — return dropped front to back slot.
      const returnStartMs = promoteDelayMs + config.durMove * config.returnDelay * 1000;
      const backSlot = makeSlot(total - 1, cardDistance, verticalDistance, total);
      const returnId = window.setTimeout(() => {
        elFront.style.zIndex = String(backSlot.zIndex);
        const anim = animate(0, 1, {
          duration: config.durReturn,
          ease: config.ease,
          onUpdate: (t) => {
            const x = backSlot.x * t;
            const y = 500 + (backSlot.y - 500) * t;
            const z = backSlot.z * t;
            applyTransform(elFront, x, y, z, skewAmount);
          },
        });
        activeAnims.current.push(anim);
      }, returnStartMs);
      phaseTimeouts.current.push(returnId);

      // Release the lock after the full choreography has played out.
      const totalMs =
        Math.max(
          config.durDrop * 1000,
          promoteDelayMs + (rest.length - 1) * 150 + config.durMove * 1000,
          returnStartMs + config.durReturn * 1000,
        ) + 50;
      const releaseId = window.setTimeout(() => {
        order.current = [...rest, front];
        isAnimatingRef.current = false;
      }, totalMs);
      phaseTimeouts.current.push(releaseId);
    };

    swapRef.current = swap;

    if (!clickToAdvance) {
      swap();
      intervalRef.current = window.setInterval(swap, delay);
    }

    const node = container.current;
    if (pauseOnHover && node && !clickToAdvance) {
      const pause = () => {
        activeAnims.current.forEach((a) => a.pause());
        if (intervalRef.current !== undefined) {
          clearInterval(intervalRef.current);
          intervalRef.current = undefined;
        }
      };
      const resume = () => {
        activeAnims.current.forEach((a) => a.play());
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
        cancelActive();
      };
    }
    return () => {
      if (intervalRef.current !== undefined) {
        clearInterval(intervalRef.current);
      }
      cancelActive();
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
