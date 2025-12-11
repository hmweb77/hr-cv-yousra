"use client"
import React from 'react';
import { motion } from 'framer-motion';
import {
  Download,
  User,
  Mail,
  ArrowRight,
  Star
} from 'lucide-react';

export default function ValueProp({ openBooking, openDownload }) {
  const features = [
    {
      icon: <Download className="text-blue-600" size={32} />,
      title: "Free CV Templates Pack",
      desc: "Modern, HR-approved templates designed to impress recruiters in seconds.",
      action: "Download Free",
      onClick: openDownload,
      color: "blue"
    },
    {
      icon: <User className="text-purple-600" size={32} />,
      title: "1:1 CV Review — 99 DH",
      desc: "Get personalized guidance, corrections, and real HR feedback to upgrade your CV fast.",
      action: "Book Now",
      onClick: openBooking,
      highlight: true,
      color: "purple"
    },
    {
      icon: <Mail className="text-orange-500" size={32} />,
      title: "Weekly Job Offers",
      desc: "Stop searching endlessly — receive curated job opportunities directly by email.",
      action: "Subscribe Free",
      onClick: () => document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth' }),
      color: "orange"
    }
  ];

  return (
    <section id="benefits" className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-50 rounded-full filter blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Get Noticed
          </h2>
          <p className="text-gray-600 text-lg">
            We provide the tools and expertise to help you navigate the job market.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <FeatureCard key={idx} feature={feature} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, index }) {
  const { icon, title, desc, action, onClick, highlight } = feature;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className={`relative p-8 rounded-2xl border transition-all duration-300 cursor-pointer group ${
        highlight
          ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-2xl shadow-blue-600/30 border-transparent'
          : 'bg-white hover:shadow-2xl border-gray-100'
      }`}
      onClick={onClick}
    >
      {/* Popular Badge */}
      {highlight && (
        <div className="absolute -top-4 right-6 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
          <Star size={12} fill="currentColor" /> MOST POPULAR
        </div>
      )}

      {/* Icon */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        className={`p-3 rounded-lg w-fit mb-6 ${
          highlight ? 'bg-white/20' : 'bg-gray-50'
        }`}
      >
        {React.cloneElement(icon, { 
          className: highlight ? 'text-white' : icon.props.className 
        })}
      </motion.div>

      {/* Title */}
      <h3 className={`text-xl font-bold mb-3 ${
        highlight ? 'text-white' : 'text-gray-900'
      }`}>
        {title}
      </h3>

      {/* Description */}
      <p className={`mb-6 leading-relaxed ${
        highlight ? 'text-blue-100' : 'text-gray-600'
      }`}>
        {desc}
      </p>
      
      {/* Action Button */}
      <button
        className={`font-semibold flex items-center gap-2 group-hover:gap-3 transition-all ${
          highlight 
            ? 'text-white hover:text-blue-100' 
            : 'text-blue-600 hover:text-blue-700'
        }`}
      >
        {action} <ArrowRight size={16} />
      </button>

      {/* Hover effect overlay */}
      {!highlight && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
      )}
    </motion.div>
  );
}