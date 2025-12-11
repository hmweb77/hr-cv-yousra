"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Download, CheckCircle } from 'lucide-react';

export default function FinalCTA({ openBooking, openDownload }) {
  const benefits = [
    { icon: CheckCircle, text: "Money-back guarantee" },
    { icon: CheckCircle, text: "Instant booking" },
    { icon: CheckCircle, text: "200+ reviews" }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white border-t border-gray-200 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-gradient-to-b from-blue-50 to-transparent rounded-full filter blur-3xl opacity-50" />

      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-5xl font-bold mb-4 text-gray-900">
            Ready to Boost Your Chances?
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Join hundreds of professionals who transformed their career with our expert CV review
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            onClick={openBooking}
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(37, 99, 235, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-2xl shadow-blue-600/30 transition inline-flex items-center justify-center gap-2"
          >
            <Calendar size={24} />
            Book Review — Only 99 DH
          </motion.button>
          
          <motion.button
            onClick={openDownload}
            whileHover={{ scale: 1.05, borderColor: 'rgb(37, 99, 235)' }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-gray-800 border-2 border-gray-200 px-10 py-4 rounded-xl font-bold text-lg hover:border-blue-300 transition shadow-lg inline-flex items-center justify-center gap-2"
          >
            <Download size={24} />
            Download Free Templates
          </motion.button>
        </motion.div>

        {/* Benefits List */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500"
        >
          {benefits.map((benefit, idx) => (
            <div key={idx} className="flex items-center gap-1">
              <benefit.icon size={16} className="text-green-500" />
              {benefit.text}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}