/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { ArrowLeft, ArrowRight, ShoppingBag } from 'lucide-react';
import Stylist3D from './Stylist3D';

interface CapsuleRevealProps {
  products: Product[];
  gender: 'male' | 'female';
  onGenderChange: (gender: 'male' | 'female') => void;
  onSelectProduct: (product: Product) => void;
  onAddAllToBag: () => void;
  onBack: () => void;
}

export default function CapsuleReveal({ products, gender, onGenderChange, onSelectProduct, onAddAllToBag, onBack }: CapsuleRevealProps) {
  return (
    <div className="min-h-screen pt-32 pb-12 px-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent hover:text-primary transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Quiz
        </button>

        {/* Gender Toggle */}
        <div className="flex bg-accent/10 p-1 rounded-full border border-accent/20">
          <button 
            onClick={() => onGenderChange('female')}
            className={`px-6 py-2 rounded-full text-[10px] uppercase tracking-widest transition-all ${gender === 'female' ? 'bg-primary text-secondary' : 'text-accent hover:text-primary'}`}
          >
            Female
          </button>
          <button 
            onClick={() => onGenderChange('male')}
            className={`px-6 py-2 rounded-full text-[10px] uppercase tracking-widest transition-all ${gender === 'male' ? 'bg-primary text-secondary' : 'text-accent hover:text-primary'}`}
          >
            Male
          </button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div>
          <h1 className="text-5xl md:text-8xl font-display uppercase leading-[0.85] mb-4">
            The Capsule<br />Reveal
          </h1>
          <p className="text-accent uppercase tracking-widest text-sm">Curated for your {gender} silhouette</p>
        </div>
        
        <div className="flex flex-col items-end gap-6">
          <button 
            onClick={onAddAllToBag}
            className="bg-primary text-secondary px-8 py-4 uppercase tracking-[0.2em] text-xs font-medium flex items-center gap-3 hover:bg-primary/90 transition-colors"
          >
            Add Entire Capsule
            <ShoppingBag size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 md:gap-10">
        {/* Re-integrated 3D Stylist */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="col-span-12 md:col-span-6 lg:col-span-4 aspect-[3/4] bg-accent/5 border border-accent/10 relative overflow-hidden group"
        >
          <div className="absolute inset-0 w-full h-full">
            <Stylist3D gender={gender} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 to-transparent pointer-events-none" />
          <div className="absolute top-6 left-6 z-10">
            <span className="text-[10px] font-mono bg-primary text-secondary px-2 py-1 uppercase tracking-widest">
              3D Silhouette
            </span>
          </div>
          <div className="absolute bottom-6 left-6 right-6 z-10">
            <p className="text-[10px] uppercase tracking-widest text-primary font-bold leading-relaxed">
              Visualizing the {gender} AETHR aesthetic.
            </p>
          </div>
        </motion.div>

        {products.map((product, index) => {
          // Professional fashion grid spans
          const spans = [
            'col-span-12 md:col-span-6 lg:col-span-8 row-span-2', // Hero piece
            'col-span-12 md:col-span-6 lg:col-span-4',           // Side piece
            'col-span-12 md:col-span-6 lg:col-span-4',           // Side piece 2
            'col-span-12 md:col-span-6 lg:col-span-6 row-span-2', // Large vertical
            'col-span-12 md:col-span-6 lg:col-span-6',           // Wide horizontal
          ];
          const spanClass = spans[index % spans.length];

          return (
            <React.Fragment key={product.id}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`${spanClass} group cursor-pointer flex flex-col`}
                onClick={() => onSelectProduct(product)}
              >
                <div className="relative flex-1 overflow-hidden bg-accent mb-6">
                  <img 
                    src={gender === 'female' ? product.images.female : product.images.male} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                  <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                    <div className="bg-secondary p-5 rounded-full shadow-2xl">
                      <ArrowRight size={28} />
                    </div>
                  </div>
                  <div className="absolute top-6 left-6">
                    <span className="text-[10px] font-mono bg-primary text-secondary px-2 py-1 uppercase tracking-widest">
                      {product.category}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-end border-b border-accent/20 pb-4">
                  <div>
                    <h3 className="font-display text-2xl uppercase tracking-tighter leading-none mb-1">{product.name}</h3>
                    <div className="flex gap-2">
                      {product.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[9px] text-accent uppercase tracking-[0.2em]">#{tag}</span>
                      ))}
                    </div>
                  </div>
                  <p className="font-mono text-xl font-medium">${product.price}</p>
                </div>
              </motion.div>

              {/* Aesthetic Filler with Animated Image */}
              {index === 1 && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                  className="hidden lg:block col-span-4 aspect-square overflow-hidden bg-accent/5 self-center relative group"
                >
                  <motion.img 
                    animate={{ 
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ 
                      duration: 10, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800"
                    alt="Studio"
                    className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 flex items-center justify-center p-12">
                    <div className="w-full h-full border border-accent/20 flex items-center justify-center relative z-10">
                      <p className="text-[10px] uppercase tracking-[0.5em] text-primary font-bold rotate-90 whitespace-nowrap">AETHR STUDIO — SS26</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
