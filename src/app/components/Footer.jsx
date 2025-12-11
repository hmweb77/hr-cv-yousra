"use client"
import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    { href: '#benefits', label: 'Benefits' },
    { href: '#how-it-works', label: 'Process' },
    { href: '#testimonials', label: 'Reviews' },
  ];

  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 py-12 border-t border-gray-100">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <div className="text-2xl font-bold text-blue-900">
            Next<span className="text-blue-600">Job</span>
          </div>
          
          {/* Footer Links */}
          <nav className="flex gap-6 text-sm text-gray-600">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-blue-600 transition"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        
        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm mt-8 pt-8 border-t border-gray-200">
          <p>&copy; {currentYear} NextJob Morocco. All rights reserved.</p>
          <p className="mt-2">Professional CV Review & Career Guidance Services</p>
        </div>
      </div>
    </footer>
  );
}