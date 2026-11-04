import { Link } from "react-router-dom";

export default function ZoneProjectCard({ project }) {

  const name = project.name_en || project.name_ar || "Project";
  const images = (project.images || []).filter((image) => typeof image === "string");
  const units = project.unitsCount ?? project._count?.units ?? (Array.isArray(project.units) ? project.units.length : null);
  const gyms = project.gymsCount ?? project.gyms;
  const area = project.size ?? project.area;
  const facts = [
    [units ?? "—", "Units", "M3 21V3h12v18M7 7h1m3 0h1M7 11h1m3 0h1M7 15h1m3 0h1M17 9h4v12H3"],
    [typeof gyms === "number" ? gyms : "—", "Gyms", "M3 8v8m3-10v12m12-12v12m3-10v8M6 12h12"],
    [area == null ? "—" : new Intl.NumberFormat("en-US").format(area), "m²", "M4 3v17h17M8 16V8l8 8H8Z"],
  ];
  return (
    <article className="flex h-[529px] w-full max-w-[442px] flex-col overflow-hidden rounded-2xl border border-[#eaeaea] bg-white shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
      <div className="h-[282px] shrink-0 bg-stone-100">{images[0] ? <img src={images[0]} alt={name} loading="lazy" className="h-full w-full object-cover" /> : <p className="flex h-full items-center justify-center text-stone-500">Image unavailable</p>}</div>
      <div className="flex h-9 shrink-0 items-center justify-evenly border-y border-[#eaeaea] font-lato text-sm text-[#a38d74]">
        {facts.map(([value, label, path]) => <span key={label} className="flex flex-1 items-center justify-center gap-2 border-r border-[#ddd] last:border-r-0"><svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5"><path d={path} /></svg>{value} {label}</span>)}
      </div>
      <div className="flex min-h-0 flex-1 flex-col px-4 pb-5 pt-4">
        <h2 className="line-clamp-2 font-playfair text-xl font-semibold text-[#8e1616]">{name}</h2>
        <p className="mt-4 line-clamp-3 font-lato text-sm leading-5 text-[#888]">{project.description_en || project.description_ar || "No description available."}</p>
        <Link to={`/zones/${project.zoneId}/projects/${project.id}`} className="mt-auto flex items-center justify-center min-h-9 rounded-lg border border-[#8e1616] text-sm text-[#8e1616] hover:bg-[#8e1616] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2">View Details</Link>
      </div>
    </article>
  );
}
