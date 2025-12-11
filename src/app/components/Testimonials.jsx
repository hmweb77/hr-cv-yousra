"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      quote: "I got my first interview in just 3 days after the review. The difference was night and day.",
      author: "Sara K.",
      role: "Marketing Assistant",
      rating: 5,
      company: "Multinational Corp"
    },
    {
      quote: "The templates are amazing, but the 99 DH session changed everything! He spotted errors I never noticed.",
      author: "Yassine B.",
      role: "Junior Developer",
      rating: 5,
      company: "Tech Startup"
    },
    {
      quote: "Clear advice, professional layout, and I finally feel confident applying to multinationals.",
      author: "Amine M.",
      role: "Sales Manager",
      rating: 5,
      company: "B2B Solutions"
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div 
        className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" 
        style={{ animationDelay: '2s' }} 
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Success Stories</h2>
          <p className="text-blue-200 text-lg">Real results from real candidates in Morocco.</p>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <TestimonialCard key={idx} review={review} index={idx} />
          ))}
        </div>

        {/* Footer Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-blue-200 text-sm">
            Join 200+ professionals who transformed their careers
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function TestimonialCard({ review, index }) {
  const { quote, author, role, rating, company } = review;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 relative overflow-hidden group"
    >
      {/* Hover gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative z-10">
        {/* Rating Stars */}
        <div className="flex gap-1 text-yellow-400 mb-4">
          {[...Array(rating)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ delay: index * 0.1 + i * 0.05 }}
              viewport={{ once: true }}
            >
              <Star fill="currentColor" size={16} />
            </motion.div>
          ))}
        </div>
        
        {/* Quote */}
        <p className="text-lg italic mb-6 leading-relaxed">{quote}</p>
        
        {/* Author Info */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
            {author.charAt(0)}
          </div>
          <div>
            <p className="font-bold text-sm">{author}</p>
            <p className="text-blue-300 text-xs">{role}</p>
            <p className="text-blue-400 text-xs">{company}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}