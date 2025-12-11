"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu } from 'lucide-react';

export default function Navbar({ openBooking, openDownload }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#benefits', label: 'Benefits' },
    { href: '#how-it-works', label: 'Process' },
    { href: '#testimonials', label: 'Success Stories' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-bold text-blue-900 tracking-tight cursor-pointer"
        >
          Next<span className="text-blue-600">Job</span>
        </motion.div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-gray-600 hover:text-blue-600 transition relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full" />
            </a>
          ))}
          
          <button 
            onClick={openDownload} 
            className="text-blue-600 font-medium hover:text-blue-700 transition"
          >
            Free Templates
          </button>
          
          <motion.button
            onClick={openBooking}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-full font-medium hover:from-blue-700 hover:to-blue-800 transition shadow-lg shadow-blue-600/30 relative overflow-hidden group"
          >
            <span className="relative z-10">Book Review</span>
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
            />
          </motion.button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-gray-700" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b shadow-lg"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-600 hover:text-blue-600 transition"
                >
                  {link.label}
                </a>
              ))}
              
              <button 
                onClick={() => { 
                  openDownload(); 
                  setIsMobileMenuOpen(false); 
                }} 
                className="text-left text-blue-600 font-medium"
              >
                Free Templates
              </button>
              
              <button 
                onClick={() => { 
                  openBooking(); 
                  setIsMobileMenuOpen(false); 
                }} 
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-3 rounded-lg font-medium w-full text-center shadow-lg"
              >
                Book Review (99 DH)
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}