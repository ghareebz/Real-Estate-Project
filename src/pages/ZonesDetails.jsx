import api from "../assets/utils/axios-instance";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ZoneProjectCard from "../components/ZoneProjectCard";
import banner from "../assets/images/zone-projects-banner.jpg";

export default function ZonesDetails() {
  const { id } = useParams();
  const [result, setResult] = useState({ id: null, zone: null, error: "" });
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    window.scrollTo({ top: 0, behavior: "instant" });
    api.get("/zone/" + encodeURIComponent(id), { signal: controller.signal, timeout: 20000 })
      .then((response) => {
        const zone = response.data?.data ?? response.data;
        if (!zone || !zone.id || Array.isArray(zone)) throw new Error("Invalid zone response");
        if (!controller.signal.aborted) setResult({ id, zone, error: "" });
      })
      .catch((error) => { if (!controller.signal.aborted) setResult({ id, zone: null, error: error.response?.status === 404 ? "This zone could not be found." : "Unable to load zone projects. Please try again." }); });
    return () => controller.abort();
  }, [id, retry]);
  const loading = result.id !== id;
  const projects = Array.isArray(result.zone?.projects) ? result.zone.projects : [];
  return (
    <main className="mx-auto max-w-[1366px] px-4 pb-24 pt-8 sm:px-8">
      <header className="mb-12 text-center"><h1 className="font-playfair text-3xl font-semibold text-black">Zone Projects</h1><div className="mx-auto mt-2 h-1 w-40 bg-[#c34b4b]" /></header>
      <img src={banner} alt="Residential neighborhood" className="mb-14 aspect-[1367/525] w-full rounded-2xl object-cover" />
      {loading ? <p role="status" className="py-12 text-center text-stone-500">Loading zone projects...</p>
        : result.error ? <div role="alert" className="text-center"><p>{result.error}</p><button onClick={() => { setResult({ id: null, zone: null, error: "" }); setRetry((value) => value + 1); }} className="mt-4 rounded border border-[#8e1616] px-5 py-2 text-[#8e1616]">Try again</button></div>
        : <section aria-label={(result.zone.name_en || "Zone") + " projects"}>
          {projects.length ? <div className="grid grid-cols-1 justify-items-center gap-x-5 gap-y-16 md:grid-cols-2 xl:grid-cols-3">{projects.map((project) => <ZoneProjectCard key={project.id} project={project} />)}</div> : <p className="py-12 text-center text-stone-500">No projects are currently listed for this zone.</p>}
        </section>}
      <Link to="/zones" className="mt-10 inline-block text-sm text-[#8e1616] hover:underline">Back to zones</Link>
    </main>
  );
}
