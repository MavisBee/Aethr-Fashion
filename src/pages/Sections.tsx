/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { PRODUCTS } from '../constants';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

interface PageProps {
  onBack: () => void;
}

export function NewArrivals({ onBack }: PageProps) {
  return (
    <div className="min-h-screen bg-secondary pt-32 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={onBack}
          className="mb-12 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent hover:text-primary transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Home
        </button>
        
        <h1 className="text-6xl md:text-8xl font-display uppercase mb-12 leading-tight">
          New <br /> Arrivals
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.slice(0, 3).map((product) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[3/4] overflow-hidden bg-accent mb-4">
                <img 
                  src={product.images.female} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg uppercase font-medium">{product.name}</h3>
                  <p className="text-sm text-accent">${product.price}</p>
                </div>
                <ShoppingBag size={18} className="text-accent hover:text-primary transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Collection({ onBack }: PageProps) {
  return (
    <div className="min-h-screen bg-secondary pt-32 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={onBack}
          className="mb-12 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent hover:text-primary transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Home
        </button>
        
        <h1 className="text-6xl md:text-8xl font-display uppercase mb-12 leading-tight">
          The <br /> Collection
        </h1>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="aspect-[3/4] overflow-hidden bg-accent">
              <img 
                src={product.images.male} 
                alt={product.name} 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function About({ onBack }: PageProps) {
  return (
    <div className="min-h-screen bg-secondary pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={onBack}
          className="mb-12 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent hover:text-primary transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Home
        </button>
        
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-accent">Est. 2024 — Milano</span>
            <h1 className="text-7xl md:text-9xl font-display uppercase leading-[0.85] tracking-tighter">
              The <br /> Future <br /> of Form
            </h1>
            <p className="text-xl leading-relaxed text-accent max-w-md italic font-serif">
              "AETHR is a study of the human silhouette in the digital age, where architecture meets the ethereal."
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="aspect-[4/5] bg-accent/5 overflow-hidden rounded-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=1200" 
              alt="Studio Vision" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>

        {/* Philosophy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
          <div className="space-y-4 border-t border-accent/20 pt-8">
            <span className="text-[10px] font-mono uppercase tracking-widest opacity-50">01 / Vision</span>
            <h3 className="text-2xl uppercase font-medium">Digital Craft</h3>
            <p className="text-sm leading-relaxed text-accent">
              We leverage generative algorithms to push the boundaries of traditional pattern making, creating silhouettes that were previously impossible to conceive.
            </p>
          </div>
          <div className="space-y-4 border-t border-accent/20 pt-8">
            <span className="text-[10px] font-mono uppercase tracking-widest opacity-50">02 / Ethos</span>
            <h3 className="text-2xl uppercase font-medium">Radical Intent</h3>
            <p className="text-sm leading-relaxed text-accent">
              Every stitch is a choice. We operate on a zero-inventory model, producing only what is requested, ensuring a circular lifecycle for every garment.
            </p>
          </div>
          <div className="space-y-4 border-t border-accent/20 pt-8">
            <span className="text-[10px] font-mono uppercase tracking-widest opacity-50">03 / Material</span>
            <h3 className="text-2xl uppercase font-medium">Tactile Tech</h3>
            <p className="text-sm leading-relaxed text-accent">
              Our fabrics are sourced from the intersection of nature and science—recycled technical nylons paired with organic, vegetable-dyed silks.
            </p>
          </div>
        </div>

        {/* Process Section */}
        <div className="bg-primary text-secondary p-12 md:p-24 rounded-3xl overflow-hidden relative">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-display uppercase mb-8 leading-tight">
              A Laboratory <br /> for Innovation
            </h2>
            <div className="space-y-6 text-lg opacity-80 leading-relaxed font-light">
              <p>
                Based in the heart of Milan, our studio operates as a laboratory for material innovation and sustainable craftsmanship. We believe that the future of luxury is intimate, ethical, and infinitely adaptable.
              </p>
              <p>
                Our AI Stylist is the gateway to this world—a tool that translates your unique aesthetic DNA into a curated capsule of architectural essentials.
              </p>
            </div>
            <div className="mt-12 flex gap-8">
              <div>
                <p className="text-3xl font-display">100%</p>
                <p className="text-[10px] font-mono uppercase tracking-widest opacity-60">Traceable</p>
              </div>
              <div>
                <p className="text-3xl font-display">0%</p>
                <p className="text-[10px] font-mono uppercase tracking-widest opacity-60">Waste</p>
              </div>
              <div>
                <p className="text-3xl font-display">24/7</p>
                <p className="text-[10px] font-mono uppercase tracking-widest opacity-60">Innovation</p>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-20 pointer-events-none hidden lg:block">
            <img 
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800" 
              alt="Studio Detail" 
              className="w-full h-full object-cover grayscale"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Sustainability({ onBack }: PageProps) {
  return (
    <div className="min-h-screen bg-secondary pt-32 pb-12 px-6">
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={onBack}
          className="mb-12 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent hover:text-primary transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Home
        </button>
        
        <h1 className="text-6xl md:text-8xl font-display uppercase mb-12 leading-tight">
          Ethos
        </h1>
        
        <div className="space-y-12 text-lg leading-relaxed">
          <p className="font-medium text-2xl">
            AETHR is built on the principle of radical transparency and circular design.
          </p>
          <p>
            We believe that luxury should not come at the cost of the planet. Our materials are sourced from certified organic and recycled suppliers, ensuring that every fiber has a minimal environmental footprint.
          </p>
          <div className="grid grid-cols-2 gap-8 py-12 border-y border-accent/20">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest mb-4">Materials</h4>
              <p className="text-sm">100% Organic Cotton<br />Recycled Technical Nylon<br />Vegetable-Tanned Leather</p>
            </div>
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest mb-4">Production</h4>
              <p className="text-sm">Zero-Waste Cutting<br />Local Artisanal Studios<br />Fair Wage Certification</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Contact({ onBack }: PageProps) {
  return (
    <div className="min-h-screen bg-secondary pt-32 pb-12 px-6">
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={onBack}
          className="mb-12 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent hover:text-primary transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Home
        </button>
        
        <h1 className="text-6xl md:text-8xl font-display uppercase mb-12 leading-tight">
          Connect
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest mb-4">Inquiries</h4>
            <p className="text-2xl font-display uppercase">studio@aethr.com</p>
          </div>
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest mb-4">Studio</h4>
            <p className="text-sm">Via della Spiga, 12<br />20121 Milano MI<br />Italy</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Commissions({ onBack }: PageProps) {
  return (
    <div className="min-h-screen bg-secondary pt-32 pb-12 px-6">
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={onBack}
          className="mb-12 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent hover:text-primary transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Home
        </button>
        
        <h1 className="text-6xl md:text-8xl font-display uppercase mb-12 leading-tight">
          Commissioned <br /> Works
        </h1>
        
        <div className="space-y-12 text-lg leading-relaxed">
          <p className="font-medium text-2xl">
            Bespoke tailoring and custom silhouettes for the discerning individual.
          </p>
          <p>
            Our studio offers a limited number of commissioned slots each season. Each piece is developed in collaboration with the client, focusing on unique proportions and rare materials.
          </p>
          <button className="px-8 py-4 bg-primary text-secondary uppercase tracking-widest text-xs font-medium hover:bg-primary/90 transition-colors">
            Request Consultation
          </button>
        </div>
      </div>
    </div>
  );
}
