import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../assets/utils/axios-instance";

function PropertyDetails({ unit }) {
  const [activeImage, setActiveImage] = useState(0);
  const [failedImages, setFailedImages] = useState([]);
  const images = (unit.images || []).filter((image) => typeof image === "string");
  const title = unit.title_en || unit.title_ar || "Property details";
  const price = unit.price == null ? "Price on request" : new Intl.NumberFormat("en-US").format(unit.price) + " EGP";
  const project = unit.project || {};
  const location = [unit.city_en, unit.zoneName_en, project.name_en].filter(Boolean).join(", ");
  const facts = [
    ["Area", unit.size == null ? null : unit.size + " m²"],
    ["Bedrooms", unit.bedrooms],
    ["Bathrooms", unit.bathrooms],
    ["Status", unit.status?.toLowerCase().replaceAll("_", " ")],
    ["Project", project.name_en],
    ["Developer", project.developer?.name_en],
  ].filter(([, value]) => value !== null && value !== undefined && value !== "");
  // Only create contact links when the API supplies a real contact number.
  const phone = String(unit.phone || unit.contactPhone || "").replace(/[^+0-9]/g, "");
  const whatsapp = String(unit.whatsapp || unit.whatsappNumber || phone).replace(/\D/g, "");

  return (
    <main className="mx-auto max-w-[1366px] px-4 pb-20 pt-6 font-lato sm:px-8">
      <Link to="/units" className="mb-5 inline-block text-sm text-[#8e1616] hover:underline">Back to units</Link>
      <div className="relative flex h-[260px] items-center justify-center overflow-hidden rounded-2xl border border-[#eaeaea] bg-stone-100 shadow-[0_4px_4px_rgba(0,0,0,0.25)] sm:h-[420px] lg:h-[550px]">
        {images[activeImage] && !failedImages.includes(images[activeImage]) ? (
          <img src={images[activeImage]} alt={title + " - photo " + (activeImage + 1)} className="h-full w-full object-cover" onError={() => setFailedImages((previous) => [...previous, images[activeImage]])} />
        ) : <p className="text-stone-500">Image unavailable</p>}
      </div>
      {images.length > 1 && <div aria-label="Property photos" className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
        {images.map((image, index) => (
          <button key={image + index} onClick={() => setActiveImage(index)} aria-label={"Show photo " + (index + 1)} aria-pressed={activeImage === index} className={`h-24 overflow-hidden rounded-lg bg-stone-100 shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8e1616] sm:h-32 lg:h-40 ${activeImage === index ? "ring-2 ring-[#8e1616]" : ""}`}>
            <img src={image} alt={title + " thumbnail " + (index + 1)} loading="lazy" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>}
      <div className="mt-10 flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
        <div><h1 className="text-2xl font-bold text-[#a41515] lg:text-3xl">{title}</h1>
          {location && <p className="mt-2 text-sm text-[#888]">{location}</p>}
        </div>
        <p className="shrink-0 text-2xl font-bold text-[#a38d74] lg:text-3xl">{price}</p>
      </div>
      <div className="mt-12 grid gap-10 md:grid-cols-[0.8fr_1.2fr] lg:mt-16">
        <section aria-labelledby="unit-facts"><h2 id="unit-facts" className="mb-5 text-lg font-bold text-[#262222]">At a glance</h2>
          <ul className="list-disc space-y-5 pl-5 text-[#888]">{facts.map(([label, value]) => <li key={label}><span>{label}: </span><span className="capitalize">{value}</span></li>)}</ul>
        </section>
        <section aria-labelledby="unit-overview"><h2 id="unit-overview" className="mb-5 text-lg font-bold text-[#262222]">Overview</h2>
          <p className="whitespace-pre-line text-base leading-8 text-[#888]">{unit.description_en || unit.description_ar || "No description available."}</p>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {whatsapp ? <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-[#009900] px-4 py-3 text-center text-white">Contact via WhatsApp</a> : <button disabled className="cursor-not-allowed rounded-lg bg-[#009900] px-4 py-3 text-white opacity-50">Contact via WhatsApp</button>}
            {phone ? <a href={`tel:${phone}`} className="rounded-lg border border-[#8e1616] px-4 py-3 text-center text-[#8e1616]">Call</a> : <button disabled className="cursor-not-allowed rounded-lg border border-[#8e1616] px-4 py-3 text-[#8e1616] opacity-50">Call</button>}
          </div>
          {(!phone || !whatsapp) && <p className="mt-3 text-sm text-stone-500">Contact details are not provided for this property.</p>}
        </section>
      </div>
    </main>
  );
}

export default function UnitsDetails() {
  const { id } = useParams();
  const [result, setResult] = useState({ id: null, unit: null, error: "" });
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    window.scrollTo({ top: 0, behavior: "instant" });
    api.get("/unit/" + encodeURIComponent(id), { signal: controller.signal, timeout: 20000 })
      .then((response) => {
        const unit = response.data?.data ?? response.data;
        if (!unit || Array.isArray(unit) || !unit.id) throw new Error("Invalid unit response");
        if (!controller.signal.aborted) setResult({ id, unit, error: "" });
      })
      .catch((error) => {
        if (!controller.signal.aborted) setResult({ id, unit: null, error: error.response?.status === 404 ? "This property could not be found." : "Unable to load this property. Please try again." });
      });
    return () => controller.abort();
  }, [id, retry]);
  if (result.id !== id) return <main role="status" className="mx-auto min-h-96 max-w-[1366px] p-8">Loading property details...</main>;
  if (result.error) return <main role="alert" className="mx-auto min-h-96 max-w-[1366px] p-8"><p>{result.error}</p><button onClick={() => { setResult({ id: null, unit: null, error: "" }); setRetry((value) => value + 1); }} className="my-5 mr-5 rounded border border-[#8e1616] px-5 py-2 text-[#8e1616]">Try again</button><Link to="/units" className="text-[#8e1616] underline">Back to units</Link></main>;
  return <PropertyDetails key={id} unit={result.unit} />;
}
