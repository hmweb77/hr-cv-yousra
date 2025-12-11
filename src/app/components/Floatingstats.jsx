"use client"
import React from 'react';
import { motion } from 'framer-motion';

export default function FloatingStats() {
  const stats = [
    { value: "200+", label: "CVs Reviewed" },
    { value: "92%", label: "Interview Rate" },
    { value: "5+", label: "Years Experiencess" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2 }}
      className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-full max-w-2xl px-6 z-20"
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6">
        <div className="grid grid-cols-3 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.4 + idx * 0.1, type: "spring" }}
              className="text-center"
            >
              <div className="text-2xl lg:text-3xl font-bold text-blue-600 mb-1">
                {stat.value}
              </div>
              <div className="text-xs lg:text-sm text-gray-600">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}