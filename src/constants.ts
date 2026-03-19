/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, StyleVibe } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Structure Wool Blazer',
    price: 450,
    description: 'A sharp, unisex blazer crafted from premium Italian wool. Features a structured shoulder and relaxed drape.',
    details: [
      '100% Italian Virgin Wool',
      'Structured shoulder padding',
      'Relaxed, unisex fit',
      'Internal pocket detail',
      'Dry clean only'
    ],
    category: 'Outerwear',
    images: {
      male: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=800',
      female: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&q=80&w=800'
    },
    tags: ['structured', 'wool', 'tailored'],
    vibe: [StyleVibe.FORMAL, StyleVibe.MINIMALIST]
  },
  {
    id: '2',
    name: 'Oversized Poplin Shirt',
    price: 180,
    description: 'Crisp organic cotton poplin with a voluminous silhouette. Designed for fluid movement.',
    details: [
      '100% Organic Cotton Poplin',
      'Oversized silhouette',
      'Dropped shoulder',
      'Curved hemline',
      'Machine wash cold'
    ],
    category: 'Top',
    images: {
      male: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800',
      female: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80&w=800'
    },
    tags: ['cotton', 'oversized', 'crisp'],
    vibe: [StyleVibe.MINIMALIST, StyleVibe.STREETWEAR]
  },
  {
    id: '3',
    name: 'Wide-Leg Pleated Trousers',
    price: 280,
    description: 'High-waisted trousers with deep pleats and a floor-skimming length. Fluid drape.',
    details: [
      'Viscose-Wool blend',
      'High-waisted fit',
      'Deep front pleats',
      'Concealed zip closure',
      'Floor-skimming length'
    ],
    category: 'Bottom',
    images: {
      male: 'https://images.unsplash.com/photo-1624371414361-e6e0efc8c030?auto=format&fit=crop&q=80&w=800',
      female: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800'
    },
    tags: ['pleated', 'wide-leg', 'fluid'],
    vibe: [StyleVibe.FORMAL, StyleVibe.AVANT_GARDE]
  },
  {
    id: '4',
    name: 'Technical Cargo Pant',
    price: 320,
    description: 'Water-resistant nylon with adjustable toggles at the hem. Utility meets luxury.',
    details: [
      '100% Recycled Technical Nylon',
      'Water-resistant finish',
      'Adjustable hem toggles',
      'Multi-pocket utility design',
      'Unisex sizing'
    ],
    category: 'Bottom',
    images: {
      male: 'https://images.unsplash.com/photo-1517441581617-c44b7027b991?auto=format&fit=crop&q=80&w=800',
      female: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800'
    },
    tags: ['technical', 'nylon', 'utility'],
    vibe: [StyleVibe.STREETWEAR, StyleVibe.AVANT_GARDE]
  },
  {
    id: '5',
    name: 'Asymmetric Knit Vest',
    price: 220,
    description: 'Sculptural knitwear with an irregular hemline. Crafted from a silk-mohair blend.',
    details: [
      'Silk-Mohair blend',
      'Asymmetric hemline',
      'Hand-knit texture',
      'Lightweight and breathable',
      'Delicate handle'
    ],
    category: 'Top',
    images: {
      male: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=800',
      female: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800'
    },
    tags: ['knit', 'asymmetric', 'sculptural'],
    vibe: [StyleVibe.AVANT_GARDE, StyleVibe.MINIMALIST]
  },
  {
    id: '6',
    name: 'Minimalist Leather Tote',
    price: 550,
    description: 'Seamless construction from vegetable-tanned leather. Large enough for daily essentials.',
    details: [
      '100% Vegetable-tanned leather',
      'Seamless construction',
      'Internal zip pocket',
      'Dust bag included',
      'Handcrafted in Italy'
    ],
    category: 'Accessory',
    images: {
      male: 'https://images.unsplash.com/photo-1544816153-12ad5d7133a2?auto=format&fit=crop&q=80&w=800',
      female: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800'
    },
    tags: ['leather', 'seamless', 'tote'],
    vibe: [StyleVibe.MINIMALIST, StyleVibe.FORMAL]
  }
];

export const QUIZ_STEPS = [
  {
    id: 1,
    question: 'Select your silhouette model',
    options: [
      { id: 'male', label: 'Male Model', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800' },
      { id: 'female', label: 'Female Model', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  {
    id: 2,
    question: 'Select your visual mood',
    options: [
      { id: 'mood1', label: 'Architectural', image: 'https://images.unsplash.com/photo-1505022610485-0249ba5b3675?auto=format&fit=crop&q=80&w=800' },
      { id: 'mood2', label: 'Organic', image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=800' },
      { id: 'mood3', label: 'Industrial', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800' },
      { id: 'mood4', label: 'Ethereal', image: 'https://images.unsplash.com/photo-1518617602118-4bb4b17cee94?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  {
    id: 3,
    question: 'Choose your palette',
    options: [
      { id: 'monochrome', label: 'Monochrome', colors: ['#000000', '#FFFFFF', '#808080'], mood: 'mood1' },
      { id: 'slate', label: 'Cool Slate', colors: ['#2F4F4F', '#708090', '#B0C4DE'], mood: 'mood1' },
      { id: 'earth', label: 'Earth Tones', colors: ['#4B3621', '#C2B280', '#556B2F'], mood: 'mood2' },
      { id: 'sand', label: 'Warm Sand', colors: ['#F4A460', '#DEB887', '#D2B48C'], mood: 'mood2' },
      { id: 'concrete', label: 'Concrete', colors: ['#333333', '#666666', '#999999'], mood: 'mood3' },
      { id: 'metallic', label: 'Metallic', colors: ['#C0C0C0', '#E5E4E2', '#BCC6CC'], mood: 'mood3' },
      { id: 'mist', label: 'Morning Mist', colors: ['#F0F8FF', '#E6E6FA', '#F5F5F5'], mood: 'mood4' },
      { id: 'pearl', label: 'Pearl', colors: ['#FDEEF4', '#FFFDD0', '#EAE0C8'], mood: 'mood4' }
    ]
  },
  {
    id: 4,
    question: 'Define your vibe',
    options: [
      { id: StyleVibe.STREETWEAR, label: 'Streetwear', image: 'https://images.unsplash.com/photo-1552066344-24632e509633?auto=format&fit=crop&q=80&w=800' },
      { id: StyleVibe.FORMAL, label: 'Formal', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800' },
      { id: StyleVibe.AVANT_GARDE, label: 'Avant-Garde', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800' },
      { id: StyleVibe.MINIMALIST, label: 'Minimalist', image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  {
    id: 5,
    question: 'Define your drape',
    options: [
      { id: 'oversized', label: 'Oversized & Relaxed', image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80&w=800' },
      { id: 'tailored', label: 'Tailored & Cropped', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=800' },
      { id: 'flowing', label: 'Flowing & Layered', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  {
    id: 6,
    question: 'Select your size',
    options: [
      { id: 'xs', label: 'Extra Small' },
      { id: 's', label: 'Small' },
      { id: 'm', label: 'Medium' },
      { id: 'l', label: 'Large' },
      { id: 'xl', label: 'Extra Large' }
    ]
  }
];
