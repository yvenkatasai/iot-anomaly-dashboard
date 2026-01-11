export default function StatCard({ title, value, danger }) {
  return (
    <div
      className="
        backdrop-blur-xl bg-white/5 border border-white/10
        rounded-2xl p-6 shadow-lg
        hover:scale-[1.02] transition-transform
      "
    >
      <p className="text-sm text-gray-400">{title}</p>

      <p
        className={`mt-2 text-3xl font-bold ${
          danger ? "text-red-400" : "text-blue-400"
        }`}
      >
        {value}
      </p>
    </div>
    
  );
}