"use client"
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, X, ChevronRight } from 'lucide-react';

export default function BeforeAfterSlider({ openBooking }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);

  const handleMove = (e) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    const pageX = e.touches ? e.touches[0].pageX : e.pageX;
    const position = ((pageX - left) / width) * 100;
    setSliderPosition(Math.min(100, Math.max(0, position)));
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            See the Difference
          </h2>
          <p className="text-gray-600">
            Drag the slider to see how a professional review transforms a CV.
          </p>
        </motion.div>

        {/* Slider Container */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
        >
          <div
            ref={containerRef}
            className="relative w-full h-[400px] sm:h-[600px] cursor-col-resize select-none"
            onMouseMove={handleMove}
            onTouchMove={handleMove}
          >
            {/* Professional CV (After) */}
            <ProfessionalCV />

            {/* Unprofessional CV (Before) - Clipped by slider */}
            <div
              className="absolute inset-0 bg-gray-100 border-r-4 border-white overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <UnprofessionalCV />
            </div>

            {/* Slider Handle */}
            <SliderHandle position={sliderPosition} />
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <motion.button
            onClick={openBooking}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-10 py-4 rounded-xl font-semibold hover:from-blue-800 hover:to-blue-700 transition shadow-2xl shadow-blue-900/30"
          >
            Upgrade My CV — Only 99 DH
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

function ProfessionalCV() {
  return (
    <div className="absolute inset-0 bg-white flex flex-col p-8 sm:p-12">
      {/* Header */}
      <div className="flex justify-between items-start border-b-2 border-blue-600 pb-6 mb-6">
        <div>
          <h3 className="text-3xl font-bold text-gray-900">AMINE EL IDRISSI</h3>
          <p className="text-blue-600 font-medium tracking-wide">SENIOR SALES MANAGER</p>
        </div>
        <div className="text-right text-sm text-gray-500 space-y-1 hidden sm:block">
          <p>Casablanca, Morocco</p>
          <p>amine.el@example.com</p>
          <p>+212 600 000 000</p>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-3 gap-8 h-full">
        <div className="col-span-2 space-y-6">
          <div>
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">
              Professional Experience
            </h4>
            <div className="mb-4">
              <div className="flex justify-between font-bold text-gray-800">
                <span>Regional Sales Lead</span>
                <span>2020 - Present</span>
              </div>
              <p className="text-blue-600 text-sm mb-2">TechCorp Solutions, Casablanca</p>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>Increased regional revenue by <strong>45% YoY</strong> through strategic partnership development.</li>
                <li>Managed a high-performing team of 12 sales representatives.</li>
                <li>Implemented CRM optimization reducing lead time by 30%.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Skills Sidebar */}
        <div className="col-span-1 bg-gray-50 p-4 rounded h-full hidden sm:block">
          <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
            Skills
          </h4>
          <div className="flex flex-wrap gap-2">
            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">B2B Sales</span>
            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">Negotiation</span>
            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">Team Leadership</span>
          </div>
        </div>
      </div>

      {/* Badge */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, type: "spring" }}
        className="absolute bottom-6 right-6 bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 shadow-lg"
      >
        <CheckCircle size={16} /> Professional & Clear
      </motion.div>
    </div>
  );
}

function UnprofessionalCV() {
  return (
    <div 
      className="absolute inset-0 w-full h-full p-8 sm:p-12 opacity-60 grayscale blur-[1px] bg-white text-black" 
      style={{ width: '100vw', maxWidth: '896px' }}
    >
      <div className="text-center mb-8">
        <h3 className="text-xl font-serif underline mb-2">Curriculum Vitae</h3>
        <p>Name: Amine El Idrissi</p>
        <p>Address: Casablanca</p>
        <p>Email: amine_bg_1990@hotmail.com</p>
      </div>
      
      <div className="space-y-6 font-serif">
        <div>
          <h4 className="font-bold underline">Work:</h4>
          <p className="text-sm mt-1">
            I worked at TechCorp from 2020 until now as a sales manager. I sold things and talked to clients.
          </p>
          <p className="text-sm mt-1">2018-2020: Salesman at Local Shop.</p>
        </div>
        <div>
          <h4 className="font-bold underline">Hobbies:</h4>
          <p className="text-sm">Football, Reading, Travel, Internet.</p>
        </div>
      </div>

      {/* Badge */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, type: "spring" }}
        className="absolute bottom-6 left-6 bg-red-100 text-red-700 px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 shadow-lg"
      >
        <X size={16} /> Unstructured & Vague
      </motion.div>
    </div>
  );
}

function SliderHandle({ position }) {
  return (
    <motion.div
      animate={{ x: [0, 5, 0] }}
      transition={{ repeat: Infinity, duration: 2 }}
      className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_20px_rgba(0,0,0,0.3)]"
      style={{ left: `${position}%` }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white shadow-xl border-4 border-white">
        <div className="flex gap-0.5">
          <ChevronRight size={16} className="rotate-180" />
          <ChevronRight size={16} />
        </div>
      </div>
    </motion.div>
  );
}