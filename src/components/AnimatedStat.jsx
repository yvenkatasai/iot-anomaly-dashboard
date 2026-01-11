import { useAnimatedNumber } from "../hooks/useAnimatedNumber";

export default function AnimatedStat({ label, value, danger }) {
  const animated = useAnimatedNumber(Number(value) || 0);

  return (
    <div
      className="bg-white/5 backdrop-blur-xl border border-white/10
                 rounded-2xl p-6 shadow-xl
                 hover:-translate-y-1 hover:shadow-blue-500/30
                 transition-all duration-300"
    >
      <p className="text-sm text-slate-400">{label}</p>

      <p
        className={`mt-2 text-3xl font-bold ${
          danger ? "text-red-400" : "text-blue-400"
        }`}
      >
        {animated}
      </p>
    </div>
  );
}