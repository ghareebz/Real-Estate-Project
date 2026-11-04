import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../assets/utils/axios-instance";

function ProjectContent({ project, zone }) {
  const [active, setActive] = useState(0);
  const [failed, setFailed] = useState([]);
  const images = (project.images || []).filter((image) => typeof image === "string");
  const name = project.name_en || project.name_ar || "Project";
  const developer = project.developer;
  const logo = developer?.images?.[0];
  const area = (value) => value == null ? "Not provided" : new Intl.NumberFormat("en-US").format(value) + " m\u00b2";
  const facts = [
    ["Plot size", area(project.plotSize ?? project.plot_size)],
    ["Living area", area(project.livingArea ?? project.size ?? project.area)],
    ["Units", project.unitsCount ?? project._count?.units ?? (Array.isArray(project.units) ? project.units.length : null)],
    ["Man-made lakes", project.lakesCount],
    ["Playgrounds", project.playgroundsCount],
    ["Public gyms", project.gymsCount],
    ["Schools", project.schoolsCount],
  ];
  return (
    <>
      <header className="mb-8 text-center"><h1 className="font-playfair text-2xl font-semibold sm:text-3xl">{name} Project</h1><div className="mx-auto mt-2 h-1 w-44 bg-[#c34b4b]" /></header>
      <div className="flex h-[260px] items-center justify-center overflow-hidden rounded-2xl border border-[#eaeaea] bg-stone-100 shadow-[0_4px_4px_rgba(0,0,0,0.25)] sm:h-[420px] lg:h-[550px]">
        {images[active] && !failed.includes(images[active]) ? <img src={images[active]} alt={name + " photo " + (active + 1)} onError={() => setFailed((previous) => [...previous, images[active]])} className="h-full w-full object-cover" /> : <p className="text-stone-500">Image unavailable</p>}
      </div>
      {images.length > 1 && <div aria-label="Project photos" className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
        {images.map((image, index) => <button key={image + index} onClick={() => setActive(index)} aria-label={"Show photo " + (index + 1)} aria-pressed={active === index} className={`h-24 overflow-hidden rounded-lg bg-stone-100 shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8e1616] sm:h-32 lg:h-40 ${active === index ? "ring-2 ring-[#8e1616]" : ""}`}><img src={image} alt={name + " thumbnail " + (index + 1)} loading="lazy" className="h-full w-full object-cover" /></button>)}
      </div>}
      <div className="mt-10 flex items-start justify-between gap-5">
        <div><h2 className="text-2xl font-bold text-[#a41515] lg:text-3xl">{name}</h2>
          <p className="mt-2 text-sm text-[#888]">{zone.name_en || zone.name_ar}</p>
        </div>
        {typeof logo === "string" && <img src={logo} alt={developer.name_en || "Developer"} className="h-16 w-32 object-contain" />}
      </div>
      <div className="mt-12 grid gap-10 md:grid-cols-[0.8fr_1.2fr] lg:mt-16">
        <section aria-labelledby="project-facts"><h2 id="project-facts" className="mb-5 text-lg font-bold">At a glance</h2><ul className="list-disc space-y-5 pl-5 text-[#888]">
          {facts.map(([label, value]) => <li key={label}>{label}: {value ?? "Not provided"}</li>)}
        </ul></section>
        <section aria-labelledby="project-overview"><h2 id="project-overview" className="mb-5 text-lg font-bold">Overview</h2><p className="whitespace-pre-line text-base leading-8 text-[#888]">{project.description_en || project.description_ar || "No description available."}</p></section>
      </div>
    </>
  );
}

export default function ZoneProjectDetails() {
  const { zoneId, projectId } = useParams();
  const key = zoneId + "/" + projectId;
  const [result, setResult] = useState({ key: null });
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    window.scrollTo({ top: 0, behavior: "instant" });
    api.get("/zone", { signal: controller.signal, timeout: 20000 })
      .then((response) => {
        const zones = response.data?.data ?? response.data;
        if (!Array.isArray(zones)) throw new Error("Invalid zones response");
        const zone = zones.find((item) => item.id === zoneId);
        const project = zone?.projects?.find((item) => item.id === projectId);
        if (!controller.signal.aborted) setResult(project ? { key, zone, project } : { key, error: "This project could not be found in this zone." });
      })
      .catch(() => { if (!controller.signal.aborted) setResult({ key, error: "Unable to load project details. Please try again." }); });
    return () => controller.abort();
  }, [zoneId, projectId, key, retry]);
  return (
    <main className="mx-auto max-w-[1366px] px-4 pb-20 pt-8 font-lato sm:px-8">
      {result.key !== key ? <p role="status" className="min-h-96 py-12 text-center text-stone-500">Loading project details...</p>
        : result.error ? <div role="alert" className="min-h-96 py-12 text-center"><p>{result.error}</p><button onClick={() => { setResult({ key: null }); setRetry((value) => value + 1); }} className="mt-4 rounded border border-[#8e1616] px-6 py-2 text-[#8e1616]">Try again</button></div>
        : <ProjectContent key={key} project={result.project} zone={result.zone} />}
      <Link to={`/zones/${zoneId}`} className="mt-10 inline-block text-sm text-[#8e1616] hover:underline">Back to zone projects</Link>
    </main>
  );
}
