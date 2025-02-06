import { Link, NavLink } from "react-router-dom";
import ThemeContext from '../contexts/ThemeContext';
import { useNavigate } from "react-router-dom";
import { User, Search, X, Menu, Moon, Sun } from 'lucide-react';
export const API_URL = import.meta.env.VITE_API_URL
import React, { useContext, useState } from 'react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const nav = useNavigate();
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const bgColor = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const textColor = isDarkMode ? 'text-gray-200' : 'text-gray-700';
  const hoverTextColor = isDarkMode ? 'hover:text-gray-100' : 'hover:text-blue-900';
  const activeTextColor = 'text-blue-900';
  const mobileMenuBgColor = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const shadow = isDarkMode ? 'shadow-none' : 'shadow';  
  const buttonBgColor = isDarkMode ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' : 'bg-white text-gray-800 hover:bg-gray-100';

  return (
    <header className={`${shadow} sticky z-50 top-0 transition-all duration-300`}>
      <nav className={`${bgColor} border-gray-200 px-4 lg:px-6 py-2.5 transition-colors duration-300`}>
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl relative">

          <div className="flex items-center justify-between w-full lg:w-auto">
            <Link to="/" className="flex items-center">
              <img
                src={"https://www.creditsea.com/_next/static/media/credit-sea-blue-h-latest.62519644.svg"}
                className="mr-4 h-12"
                alt="Logo"
              />
            </Link>


            <div className="flex items-center lg:hidden">

              <button
                onClick={handleMenuToggle}
                className={`${textColor} focus:outline-none transition-colors duration-300`}
              >
                <Menu size={24} />
              </button>
            </div>
          </div>


          <div
            className={`
              ${isMenuOpen ? 'block' : 'hidden'}
              w-full lg:block lg:w-auto lg:order-1 
              absolute lg:relative left-0 top-full 
              ${mobileMenuBgColor} lg:bg-transparent 
              shadow-lg lg:shadow-none 
              z-50 transition-colors duration-300
            `}
            id="mobile-menu-2"
          >
            <ul className="flex flex-col lg:flex-row lg:space-x-8 p-4 lg:p-0 pt-2 lg:pt-0">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? activeTextColor : textColor
                    } border-b border-gray-100 ${hoverTextColor} lg:hover:bg-transparent lg:border-0  lg:p-0 transition-colors duration-300`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>

                <NavLink
                  to="/fileupload"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? activeTextColor : textColor
                    } border-b border-gray-100 ${hoverTextColor} lg:hover:bg-transparent lg:border-0 lg:p-0 transition-colors duration-300`
                  }
                >
                  Upload
                </NavLink>

              </li>
            </ul>
          </div>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`fixed top-4 right-4 p-2 mt-20 mr-5 rounded-full transition-colors duration-300 ${buttonBgColor} shadow-lg`}
                >
                  {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
                </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
