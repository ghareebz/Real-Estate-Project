import { Link } from 'react-router-dom'
import logo from "../assets/images/Logo.svg";

export default function Footer() {
  return (
    <footer className="bg-[#F8F9FA] text-[#4A5568] py-12 px-6 border-t border-gray-100">
      <div className="max-w-6xl mx-[#auto] grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* Column 1: Logo & Contact Info */}
        <div className="flex flex-col space-y-3">
          {/* Logo Placeholder - Replace with your <img src="path-to-logo.png" /> */}
          <div className="flex flex-col mb-2">
            <img src={logo} alt="logo" width="100"  />
          </div>

          <p className="text-sm font-medium text-[#2D3748]">
            +1 (7635) 547-12-97
          </p>
          <p className="text-sm font-medium text-[#2D3748]">
            support@lift.agency
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-sm font-bold text-[#1A202C] mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-[#718096]">
            <li>
              <Link to="/" className="hover:text-[#8B2626] transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/inventories" className="hover:text-[#8B2626] transition-colors">
                Inventories
              </Link>
            </li>
            <li>
              <Link to="/zones" className="hover:text-[#8B2626] transition-colors">
                Zones
              </Link>
            </li>
            <li>
              <Link to="/developers" className="hover:text-[#8B2626] transition-colors">
                Developers
              </Link>
            </li>
            <li>
              <Link to="/contact-us" className="hover:text-[#8B2626] transition-colors">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: About */}
        <div>
          <h3 className="text-sm font-bold text-[#1A202C] mb-4">About</h3>
          <ul className="space-y-2 text-sm text-[#718096]">
            <li>
              <Link to="/about" className="hover:text-[#8B2626] transition-colors">
                Grand Atlas
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:text-[#8B2626] transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/legal" className="hover:text-[#8B2626] transition-colors">
                Legal
              </Link>
            </li>
            <li>
              <Link to="/help" className="hover:text-[#8B2626] transition-colors">
                Help
              </Link>
            </li>
            <li>
              <Link to="/support" className="hover:text-[#8B2626] transition-colors">
                Support
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Newsletter & Social Icons */}
        <div>
          <h3 className="text-sm font-bold text-[#1A202C] mb-4">Get In touch</h3>
          
          {/* Newsletter Input Form */}
          <form onSubmit={(e) => e.preventDefault()} className="flex mb-6">
            <input
              type="email"
              placeholder="Get product updates"
              className="px-3 py-2 text-sm border border-r-0 border-[#8B2626] rounded-l-md focus:outline-none w-full bg-white text-gray-700 placeholder-gray-400"
            />
            <button
              type="submit"
              className="bg-[#8B2626] hover:bg-[#701f1f] text-white px-4 rounded-r-md flex items-center justify-center transition-colors"
              aria-label="Subscribe"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-5 w-5 shrink-0">
                <path d="M4 12h16m-6-6 6 6-6 6" />
              </svg>
            </button>
          </form>

          {/* Social Media Links */}
          <div className="flex space-x-3">
            <a
              href="#"
              className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-[#8B2626] hover:bg-[#8B2626] hover:text-white transition-colors text-xs"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
                <path d="M5.37 24H.4V7.98h4.97V24ZM2.88 5.8A2.9 2.9 0 1 1 2.9 0a2.9 2.9 0 0 1-.02 5.8ZM24 24h-4.96v-7.8c0-1.86-.04-4.25-2.59-4.25-2.59 0-2.98 2.03-2.98 4.11V24H8.51V7.98h4.76v2.19h.07c.66-1.26 2.28-2.59 4.7-2.59C23.07 7.58 24 10.9 24 15.21V24Z" />
              </svg>
            </a>
            <a
              href="#"
              className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-[#8B2626] hover:bg-[#8B2626] hover:text-white transition-colors text-xs"
              aria-label="Facebook"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
                <path d="M16.04 13.5 16.7 9.2h-4.12V6.41c0-1.18.58-2.33 2.42-2.33h1.87V.42S15.17.13 13.55.13c-3.39 0-5.6 2.05-5.6 5.77v3.3H4.19v4.3h3.76V24h4.63V13.5h3.46Z" />
              </svg>
            </a>
            <a
              href="#"
              className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-[#8B2626] hover:bg-[#8B2626] hover:text-white transition-colors text-xs"
              aria-label="Twitter"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
                <path d="M23.954 4.57a10 10 0 0 1-2.825.775 4.958 4.958 0 0 0 2.163-2.723 9.99 9.99 0 0 1-3.127 1.195 4.916 4.916 0 0 0-8.384 4.482A13.944 13.944 0 0 1 1.64 3.162a4.916 4.916 0 0 0 1.523 6.558A4.904 4.904 0 0 1 .936 9.1v.062a4.918 4.918 0 0 0 3.946 4.818 4.934 4.934 0 0 1-2.224.084 4.925 4.925 0 0 0 4.6 3.42A9.869 9.869 0 0 1 0 19.52a13.94 13.94 0 0 0 7.548 2.212c9.057 0 14.01-7.503 14.01-14.01 0-.213-.005-.425-.014-.636a10.013 10.013 0 0 0 2.46-2.548Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-gray-200/60 pt-6 text-center text-xs text-[#718096]">
        © 2020 Lift Media. All rights reserved
      </div>
    </footer>
  )
}