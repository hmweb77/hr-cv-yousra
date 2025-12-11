"use client"
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  CheckCircle,
  Download,
  Calendar,
  Zap,
  Star
} from 'lucide-react';

export default function Hero({ openBooking, openDownload }) {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 500], [0, 200]);

  const features = [
    { icon: CheckCircle, text: "5+ Years HR Exp" },
    { icon: CheckCircle, text: "200+ CVs Reviewed" },
    { icon: CheckCircle, text: "Weekly Job Offers" }
  ];

  return (
    <section className="relative pt-32 pb-32 lg:pt-48 lg:pb-40 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Animated Background Elements */}
      <motion.div
        style={{ y: yBg }}
        className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-br from-blue-100/40 to-purple-100/40 -skew-x-12 translate-x-32 z-0"
      />
      
      {/* Floating Particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
          style={{
            left: `${20 + i * 20}%`,
            top: `${30 + i * 10}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-xl"
        >
          
          
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6"
          >
            Land Your Next Job{' '}
            <span className="relative inline-block">
              <span className="text-blue-600">Faster</span>
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-3 bg-blue-200/50 -z-10"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.8, duration: 0.6 }}
              />
            </span>
            {' '}With a Professional CV
          </motion.h1>
          
          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg text-gray-600 mb-8 leading-relaxed"
          >
            Get 5 modern CV templates for free, and book a CV Review for only{' '}
            <span className="font-bold text-blue-600">99 DH</span> to stand out instantly.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 mb-10"
          >
            <motion.button
              onClick={openBooking}
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(37, 99, 235, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 relative overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 flex items-center gap-2">
                <Calendar size={20} />
                Book Review — 99 DH
              </span>
            </motion.button>
            
            <motion.button
              onClick={openDownload}
              whileHover={{ scale: 1.05, borderColor: 'rgb(37, 99, 235)' }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-gray-800 border-2 border-gray-200 px-8 py-4 rounded-xl font-semibold shadow-lg flex items-center justify-center gap-2 transition-all"
            >
              <Download size={20} />
              Get Free Templates
            </motion.button>
          </motion.div>

          {/* Feature List */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex  flex-wrap gap-4 text-sm font-medium text-gray-500"
          >
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-1">
                <feature.icon size={16} className="text-green-500" /> 
                {feature.text}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Visual (CV Templates Fan) */}
        <CVTemplatesFan />
      </div>
    </section>
  );
}

function CVTemplatesFan() {
  return (
    <div className="relative h-[400px] lg:h-[500px] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, x: 50, rotate: 10 }}
        animate={{ opacity: 1, x: 0, rotate: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="relative w-64 h-80 lg:w-80 lg:h-[420px]"
      >
        {/* Mock CV Templates with enhanced animations */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ rotate: i * 5, x: i * 10, y: i * 10, opacity: 0 }}
            animate={{
              rotate: [i * 5, i * 5 + 2, i * 5],
              y: [i * 10, i * 10 - 5, i * 10],
              opacity: 1
            }}
            transition={{
              duration: 4,
              delay: i * 0.3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            whileHover={{
              rotate: 0,
              scale: 1.05,
              zIndex: 50,
              transition: { duration: 0.3 }
            }}
            className="absolute top-0 left-0 w-full h-full bg-white rounded-lg shadow-2xl border border-gray-100 p-4 overflow-hidden cursor-pointer"
            style={{
              transformOrigin: "bottom center",
              zIndex: 30 - i * 10
            }}
          >
            {/* CSS Mockup of CV Layout */}
            <div className="h-16 w-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mb-4 mx-auto" />
            <div className="h-4 w-3/4 bg-gray-200 rounded mb-2 mx-auto" />
            <div className="h-3 w-1/2 bg-gray-100 rounded mb-6 mx-auto" />
            <div className="flex gap-2 mb-2">
              <div className="w-1/3 h-32 bg-gray-50 rounded" />
              <div className="w-2/3 h-32 bg-gray-50 rounded" />
            </div>
            <div className="w-full h-20 bg-gray-50 rounded" />
          </motion.div>
        ))}
        
        {/* Floating Success Badge */}
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0, y: [0, -10, 0] }}
          transition={{
            scale: { delay: 1, type: "spring", stiffness: 200 },
            rotate: { delay: 1, type: "spring", stiffness: 200 },
            y: { repeat: Infinity, duration: 2, ease: "easeInOut", delay: 1.5 }
          }}
          className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-2xl border border-gray-100 z-40 flex items-center gap-3"
        >
          <div className="bg-green-100 p-2 rounded-full text-green-600">
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-500">Success Rate</p>
            <p className="font-bold text-gray-800">92% Interviews</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}