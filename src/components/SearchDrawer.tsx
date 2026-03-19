/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search as SearchIcon, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../constants';

interface SearchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: any) => void;
}

export default function SearchDrawer({ isOpen, onClose, onSelectProduct }: SearchDrawerProps) {
  const [query, setQuery] = React.useState('');
  
  const results = query.length > 1 
    ? PRODUCTS.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase()))
    : [];

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
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 left-0 right-0 bg-secondary z-[71] shadow-2xl flex flex-col max-h-[80vh]"
          >
            <div className="p-6 md:p-12">
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-2xl font-display uppercase tracking-widest">Search</h2>
                <button onClick={onClose} className="p-2 hover:bg-accent/10 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="relative mb-12">
                <SearchIcon className="absolute left-0 top-1/2 -translate-y-1/2 text-accent" size={24} />
                <input 
                  autoFocus
                  type="text"
                  placeholder="SEARCH THE COLLECTION"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent border-b border-accent/30 py-4 pl-12 text-2xl md:text-4xl font-display uppercase focus:outline-none focus:border-primary placeholder:text-accent/30"
                />
              </div>

              <div className="overflow-y-auto max-h-[40vh] space-y-4">
                {results.map(product => (
                  <button 
                    key={product.id}
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-4 hover:bg-accent/5 transition-colors group"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-20 bg-accent overflow-hidden">
                        <img src={product.images.female} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-lg font-display uppercase">{product.name}</h3>
                        <p className="text-xs text-accent uppercase tracking-widest">{product.category}</p>
                      </div>
                    </div>
                    <ArrowRight className="opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
                  </button>
                ))}
                {query.length > 1 && results.length === 0 && (
                  <p className="text-accent uppercase tracking-widest text-sm text-center py-12">No results found for "{query}"</p>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
