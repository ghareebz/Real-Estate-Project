import { useState } from "react";

const email = "Grand.Atlas.Support@gmail.com";
function Icon({ type }) {
  const paths = {
    location: "M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0ZM15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
    email: "M3 5h18v14H3V5Zm0 1 9 7 9-7",
    mobile: "M7 2h10v20H7V2Zm4 17h2",
    phone: "m7 3 3 5-3 3c1 3 3 5 6 6l3-3 5 3c0 3-2 5-5 4C8 19 5 16 3 8 2 5 4 3 7 3Z",
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="mt-0.5 h-5 w-5 shrink-0"><path d={paths[type]} /></svg>;
}
function SocialIcon({ type }) {
  if (type === "Facebook") return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M14 22V13h3l.5-4H14V7c0-1 .3-2 2-2h2V1h-3c-4 0-5 2-5 6v2H7v4h3v9Z" /></svg>;
  if (type === "X") return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 3h4l12 18h-4L4 3Zm16 0L4 21" /></svg>;
  if (type === "Instagram") return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>;
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 3v13a4 4 0 1 1-4-4m4-9c0 4 3 6 6 6" /></svg>;
}

export default function ContactSection() {
  const [notice, setNotice] = useState("");
  function handleSubmit(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const body = `Name: ${data.name.trim()}\nEmail: ${data.email.trim()}\nPhone: ${data.phone.trim()}\n\n${data.message.trim()}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent("Website inquiry from " + data.name.trim())}&body=${encodeURIComponent(body)}`;
    setNotice("Your email app will open with your message. Send it there to complete your inquiry.");
  }
  const fieldClass = "mt-2 min-h-14 w-full rounded-lg border border-[#d6d2d2] bg-[#f7f7f7] px-4 py-3 font-lato text-base text-stone-800 outline-none focus:border-[#a41515] focus:ring-2 focus:ring-[#a41515]/15";
  return (
    <section aria-label="Contact information and message form" className="mx-auto grid max-w-[1366px] gap-10 px-4 py-16 sm:px-8 sm:py-24 lg:grid-cols-2 lg:gap-8">
      <div className="font-lato">
        <h2 className="font-playfair text-3xl font-semibold text-black">Contact Information</h2>
        <p className="mt-5 max-w-xl text-base leading-6 text-[#888]">Our team is available for private consultations and off-market inquiries. We operate with absolute discretion to ensure your real estate objectives are met with precision.</p>
        <address className="mt-8 space-y-4 text-base not-italic text-[#a41515]">
          <p className="flex gap-2"><Icon type="location" /><span>Minusio, Lake Maggiore, Switzerland &mdash; ref. LOC1771</span></p>
          <a href={`mailto:${email}`} className="flex items-start gap-2 hover:underline"><Icon type="email" /><span className="break-all">{email}</span></a>
          <a href="tel:01247859622" className="flex items-start gap-2 hover:underline"><Icon type="mobile" />01247859622</a>
          <a href="tel:035987124" className="flex items-start gap-2 hover:underline"><Icon type="phone" />035987124</a>
        </address>
        <h3 className="mt-9 font-playfair text-xl font-semibold text-[#888]">Follow us on social media</h3>
        <div className="mt-4 flex gap-3 text-[#a41515]">{["Facebook", "X", "Instagram", "TikTok"].map((social) => <span key={social} role="img" aria-label={social} title={social} className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#a41515]"><SocialIcon type={social} /></span>)}</div>
        <h3 className="mt-12 font-playfair text-xl font-semibold text-[#888]">Working Hours</h3>
        <dl className="mt-5 grid max-w-sm grid-cols-[110px_1fr] gap-y-3 text-base">{["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"].map((day) => <div key={day} className="contents"><dt className="text-[#a41515]">{day} :</dt><dd className="text-[#888]">9:00AM - 5:00 PM</dd></div>)}</dl>
      </div>
      <form onSubmit={handleSubmit} className="rounded-3xl border border-[#e4e4e4] bg-white p-6 shadow-[0_4px_3px_rgba(0,0,0,0.25)] sm:p-8">
        <h2 className="mb-8 font-playfair text-2xl font-semibold text-black">Send us a message</h2>
        <div className="space-y-5">
          <label className="block font-playfair text-base text-black">Name<input name="name" autoComplete="name" required maxLength={120} className={fieldClass} /></label>
          <label className="block font-playfair text-base text-black">Email<input name="email" type="email" autoComplete="email" required maxLength={254} className={fieldClass} /></label>
          <label className="block font-playfair text-base text-black">Phone<input name="phone" type="tel" autoComplete="tel" required maxLength={40} className={fieldClass} /></label>
          <label className="block font-playfair text-base text-black">Message<textarea name="message" required maxLength={5000} rows={5} className={fieldClass + " min-h-36 resize-y"} /></label>
        </div>
        <button type="submit" className="mt-9 min-h-12 w-full rounded-lg bg-linear-to-r from-[#8e1616] to-[#c34b4b] px-5 py-3 font-playfair text-base font-semibold text-white hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8e1616]">Send Message</button>
        {notice && <p role="status" className="mt-4 font-lato text-sm text-stone-600">{notice}</p>}
      </form>
    </section>
  );
}
