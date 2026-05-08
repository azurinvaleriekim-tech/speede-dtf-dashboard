export function Ticker({ items }: { items: string[] }) {
  const tickerItems = [...items, ...items];

  return (
    <div className="glass-panel overflow-hidden rounded-lg border-danger/20 bg-danger/5 py-3">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap px-5 text-sm font-bold uppercase tracking-[0.18em] text-white/70">
        {tickerItems.map((item, index) => (
          <span key={`${item}-${index}`}>
            <span className="mr-3 text-danger">Live</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
