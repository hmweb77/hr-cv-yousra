"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Send, CheckCircle } from 'lucide-react';

export default function DownloadModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Download request for:', email);
      setIsSubmitting(false);
      setSubmitted(true);
      setEmail('');
      
      // Reset after showing success
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 2000);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl text-center"
        >
          <div className="p-8">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600"
            >
              <Download size={36} />
            </motion.div>

            {/* Title */}
            <h3 className="font-bold text-2xl text-gray-900 mb-2">
              Get 5 Free CV Templates
            </h3>
            <p className="text-gray-500 mb-6">
              Professional, ATS-friendly templates sent instantly to your inbox.
            </p>
            
            {/* Features Box */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <p className="text-sm font-semibold text-gray-700 mb-2">Includes:</p>
              <ul className="space-y-1 text-xs text-gray-600">
                {[
                  'Modern & Professional Designs',
                  'ATS-Optimized Formatting',
                  'Easy to Customize',
                  'PDF & Word Formats'
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-green-500 flex-shrink-0" /> 
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Form or Success Message */}
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition disabled:opacity-50"
                  placeholder="Enter your email address"
                />
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="w-full bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white font-bold py-3.5 rounded-lg transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Me The Templates
                    </>
                  )}
                </motion.button>
              </form>
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg"
              >
                <CheckCircle size={24} className="mx-auto mb-2" />
                <p className="font-semibold">Templates Sent!</p>
                <p className="text-sm">Check your inbox</p>
              </motion.div>
            )}

            {/* Close Link */}
            {!submitted && (
              <button
                onClick={onClose}
                className="mt-4 text-sm text-gray-400 hover:text-gray-600 transition"
              >
                No thanks, maybe later
              </button>
            )}
          </div>

          {/* Close Button */}
          {!submitted && (
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
              aria-label="Close modal"
            >
              <X size={20} />
            </motion.button>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}