import { Link } from "react-router-dom";

function FactIcon({ type }) {
  const paths = {
    bed: "M3 18v-9m18 9v-7H3m3 0V7h6v4m0 0V7h6v4M3 16h18",
    bath: "M3 12h18l-2 6H5l-2-6Zm2 0V5a2 2 0 0 1 4 0m-4 13v2m14-2v2",
    area: "M4 3v17h17M8 16V8l8 8H8Zm-4-9h2m-2 5h2m4 8v-2m5 2v-2",
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5 shrink-0"><path d={paths[type]} /></svg>;
}

export default function UnitCard({ unit }) {

  const title = unit.title_en || "Property";
  const status = (unit.status || "Unknown").toLowerCase().replaceAll("_", " ");
  const images = (unit.images || []).filter((image) => typeof image === "string");
  const price = unit.price == null ? "Price on request" : new Intl.NumberFormat("en-US").format(unit.price) + " EGP";

  return (
    <article className="flex h-[529px] w-full max-w-[442px] flex-col overflow-hidden rounded-2xl border border-[#eaeaea] bg-white shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
      <div className="relative h-[282px] shrink-0 bg-stone-100">
        {images[0] ? <img src={images[0]} alt={title} loading="lazy" className="h-full w-full object-cover" onError={(event) => { event.currentTarget.style.display = "none"; }} /> : <p className="flex h-full items-center justify-center text-stone-500">Image unavailable</p>}
        <span className={`absolute right-3 top-7 rounded px-5 py-1 text-sm font-semibold capitalize text-white ${unit.status === "AVAILABLE" ? "bg-[#18cf00]" : "bg-stone-600"}`}>{status}</span>
      </div>
      <div className="flex h-9 shrink-0 items-center justify-evenly border-y border-[#eaeaea] font-lato text-xs text-[#a38d74] sm:text-sm">
        <span className="flex items-center gap-2"><FactIcon type="bed" />{unit.bedrooms ?? "—"} Bedrooms</span>
        <span className="flex items-center gap-2 border-x border-[#ddd] px-3"><FactIcon type="bath" />{unit.bathrooms ?? "—"} Bathrooms</span>
        <span className="flex items-center gap-2"><FactIcon type="area" />{unit.size ?? "—"} m²</span>
      </div>
      <div className="flex min-h-0 flex-1 flex-col px-4 pb-5 pt-4">
        <div className="flex items-start justify-between gap-3">
          <h2 className="line-clamp-2 font-playfair text-xl font-semibold text-[#8e1616]">{title}</h2>
          <p className="shrink-0 font-lato text-lg font-bold text-[#a38d74]">{price}</p>
        </div>
        <p className="mt-4 line-clamp-3 font-lato text-sm leading-5 text-[#888]">{unit.description_en || "No description available."}</p>
        <Link to={`/units/${unit.id}`} className="mt-auto flex items-center justify-center min-h-9 w-full rounded-lg border border-[#8e1616] text-sm text-[#8e1616] hover:bg-[#8e1616] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2">View Details</Link>
      </div>
    </article>
  );
}
