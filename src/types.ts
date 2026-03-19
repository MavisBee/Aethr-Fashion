/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum StyleVibe {
  STREETWEAR = 'Streetwear',
  FORMAL = 'Formal',
  AVANT_GARDE = 'Avant-Garde',
  MINIMALIST = 'Minimalist'
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  details: string[];
  category: 'Top' | 'Bottom' | 'Outerwear' | 'Accessory' | 'Footwear';
  images: {
    male: string;
    female: string;
  };
  tags: string[];
  vibe: StyleVibe[];
}

export interface QuizState {
  step: number;
  gender: 'male' | 'female' | null;
  moodSelection: string | null;
  colorPalette: string | null;
  vibe: StyleVibe | null;
  silhouette: string | null;
  size: string | null;
  mode: 'general' | 'ai';
}

export type View = 'home' | 'quiz' | 'ai-stylist' | 'reveal' | 'product' | 'new-arrivals' | 'collection' | 'sustainability' | 'contact' | 'commissions' | 'about';

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}
