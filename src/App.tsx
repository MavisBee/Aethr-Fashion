/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ShoppingBag, Menu, Search, User } from 'lucide-react';
import Quiz from './components/Quiz';
import CapsuleReveal from './components/CapsuleReveal';
import ProductDetail from './components/ProductDetail';
import CartDrawer from './components/CartDrawer';
import ProfileDrawer from './components/ProfileDrawer';
import SearchDrawer from './components/SearchDrawer';
import MenuDrawer from './components/MenuDrawer';
import { NewArrivals, Collection, Sustainability, Contact, Commissions, About } from './pages/Sections';
import { Product, QuizState, CartItem, View } from './types';
import { curateCapsule } from './services/geminiService';

export default function App() {
  const [view, setView] = React.useState<View>('home');
  const [quizState, setQuizState] = React.useState<QuizState | null>(null);
  const [capsule, setCapsule] = React.useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  const [cart, setCart] = React.useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isCurating, setIsCurating] = React.useState(false);

  const handleQuizComplete = async (state: QuizState) => {
    setQuizState(state);
    setIsCurating(true);
    setView('reveal');
    
    const curatedProducts = await curateCapsule(state);
    setCapsule(curatedProducts);
    setIsCurating(false);
  };

  const startQuiz = (mode: 'general' | 'ai') => {
    setQuizState(prev => ({
      step: 1,
      gender: mode === 'general' ? 'female' : null,
      moodSelection: null,
      colorPalette: null,
      vibe: null,
      silhouette: null,
      size: mode === 'general' ? 'M' : null,
      mode
    }));
    setView(mode === 'general' ? 'quiz' : 'ai-stylist');
  };

  const addToCart = (product: Product, size: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map(item => 
          item.id === product.id && item.selectedSize === size 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, selectedSize: size }];
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const addAllToBag = () => {
    capsule.forEach(p => addToCart(p, quizState?.size || 'M'));
  };

  const handleGenderToggle = (gender: 'male' | 'female') => {
    if (quizState) {
      setQuizState({ ...quizState, gender });
    }
  };

  const renderView = () => {
    switch (view) {
      case 'new-arrivals': return <NewArrivals onBack={() => setView('home')} />;
      case 'collection': return <Collection onBack={() => setView('home')} />;
      case 'sustainability': return <Sustainability onBack={() => setView('home')} />;
      case 'contact': return <Contact onBack={() => setView('home')} />;
      case 'commissions': return <Commissions onBack={() => setView('home')} />;
      case 'about': return <About onBack={() => setView('home')} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-secondary selection:bg-primary selection:text-secondary">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 md:p-6 bg-secondary/80 backdrop-blur-md border-b border-accent/10">
        <div className="flex gap-2 md:gap-6 items-center">
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="p-2 hover:bg-primary/5 rounded-full transition-colors"
          >
            <Menu size={20} />
          </button>
        </div>

        <button 
          onClick={() => setView('home')}
          className="text-xl md:text-2xl font-display uppercase tracking-[0.4em] md:translate-x-4"
        >
          AETHR
        </button>

        <div className="flex gap-2 md:gap-6 items-center">
          <button 
            onClick={() => setIsProfileOpen(true)}
            className="p-2 hover:bg-primary/5 rounded-full transition-colors hidden md:block"
          >
            <User size={20} />
          </button>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 hover:bg-primary/5 rounded-full transition-colors"
          >
            <ShoppingBag size={20} />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-secondary text-[10px] flex items-center justify-center rounded-full font-bold">
                {cart.reduce((s, i) => s + i.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {view === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col"
          >
            {/* Hero Section */}
            <section className="relative min-h-[100dvh] flex flex-col items-center justify-center text-center px-4 sm:px-6 overflow-hidden pt-32 md:pt-40">
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1920" 
                  alt="Hero" 
                  className="w-full h-full object-cover opacity-40 scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-transparent to-secondary" />
              </div>

              <div className="relative z-10 w-full max-w-7xl flex flex-col items-center justify-center py-20">
                <motion.h1 
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="text-4xl sm:text-6xl md:text-8xl lg:text-[9rem] xl:text-[11rem] font-display uppercase leading-[0.85] mb-6 sm:mb-8 md:mb-12 tracking-tighter text-center w-full"
                >
                  Personalized<br />Luxury
                </motion.h1>
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="text-[10px] sm:text-xs md:text-base lg:text-lg uppercase tracking-[0.2em] sm:tracking-[0.3em] text-accent mb-8 sm:mb-10 md:mb-14 max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl mx-auto leading-relaxed text-center"
                >
                  Reverse the traditional shopping model. Curate your custom capsule wardrobe in seconds.
                </motion.p>
                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => startQuiz('general')}
                  className="bg-primary text-secondary px-8 sm:px-10 md:px-14 py-4 sm:py-5 md:py-6 uppercase tracking-[0.3em] text-[10px] sm:text-xs md:text-sm font-medium hover:scale-105 transition-transform active:scale-95 z-20 shadow-2xl"
                >
                  Curate My Capsule
                </motion.button>
              </div>
            </section>

            {/* How It Works */}
            <section className="py-24 px-6 bg-secondary">
              <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-display uppercase mb-16">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  {[
                    { step: '01', title: 'Consultation', desc: 'A rapid, visual-driven quiz to define your aesthetic, sizing, and occasion.' },
                    { step: '02', title: 'AI Curation', desc: 'Our AI Stylist maps your choices to a cohesive 4-6 piece custom outfit.' },
                    { step: '03', title: 'The Reveal', desc: 'Explore your capsule in an editorial layout and add to bag with one click.' }
                  ].map((item) => (
                    <div key={item.step} className="space-y-4">
                      <span className="text-xs font-mono text-accent">{item.step}</span>
                      <h3 className="text-2xl font-display uppercase">{item.title}</h3>
                      <p className="text-accent text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Featured Section */}
            <section className="py-24 px-6 bg-primary text-secondary overflow-hidden">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
                <div className="md:w-1/2">
                  <h2 className="text-5xl md:text-8xl font-display uppercase leading-none mb-8">Unisex<br />Fluidity</h2>
                  <p className="text-secondary/60 uppercase tracking-widest text-sm mb-12 leading-relaxed">
                    Designed for movement. Crafted for everyone. Our pieces transcend gender boundaries, focusing on silhouette and drape.
                  </p>
                  <button 
                    onClick={() => startQuiz('general')}
                    className="border border-secondary/20 px-10 py-4 uppercase tracking-widest text-xs hover:bg-secondary hover:text-primary transition-all"
                  >
                    Start Curating
                  </button>
                </div>
                <div className="md:w-1/2 relative">
                  <div className="aspect-[3/4] bg-secondary/10 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000" 
                      alt="Featured" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Commissioned Works Section */}
            <section className="py-24 px-6 bg-secondary border-t border-accent/10">
              <div className="max-w-7xl mx-auto text-center">
                <span className="text-[10px] uppercase tracking-[0.5em] text-accent mb-8 block">Bespoke Services</span>
                <h2 className="text-5xl md:text-8xl font-display uppercase mb-12">Commissioned <br /> Works</h2>
                <p className="text-accent uppercase tracking-widest text-sm max-w-2xl mx-auto mb-12 leading-relaxed">
                  Unique silhouettes developed in collaboration with our studio. Limited slots available each season for custom tailoring.
                </p>
                <button 
                  onClick={() => setView('commissions')}
                  className="px-12 py-5 bg-primary text-secondary uppercase tracking-widest text-xs font-medium hover:bg-primary/90 transition-colors"
                >
                  Explore Commissions
                </button>
              </div>
            </section>
          </motion.div>
        )}

        {view === 'quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >
            <Quiz 
              mode="general"
              onComplete={handleQuizComplete} 
              onBack={() => setView('home')}
            />
          </motion.div>
        )}

        {view === 'ai-stylist' && (
          <motion.div
            key="ai-stylist"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >
            <Quiz 
              mode="ai"
              onComplete={handleQuizComplete} 
              onBack={() => setView('home')}
            />
          </motion.div>
        )}

        {view === 'reveal' && (
          <div key="reveal">
            {isCurating ? (
              <div className="h-screen flex flex-col items-center justify-center text-center p-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 border-2 border-accent border-t-primary rounded-full mb-8"
                />
                <h2 className="text-2xl font-display uppercase tracking-widest mb-2">Curating Your Capsule</h2>
                <p className="text-accent text-sm uppercase tracking-widest">Our AI Stylist is mapping your aesthetic...</p>
              </div>
            ) : (
              <CapsuleReveal 
                products={capsule} 
                gender={quizState?.gender || 'female'}
                onGenderChange={handleGenderToggle}
                onSelectProduct={setSelectedProduct}
                onAddAllToBag={addAllToBag}
                onBack={() => setView('quiz')}
              />
            )}
          </div>
        )}

        {renderView() && (
          <motion.div key={view} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {renderView()}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedProduct && (
          <ProductDetail 
            product={selectedProduct} 
            gender={quizState?.gender || 'female'}
            onClose={() => setSelectedProduct(null)}
            onAddToBag={(p, s) => {
              addToCart(p, s);
              setSelectedProduct(null);
            }}
          />
        )}
      </AnimatePresence>

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={updateCartQuantity}
        onRemove={removeFromCart}
      />

      <ProfileDrawer 
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      <SearchDrawer 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={setSelectedProduct}
      />

      <MenuDrawer 
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={setView}
      />

      {/* Footer */}
      <footer className="p-8 md:p-12 border-t border-accent bg-secondary text-accent text-[10px] uppercase tracking-[0.3em]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex gap-8 order-2 md:order-1">
            <a href="#" className="hover:text-primary transition-colors">Instagram</a>
            <a href="#" className="hover:text-primary transition-colors">Twitter</a>
            <a href="#" className="hover:text-primary transition-colors">Facebook</a>
          </div>
          <p className="order-3 md:order-2">© 2026 AETHR. All Rights Reserved.</p>
          <div className="flex gap-8 order-1 md:order-3">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
