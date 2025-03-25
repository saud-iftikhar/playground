
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        isScrolled 
          ? 'glass-nav py-2' 
          : 'bg-transparent py-4'
      )}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="text-2xl font-bold flex items-center space-x-2"
        >
          <span className={cn(
            "transition-colors duration-300",
            isScrolled ? "text-blue-600" : "text-white"
          )}>
            GuardShift
          </span>
          <span className={cn(
            "font-light transition-colors duration-300",
            isScrolled ? "text-gray-800" : "text-white"
          )}>
            Master
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={cn(
              "font-medium transition-colors duration-300 hover:text-blue-500",
              isScrolled ? "text-gray-700" : "text-white"
            )}
          >
            Home
          </Link>
          <a 
            href="#features" 
            className={cn(
              "font-medium transition-colors duration-300 hover:text-blue-500",
              isScrolled ? "text-gray-700" : "text-white"
            )}
          >
            Features
          </a>
          <a 
            href="#testimonials" 
            className={cn(
              "font-medium transition-colors duration-300 hover:text-blue-500",
              isScrolled ? "text-gray-700" : "text-white"
            )}
          >
            Testimonials
          </a>
          <a 
            href="#contact" 
            className={cn(
              "font-medium transition-colors duration-300 hover:text-blue-500",
              isScrolled ? "text-gray-700" : "text-white"
            )}
          >
            Contact
          </a>
          
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost" className={cn(
                "hover:bg-blue-500/10",
                isScrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-white"
              )}>
                Sign In
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button 
                variant="default" 
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all"
              >
                Dashboard
              </Button>
            </Link>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg 
            className={cn(
              "w-6 h-6 transition-colors duration-300", 
              isScrolled ? "text-gray-800" : "text-white"
            )} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            ) : (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-nav animate-fade-in">
          <div className="container px-4 mx-auto py-4 space-y-4">
            <Link 
              to="/" 
              className="block font-medium text-gray-700 hover:text-blue-500 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <a 
              href="#features" 
              className="block font-medium text-gray-700 hover:text-blue-500 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#testimonials" 
              className="block font-medium text-gray-700 hover:text-blue-500 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Testimonials
            </a>
            <a 
              href="#contact" 
              className="block font-medium text-gray-700 hover:text-blue-500 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </a>
            <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200">
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-blue-600">
                  Sign In
                </Button>
              </Link>
              <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
