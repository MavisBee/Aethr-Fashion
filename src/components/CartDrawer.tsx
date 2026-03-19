/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, X, Plus, Minus, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

export default function CartDrawer({ isOpen, onClose, items, onUpdateQuantity, onRemove }: CartDrawerProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-secondary z-50 shadow-2xl flex flex-col"
          >
            <div className="p-6 flex justify-between items-center border-b border-accent">
              <h2 className="text-2xl font-display uppercase tracking-widest">Your Bag</h2>
              <button onClick={onClose} className="p-2 hover:bg-accent rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <ShoppingBag size={48} className="opacity-20" />
                  <p className="text-accent uppercase tracking-tighter">Your bag is empty</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-24 h-32 bg-accent overflow-hidden">
                      <img src={item.images.female} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-display text-lg uppercase leading-tight">{item.name}</h3>
                          <button onClick={() => onRemove(item.id)} className="text-accent hover:text-primary">
                            <X size={16} />
                          </button>
                        </div>
                        <p className="text-sm text-accent uppercase tracking-tighter">Size: {item.selectedSize}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center border border-accent">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 hover:bg-accent transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-3 text-sm font-mono">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 hover:bg-accent transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <p className="font-mono">${item.price * item.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-accent bg-secondary">
                <div className="flex justify-between items-center mb-6">
                  <span className="uppercase tracking-widest text-sm">Total</span>
                  <span className="font-mono text-xl">${total}</span>
                </div>
                <button className="w-full bg-primary text-secondary py-4 uppercase tracking-[0.2em] text-sm font-medium flex items-center justify-center gap-2 group">
                  Checkout
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </button>
                <div className="mt-4 flex justify-center gap-4 opacity-50 grayscale">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" alt="Apple Pay" className="h-6" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" alt="Google Pay" className="h-6" />
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
