"use client"
import React from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Briefcase,
  CheckCircle,
  Clock,
  Target,
  TrendingUp,
  Shield
} from 'lucide-react';

export default function About() {
  const achievements = [
    { icon: Clock, text: "5+ Years Experience" },
    { icon: Target, text: "92% Success Rate" },
    { icon: TrendingUp, text: "200+ CVs Reviewed" },
    { icon: Shield, text: "100% Confidential" }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Image Side */}
          <div className="lg:w-1/2 relative">
            <ProfileImage />
          </div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Meet Your HR Career Guide
            </h2>
            
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Hello! I&apos;m a certified HR specialist with{' '}
                <span className="font-bold text-blue-600">5+ years of experience</span>{' '}
                in recruitment and talent selection across the MENA region.
              </p>
              
              <p>
                I&apos;ve screened <span className="font-bold text-blue-600">thousands of CVs</span> —
                so I know exactly what recruiters look for, what mistakes candidates make
                (that get them rejected instantly), and how to build a CV that actually gets read.
              </p>
              
              <motion.div
                whileHover={{ x: 10 }}
                className="font-medium text-gray-900 border-l-4 border-blue-600 pl-4 py-3 bg-blue-50 rounded-r-lg"
              >
                My goal is simple: Help you get interviews faster, with a clear, honest,
                and professional CV strategy.
              </motion.div>

              {/* Achievement Grid */}
              <div className="grid grid-cols-2 gap-4 pt-6">
                {achievements.map((item, idx) => (
                  <Achievement key={idx} item={item} index={idx} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ProfileImage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="aspect-square rounded-3xl bg-gradient-to-tr from-blue-600 via-purple-600 to-blue-700 p-3 max-w-md mx-auto relative overflow-hidden"
    >
      <div className="w-full h-full bg-white rounded-3xl overflow-hidden flex items-end justify-center bg-gradient-to-b from-gray-50 to-gray-100 relative">
        <User size={200} className="text-gray-300 translate-y-4" />
        
        {/* Decorative Shield Badge */}
        <div className="absolute top-4 right-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
          <Shield className="text-blue-600" size={28} />
        </div>
      </div>
      
      {/* Floating Briefcase */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
        className="absolute top-10 -right-4 bg-white p-4 rounded-xl shadow-2xl"
      >
        <Briefcase className="text-blue-600" size={28} />
      </motion.div>

      {/* Floating Checkmark */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 5, delay: 1 }}
        className="absolute bottom-10 -left-4 bg-white p-4 rounded-xl shadow-2xl"
      >
        <CheckCircle className="text-green-600" size={28} />
      </motion.div>
    </motion.div>
  );
}

function Achievement({ item, index }) {
  const Icon = item.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="flex items-center gap-2 text-sm text-gray-700"
    >
      <div className="text-blue-600">
        <Icon size={20} />
      </div>
      <span>{item.text}</span>
    </motion.div>
  );
}