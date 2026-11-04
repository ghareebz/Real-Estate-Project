import { NavLink } from 'react-router-dom'
import logo from "../assets/images/logo.svg";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-3 bg-white px-4 py-3 shadow-sm sm:px-8 sm:py-4">
      
      <div className="flex items-center">
        <img
          src={logo}
          alt="Logo"
          className="h-20 w-20 sm:h-22 sm:w-22"
        />
      </div>

      
      <ul className="order-3 flex w-full flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-medium sm:order-0 sm:w-auto sm:gap-10 sm:text-base">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-[#8B2626] border-b-2 border-[#8B2626] pb-1 font-semibold"
                : "text-gray-600 hover:text-[#8B2626] transition-colors"
            }
          >
            Home
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/units"
            className={({ isActive }) =>
              isActive
                ? "text-[#8B2626] border-b-2 border-[#8B2626] pb-1 font-semibold"
                : "text-gray-600 hover:text-[#8B2626] transition-colors"
            }
          >
            Units
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/zones"
            className={({ isActive }) =>
              isActive
                ? "text-[#8B2626] border-b-2 border-[#8B2626] pb-1 font-semibold"
                : "text-gray-600 hover:text-[#8B2626] transition-colors"
            }
          >
            Zones
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/developers"
            className={({ isActive }) =>
              isActive
                ? "text-[#8B2626] border-b-2 border-[#8B2626] pb-1 font-semibold"
                : "text-gray-600 hover:text-[#8B2626] transition-colors"
            }
          >
            Developers
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/contact-us"
            className={({ isActive }) =>
              isActive
                ? "text-[#8B2626] border-b-2 border-[#8B2626] pb-1 font-semibold"
                : "text-gray-600 hover:text-[#8B2626] transition-colors"
            }
          >
            Contact Us
          </NavLink>
        </li>
      </ul>

      
      <div>
        <NavLink
          to="/register"
          className=" flex h-11.75 w-27.5 items-center justify-center rounded-lg bg-linear-to-r from-[#8E1616] to-[#C34B4B] text-white transition-opacity hover:opacity-90 "
        >
          Register
        </NavLink>
      </div>
    </nav>
  )
}