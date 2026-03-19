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
