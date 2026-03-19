/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, Instagram, Twitter, Facebook } from 'lucide-react';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: any) => void;
}

export default function MenuDrawer({ isOpen, onClose, onNavigate }: MenuDrawerProps) {
  const links = [
    { label: 'New Arrivals', view: 'new-arrivals' },
    { label: 'The Collection', view: 'collection' },
    { label: 'Ai Stylist', view: 'ai-stylist' },
    { label: 'About Aethr', view: 'about' },
    { label: 'Sustainability', view: 'sustainability' },
    { label: 'Commissions', view: 'commissions' },
    { label: 'Contact', view: 'contact' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[70]"
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-full w-full max-w-md bg-primary text-secondary z-[71] shadow-2xl flex flex-col"
          >
            <div className="p-6 flex justify-between items-center border-b border-secondary/10">
              <h2 className="text-2xl font-display uppercase tracking-widest">Menu</h2>
              <button onClick={onClose} className="p-2 hover:bg-secondary/10 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-12 py-24 flex flex-col space-y-8">
              {links.map((link, i) => (
                <motion.button
                  key={link.label}
                  onClick={() => {
                    onNavigate(link.view);
                    onClose();
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group flex items-center justify-between text-xl font-display hover:italic transition-all font-normal text-left w-full"
                >
                  {link.label}
                  <ArrowRight className="opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" size={24} />
                </motion.button>
              ))}
            </div>

            <div className="p-12 border-t border-secondary/10 space-y-8">
              <div className="flex gap-8">
                <Instagram size={24} className="hover:text-accent transition-colors cursor-pointer" />
                <Twitter size={24} className="hover:text-accent transition-colors cursor-pointer" />
                <Facebook size={24} className="hover:text-accent transition-colors cursor-pointer" />
              </div>
              <p className="text-[8px] Carmel Case tracking-[0.2em] text-secondary/50">
                © 2026 AETHR. ALL RIGHTS RESERVED.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
