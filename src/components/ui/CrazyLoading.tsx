export default function CrazyLoading() {
  return (
    <div className="absolute inset-0 flex h-full w-full  animate-pulse items-center justify-center text-5xl font-bold text-accent">
      <p className="animate-bounce">
        CRAZY <span className="text-6xl text-[#3A4C95]">1</span>oad
        <span className="text-6xl text-[#3A4C95]">1</span>
        ng...
      </p>
    </div>
  );
}
