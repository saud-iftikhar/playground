
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 z-0"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-10 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-overlay filter blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-blue-300 rounded-full mix-blend-overlay filter blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="container px-4 mx-auto relative z-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <div className="inline-block px-3 py-1 bg-blue-500 bg-opacity-30 backdrop-filter backdrop-blur-sm rounded-full text-blue-50 font-medium text-sm mb-6 animate-fade-in">
              Security Management Simplified
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-fade-up" style={{animationDelay: '0.2s'}}>
              Transform Your <span className="text-blue-300">Security</span> Operations
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-up" style={{animationDelay: '0.4s'}}>
              Streamline guard scheduling, tracking, and management with our intuitive platform designed for modern security operations.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-up" style={{animationDelay: '0.6s'}}>
              <Link to="/dashboard">
                <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl transition-all px-8 py-6 text-lg rounded-lg">
                  Get Started
                </Button>
              </Link>
              <a href="#features">
                <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20 px-8 py-6 text-lg rounded-lg">
                  Learn More
                </Button>
              </a>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 animate-slide-in-right">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl blur opacity-50"></div>
              <div className="glass-card rounded-xl p-1 relative">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Security Dashboard" 
                  className="rounded-lg w-full h-auto shadow-2xl" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden z-20">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
          <path fill="#ffffff" fillOpacity="1" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
