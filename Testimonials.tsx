
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  position: string;
  company: string;
  image: string;
}

const Testimonials = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      quote: "GuardShift Master transformed how we manage our security teams. Scheduling that used to take days now takes minutes, and our client satisfaction has improved dramatically.",
      author: "Sarah Johnson",
      position: "Operations Director",
      company: "Elite Security Services",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
    },
    {
      id: 2,
      quote: "The real-time reporting feature has been a game-changer for our team. We're able to respond to incidents faster and provide better visibility to our clients.",
      author: "Michael Torres",
      position: "Security Manager",
      company: "Secure Solutions Inc.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
    },
    {
      id: 3,
      quote: "We've reduced overtime costs by 35% since implementing GuardShift Master. The ROI has been incredible, and our guards love the mobile app for checking schedules.",
      author: "Jennifer Lee",
      position: "CEO",
      company: "Guardian Protection",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="section-padding bg-white">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 bg-blue-100 rounded-full text-blue-600 font-medium text-sm mb-6">
            Client Testimonials
          </div>
          <h2 className="section-title gradient-text">Trusted by Security Professionals</h2>
          <p className="section-subtitle">
            Don't just take our word for it. Hear from security management professionals who have transformed their operations with GuardShift Master.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className={`transition-all duration-500 ease-in-out ${
                  index === activeIndex ? 'opacity-100 translate-x-0' : 'absolute opacity-0 translate-x-24 pointer-events-none'
                }`}
              >
                <div className="glass-card rounded-2xl p-8 md:p-12">
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="w-full md:w-1/3">
                      <div className="relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full blur opacity-50"></div>
                        <div className="relative">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.author} 
                            className="rounded-full w-28 h-28 object-cover mx-auto border-2 border-white shadow-lg"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="w-full md:w-2/3 text-center md:text-left">
                      <svg className="w-10 h-10 text-blue-400 mb-4 mx-auto md:mx-0" fill="currentColor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 8c-4.418 0-8 3.582-8 8v12h8v-12h-4c0-2.209 1.791-4 4-4v-4zm20 0c-4.418 0-8 3.582-8 8v12h8v-12h-4c0-2.209 1.791-4 4-4v-4z" />
                      </svg>
                      <p className="text-xl md:text-2xl font-medium text-gray-700 mb-6">"{testimonial.quote}"</p>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">{testimonial.author}</h4>
                        <p className="text-gray-600">{testimonial.position}, {testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-center mt-8 space-x-4">
              <Button 
                variant="outline" 
                onClick={prevTestimonial}
                className="rounded-full w-12 h-12 p-0 flex items-center justify-center border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Button>
              
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex ? 'bg-blue-600 scale-125' : 'bg-blue-200'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
              
              <Button 
                variant="outline" 
                onClick={nextTestimonial}
                className="rounded-full w-12 h-12 p-0 flex items-center justify-center border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
