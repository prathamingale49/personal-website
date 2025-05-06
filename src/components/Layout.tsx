
import React, { useEffect } from "react";
import { ScrollCircuit } from "./ScrollCircuit";
import { Footer } from "./Footer";
import { Link, useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    // For smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href) {
          document.querySelector(href)?.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-black text-gray-200">
      <div className="fixed top-0 left-0 w-full h-full z-0 opacity-30">
        <ScrollCircuit />
      </div>
      <div className="relative z-10">
        <header className="py-6 px-4 md:px-8 lg:px-16 fixed w-full top-0 bg-black/80 backdrop-blur-md z-20">
          <nav className="flex justify-between items-center max-w-7xl mx-auto">
            <Link to="/" className="text-purple-300 font-bold text-2xl">EE.Portfolio</Link>
            <ul className="hidden md:flex gap-8">
              <li>
                <Link 
                  to="/" 
                  className={`hover:text-purple-400 transition-colors ${location.pathname === '/' ? 'text-purple-400' : ''}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/resume" 
                  className={`hover:text-purple-400 transition-colors ${location.pathname === '/resume' ? 'text-purple-400' : ''}`}
                >
                  Resume
                </Link>
              </li>
              <li>
                <Link 
                  to="/coursework" 
                  className={`hover:text-purple-400 transition-colors ${location.pathname === '/coursework' ? 'text-purple-400' : ''}`}
                >
                  Coursework
                </Link>
              </li>
              <li>
                <Link 
                  to="/career-plan" 
                  className={`hover:text-purple-400 transition-colors ${location.pathname === '/career-plan' ? 'text-purple-400' : ''}`}
                >
                  Career Plan
                </Link>
              </li>
              <li>
                <Link 
                  to="/experience" 
                  className={`hover:text-purple-400 transition-colors ${location.pathname === '/experience' ? 'text-purple-400' : ''}`}
                >
                  Experience
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className={`hover:text-purple-400 transition-colors ${location.pathname === '/about' ? 'text-purple-400' : ''}`}
                >
                  About
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        <main className="pt-24 pb-12">
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
};
