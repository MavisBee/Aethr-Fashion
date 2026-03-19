/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

interface MannequinProps {
  gender: 'male' | 'female';
  color?: string;
}

function Mannequin({ gender, color = '#e5e5e5' }: MannequinProps) {
  const group = useRef<THREE.Group>(null);

  // Simple stylized mannequin using primitives
  const isMale = gender === 'male';
  
  return (
    <group ref={group} position={[0, -1.2, 0]}>
      {/* Head */}
      <mesh position={[0, 2.8, 0]}>
        <sphereGeometry args={[0.12, 32, 32]} />
        <meshStandardMaterial color={color} roughness={0.3} />
      </mesh>
      
      {/* Neck */}
      <mesh position={[0, 2.65, 0]}>
        <cylinderGeometry args={[0.04, 0.05, 0.1, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Torso - Shoulders/Chest */}
      <mesh position={[0, 2.4, 0]}>
        <cylinderGeometry 
          args={[
            isMale ? 0.25 : 0.2, // shoulders
            isMale ? 0.22 : 0.18, // chest
            0.3, 
            32
          ]} 
        />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Torso - Waist/Hips */}
      <mesh position={[0, 2.05, 0]}>
        <cylinderGeometry 
          args={[
            isMale ? 0.22 : 0.15, // waist
            isMale ? 0.2 : 0.25, // hips
            0.4, 
            32
          ]} 
        />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Arms */}
      <group position={[isMale ? 0.28 : 0.22, 2.45, 0]} rotation={[0, 0, -0.15]}>
        <mesh position={[0, -0.35, 0]}>
          <cylinderGeometry args={[0.04, 0.03, 0.7, 32]} />
          <meshStandardMaterial color={color} />
        </mesh>
      </group>
      <group position={[isMale ? -0.28 : -0.22, 2.45, 0]} rotation={[0, 0, 0.15]}>
        <mesh position={[0, -0.35, 0]}>
          <cylinderGeometry args={[0.04, 0.03, 0.7, 32]} />
          <meshStandardMaterial color={color} />
        </mesh>
      </group>
      
      {/* Hips/Pelvis */}
      <mesh position={[0, 1.85, 0]}>
        <sphereGeometry args={[isMale ? 0.2 : 0.25, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Legs */}
      <group position={[0.1, 1.8, 0]}>
        <mesh position={[0, -0.9, 0]}>
          <cylinderGeometry args={[0.07, 0.04, 1.8, 32]} />
          <meshStandardMaterial color={color} />
        </mesh>
      </group>
      <group position={[-0.1, 1.8, 0]}>
        <mesh position={[0, -0.9, 0]}>
          <cylinderGeometry args={[0.07, 0.04, 1.8, 32]} />
          <meshStandardMaterial color={color} />
        </mesh>
      </group>
    </group>
  );
}

interface Stylist3DProps {
  gender: 'male' | 'female';
  isStyled?: boolean;
  productCategory?: string;
  className?: string;
}

export default function Stylist3D({ gender, isStyled, productCategory, className = "" }: Stylist3DProps) {
  return (
    <div className={`w-full h-full min-h-[400px] ${className}`}>
      <Canvas shadows camera={{ position: [0, 0.2, 5.5], fov: 40 }}>
        <color attach="background" args={['#f5f5f0']} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <group>
            <Mannequin gender={gender} />
            {isStyled && (
              <group position={[0, -1.2, 0]}>
                {/* Simple 3D representation of clothing */}
                {productCategory === 'Top' && (
                  <mesh position={[0, 2.3, 0]}>
                    <cylinderGeometry args={[0.28, 0.28, 0.6, 32]} />
                    <meshStandardMaterial color="#222" roughness={0.8} />
                  </mesh>
                )}
                {productCategory === 'Outerwear' && (
                  <mesh position={[0, 2.3, 0]}>
                    <cylinderGeometry args={[0.3, 0.3, 0.7, 32]} />
                    <meshStandardMaterial color="#111" roughness={0.5} />
                  </mesh>
                )}
                {productCategory === 'Bottom' && (
                  <group position={[0, 1.5, 0]}>
                    <mesh position={[0.1, -0.6, 0]}>
                      <cylinderGeometry args={[0.09, 0.09, 1.2, 32]} />
                      <meshStandardMaterial color="#333" />
                    </mesh>
                    <mesh position={[-0.1, -0.6, 0]}>
                      <cylinderGeometry args={[0.09, 0.09, 1.2, 32]} />
                      <meshStandardMaterial color="#333" />
                    </mesh>
                  </group>
                )}
              </group>
            )}
          </group>
        </Float>
        
        <ContactShadows 
          position={[0, -0.01, 0]} 
          opacity={0.4} 
          scale={10} 
          blur={2} 
          far={4.5} 
        />
        
        <Environment preset="city" />
        <OrbitControls 
          enablePan={false} 
          enableZoom={false} 
          minPolarAngle={Math.PI / 2.5} 
          maxPolarAngle={Math.PI / 2} 
        />
      </Canvas>
    </div>
  );
}
