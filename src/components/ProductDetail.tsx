/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { X, ShoppingBag, ChevronLeft, ChevronRight, Sparkles, ChevronDown } from 'lucide-react';
import Stylist3D from './Stylist3D';

interface ProductDetailProps {
  product: Product;
  gender: 'male' | 'female';
  onClose: () => void;
  onAddToBag: (product: Product, size: string) => void;
}

export default function ProductDetail({ product, gender, onClose, onAddToBag }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = React.useState('M');
  const [currentImage, setCurrentImage] = React.useState(0);
  const [isStyled, setIsStyled] = React.useState(false);
  const [expandedSection, setExpandedSection] = React.useState<string | null>(null);
  const images = [product.images.female, product.images.male];

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const sections = [
    {
      id: 'details',
      title: 'DETAILS & COMPOSITION',
      content: (
        <ul className="space-y-2 pb-4">
          {product.details.map((detail, i) => (
            <li key={i} className="text-xs text-accent flex items-start gap-3">
              <span className="w-1 h-1 rounded-full bg-primary mt-1.5 flex-shrink-0" />
              {detail}
            </li>
          ))}
        </ul>
      )
    },
    {
      id: 'sourcing',
      title: 'ETHICAL SOURCING',
      content: (
        <div className="text-xs text-accent leading-relaxed pb-4 space-y-2">
          <p>AETHR is committed to radical transparency. This piece was crafted in our Milan studio using 100% certified organic materials.</p>
          <p>We ensure fair wages and zero-waste production cycles for every garment in the collection.</p>
        </div>
      )
    },
    {
      id: 'shipping',
      title: 'SHIPPING & RETURNS',
      content: (
        <div className="text-xs text-accent leading-relaxed pb-4 space-y-2">
          <p>Complimentary express shipping on all orders over $500. Standard delivery within 3-5 business days.</p>
          <p>Returns are accepted within 14 days of delivery. Items must be in original condition with all tags attached.</p>
        </div>
      )
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-secondary overflow-y-auto"
    >
      <div className="sticky top-0 z-10 flex justify-between items-center p-6 bg-secondary/80 backdrop-blur-md">
        <button onClick={onClose} className="p-2 hover:bg-accent rounded-full transition-colors">
          <X size={24} />
        </button>
        <span className="font-display uppercase tracking-widest text-sm">Product Detail</span>
        <div className="w-10" /> {/* Spacer */}
      </div>

      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Image Gallery / 3D Stylist */}
        <div className="lg:w-2/3 relative h-[70vh] lg:h-screen bg-accent/5">
          <div className="w-full h-full overflow-hidden relative">
            {isStyled ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full h-full"
              >
                <Stylist3D 
                  gender={gender} 
                  isStyled={true}
                  productCategory={product.category}
                />
              </motion.div>
            ) : (
              <motion.img
                key={currentImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                src={images[currentImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          
          {!isStyled && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
              <button 
                onClick={() => setCurrentImage(0)}
                className={`w-2 h-2 rounded-full transition-all ${currentImage === 0 ? 'bg-primary w-8' : 'bg-primary/20'}`}
              />
              <button 
                onClick={() => setCurrentImage(1)}
                className={`w-2 h-2 rounded-full transition-all ${currentImage === 1 ? 'bg-primary w-8' : 'bg-primary/20'}`}
              />
            </div>
          )}

          {/* AI Style Toggle */}
          <div className="absolute top-8 right-8 z-20">
            <button 
              onClick={() => setIsStyled(!isStyled)}
              className={`flex items-center gap-3 px-6 py-3 rounded-full border-2 transition-all shadow-xl ${isStyled ? 'bg-primary text-secondary border-primary' : 'bg-secondary/80 backdrop-blur-md text-primary border-primary/20 hover:border-primary'}`}
            >
              <Sparkles size={18} className={isStyled ? 'animate-pulse' : ''} />
              <span className="text-xs uppercase tracking-widest font-bold">
                {isStyled ? 'Viewing 3D Model' : 'AI Style It'}
              </span>
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:w-1/3 p-8 lg:p-16 flex flex-col justify-center">
          <div className="mb-12">
            <p className="text-xs text-accent uppercase tracking-[0.2em] mb-4">{product.category}</p>
            <h1 className="text-4xl md:text-6xl font-display uppercase leading-none mb-6">{product.name}</h1>
            <p className="font-mono text-2xl mb-8">${product.price}</p>
            <p className="text-accent leading-relaxed max-w-md mb-8">{product.description}</p>
          </div>

          <div className="space-y-12 mb-12">
            {/* Size Selection */}
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-accent mb-4 block">Select Size</span>
              <div className="flex gap-2">
                {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 flex items-center justify-center text-[10px] font-mono border transition-all ${selectedSize === size ? 'bg-primary text-secondary border-primary' : 'bg-white/50 border-accent/20 hover:border-primary'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Expandable Sections */}
            <div className="border-t border-accent/10">
              {sections.map((section) => (
                <div key={section.id} className="border-b border-accent/10">
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full py-6 flex justify-between items-center group"
                  >
                    <span className="text-[10px] uppercase tracking-[0.2em] font-medium group-hover:text-primary transition-colors">
                      {section.title}
                    </span>
                    <ChevronDown 
                      size={14} 
                      className={`text-accent transition-transform duration-300 ${expandedSection === section.id ? 'rotate-180' : ''}`} 
                    />
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: expandedSection === section.id ? 'auto' : 0, opacity: expandedSection === section.id ? 1 : 0 }}
                    className="overflow-hidden"
                  >
                    {section.content}
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={() => onAddToBag(product, selectedSize)}
            className="w-full bg-primary text-secondary py-5 uppercase tracking-[0.3em] text-sm font-medium flex items-center justify-center gap-3 hover:bg-primary/90 transition-all active:scale-[0.98]"
          >
            Add to Bag
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
