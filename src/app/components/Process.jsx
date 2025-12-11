"use client"
import React from 'react';
import { motion } from 'framer-motion';
import {
  Download,
  Target,
  Calendar,
  TrendingUp,
  ArrowRight
} from 'lucide-react';

export default function Process({ openBooking }) {
  const steps = [
    {
      num: "01",
      title: "Download Templates",
      desc: "Choose a clean structure that fits your profile from our free pack.",
      icon: <Download size={24} />
    },
    {
      num: "02",
      title: "Update Your CV",
      desc: "Fill it with your experience, skills, and achievements.",
      icon: <Target size={24} />
    },
    {
      num: "03",
      title: "Book Review (99DH)",
      desc: "Get expert feedback and corrections in real time via Google Meet.",
      icon: <Calendar size={24} />
    },
    {
      num: "04",
      title: "Apply Confidently",
      desc: "Start getting interviews. Recruiters notice quality instantly.",
      icon: <TrendingUp size={24} />
    },
  ];

  return (
    <section id="how-it-works" className="py-20 overflow-hidden bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-4">
            A Simple & Effective Process
          </h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            From template to interview-ready in 4 easy steps
          </p>
        </motion.div>
        
        <div className="relative max-w-5xl mx-auto">
          {/* Connecting Line (Desktop) */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            viewport={{ once: true }}
            className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-blue-200 z-0"
            style={{ transformOrigin: 'left center' }}
          />

          {/* Steps Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <ProcessCard key={idx} step={step} index={idx} />
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <motion.button
            onClick={openBooking}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-xl font-semibold shadow-2xl shadow-blue-600/30 inline-flex items-center gap-2"
          >
            Start Your Journey <ArrowRight size={20} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

function ProcessCard({ step, index }) {
  const isLastStep = index === 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15 }}
      viewport={{ once: true }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className="relative z-10 bg-white p-6 rounded-2xl border-2 border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 group"
    >
      <div className="relative">
        {/* Number Badge */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 text-white text-2xl font-bold rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-600/30 relative overflow-hidden"
        >
          <span className="relative z-10">{step.num}</span>
          <div className="absolute inset-0 bg-white/20 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
        </motion.div>
        
        {/* Icon (appears on hover) */}
        <div className="absolute top-0 right-0 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
          {step.icon}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
        {step.title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 text-sm leading-relaxed">
        {step.desc}
      </p>

      {/* Step connector for mobile */}
      {!isLastStep && (
        <div className="lg:hidden absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-blue-200" />
      )}
    </motion.div>
  );
}