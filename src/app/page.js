"use client"
import React, { useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ValueProp from './components/ValueProp';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import Newsletter from './components/Newsletter';
import About from './components/About';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import DownloadModal from './components/DownloadModal';

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  // Scroll progress indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const openBooking = () => setIsBookingOpen(true);
  const closeBooking = () => setIsBookingOpen(false);
  const openDownload = () => setIsDownloadOpen(true);
  const closeDownload = () => setIsDownloadOpen(false);

  return (
    <div className="font-sans text-gray-800 bg-white">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 origin-left z-[100]"
        style={{ scaleX }}
      />

      <Navbar openBooking={openBooking} openDownload={openDownload} />
      
      <main>
        <Hero openBooking={openBooking} openDownload={openDownload} />
        <ValueProp openBooking={openBooking} openDownload={openDownload} />
        <BeforeAfterSlider openBooking={openBooking} />
        <Process openBooking={openBooking} />
        <Testimonials />
        <Newsletter />
        <About />
        <FinalCTA openBooking={openBooking} openDownload={openDownload} />
      </main>

      <Footer />

      <BookingModal isOpen={isBookingOpen} onClose={closeBooking} />
      <DownloadModal isOpen={isDownloadOpen} onClose={closeDownload} />
    </div>
  );
}