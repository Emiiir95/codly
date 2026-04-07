export default function Background() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-dots" />
      <div className="glow absolute inset-x-0 top-0 h-[60vh]" />
    </div>
  );
}
