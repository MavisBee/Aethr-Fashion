/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Settings, LogOut, Heart, Package } from 'lucide-react';

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileDrawer({ isOpen, onClose }: ProfileDrawerProps) {
  const [sizePreference, setSizePreference] = React.useState('M');
  const [stylePreference, setStylePreference] = React.useState('Minimalist');

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
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-secondary z-[71] shadow-2xl flex flex-col"
          >
            <div className="p-6 flex justify-between items-center border-b border-accent/20">
              <h2 className="text-2xl font-display uppercase tracking-widest">Profile</h2>
              <button onClick={onClose} className="p-2 hover:bg-accent/10 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-12">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-secondary">
                  <User size={40} />
                </div>
                <div>
                  <h3 className="text-xl font-display uppercase">Alex Rivera</h3>
                  <p className="text-xs text-accent uppercase tracking-widest">Member since 2024</p>
                </div>
              </div>

              <section className="space-y-6">
                <h4 className="text-xs font-mono uppercase tracking-[0.3em] text-accent border-b border-accent/20 pb-2">Customization</h4>
                
                <div className="space-y-4">
                  <label className="block text-sm uppercase tracking-widest">Default Size</label>
                  <div className="flex gap-2">
                    {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                      <button
                        key={size}
                        onClick={() => setSizePreference(size)}
                        className={`flex-1 py-3 text-xs font-mono border transition-all ${sizePreference === size ? 'bg-primary text-secondary border-primary' : 'border-accent/30 hover:border-primary'}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-sm uppercase tracking-widest">Style Preference</label>
                  <select 
                    value={stylePreference}
                    onChange={(e) => setStylePreference(e.target.value)}
                    className="w-full bg-transparent border border-accent/30 p-4 text-sm font-mono focus:outline-none focus:border-primary appearance-none"
                  >
                    <option>Minimalist</option>
                    <option>Streetwear</option>
                    <option>Formal</option>
                    <option>Avant-Garde</option>
                  </select>
                </div>
              </section>

              <nav className="space-y-2">
                <button className="w-full flex items-center gap-4 p-4 hover:bg-accent/10 transition-colors uppercase tracking-widest text-sm">
                  <Package size={18} />
                  My Orders
                </button>
                <button className="w-full flex items-center gap-4 p-4 hover:bg-accent/10 transition-colors uppercase tracking-widest text-sm">
                  <Heart size={18} />
                  Wishlist
                </button>
                <button className="w-full flex items-center gap-4 p-4 hover:bg-accent/10 transition-colors uppercase tracking-widest text-sm">
                  <Settings size={18} />
                  Settings
                </button>
              </nav>
            </div>

            <div className="p-8 border-t border-accent/20">
              <button className="w-full flex items-center justify-center gap-4 p-4 text-red-500 uppercase tracking-widest text-sm font-medium hover:bg-red-50 transition-colors">
                <LogOut size={18} />
                Sign Out
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
