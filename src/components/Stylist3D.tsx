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
  const isMale = gender === 'male';
  
  return (
    <group ref={group} position={[0, -1.2, 0]}>
      {/* Pedestal */}
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <cylinderGeometry args={[0.8, 0.9, 0.1, 64]} />
        <meshStandardMaterial color="#d1d1d1" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 2.8, 0]} castShadow>
        <sphereGeometry args={[0.12, 64, 64]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
      </mesh>
      
      {/* Neck */}
      <mesh position={[0, 2.65, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.05, 0.1, 32]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
      
      {/* Torso - Shoulders/Chest */}
      <mesh position={[0, 2.4, 0]} castShadow>
        <cylinderGeometry 
          args={[
            isMale ? 0.28 : 0.22, // shoulders
            isMale ? 0.24 : 0.18, // chest
            0.4, 
            64
          ]} 
        />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>

      {/* Torso - Waist/Hips */}
      <mesh position={[0, 2.0, 0]} castShadow>
        <cylinderGeometry 
          args={[
            isMale ? 0.24 : 0.16, // waist
            isMale ? 0.22 : 0.28, // hips
            0.5, 
            64
          ]} 
        />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
      
      {/* Arms - Upper */}
      <group position={[isMale ? 0.32 : 0.24, 2.5, 0]} rotation={[0, 0, -0.1]}>
        <mesh position={[0, -0.2, 0]} castShadow>
          <cylinderGeometry args={[0.045, 0.04, 0.4, 32]} />
          <meshStandardMaterial color={color} />
        </mesh>
        {/* Elbow Joint */}
        <mesh position={[0, -0.4, 0]} castShadow>
          <sphereGeometry args={[0.04, 32, 32]} />
          <meshStandardMaterial color={color} />
        </mesh>
        {/* Forearm */}
        <group position={[0, -0.4, 0]} rotation={[0, 0, -0.1]}>
          <mesh position={[0, -0.2, 0]} castShadow>
            <cylinderGeometry args={[0.04, 0.03, 0.4, 32]} />
            <meshStandardMaterial color={color} />
          </mesh>
          {/* Hand */}
          <mesh position={[0, -0.45, 0]} castShadow>
            <boxGeometry args={[0.06, 0.1, 0.02]} />
            <meshStandardMaterial color={color} />
          </mesh>
        </group>
      </group>

      <group position={[isMale ? -0.32 : -0.24, 2.5, 0]} rotation={[0, 0, 0.1]}>
        <mesh position={[0, -0.2, 0]} castShadow>
          <cylinderGeometry args={[0.045, 0.04, 0.4, 32]} />
          <meshStandardMaterial color={color} />
        </mesh>
        {/* Elbow Joint */}
        <mesh position={[0, -0.4, 0]} castShadow>
          <sphereGeometry args={[0.04, 32, 32]} />
          <meshStandardMaterial color={color} />
        </mesh>
        {/* Forearm */}
        <group position={[0, -0.4, 0]} rotation={[0, 0, 0.1]}>
          <mesh position={[0, -0.2, 0]} castShadow>
            <cylinderGeometry args={[0.04, 0.03, 0.4, 32]} />
            <meshStandardMaterial color={color} />
          </mesh>
          {/* Hand */}
          <mesh position={[0, -0.45, 0]} castShadow>
            <boxGeometry args={[0.06, 0.1, 0.02]} />
            <meshStandardMaterial color={color} />
          </mesh>
        </group>
      </group>
      
      {/* Hips/Pelvis */}
      <mesh position={[0, 1.75, 0]} castShadow>
        <sphereGeometry args={[isMale ? 0.22 : 0.28, 64, 64, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Legs - Thighs */}
      <group position={[0.12, 1.7, 0]} rotation={[0, 0, -0.05]}>
        <mesh position={[0, -0.4, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.06, 0.8, 32]} />
          <meshStandardMaterial color={color} />
        </mesh>
        {/* Knee Joint */}
        <mesh position={[0, -0.8, 0]} castShadow>
          <sphereGeometry args={[0.06, 32, 32]} />
          <meshStandardMaterial color={color} />
        </mesh>
        {/* Lower Leg */}
        <group position={[0, -0.8, 0]} rotation={[0, 0, 0.02]}>
          <mesh position={[0, -0.4, 0]} castShadow>
            <cylinderGeometry args={[0.06, 0.04, 0.8, 32]} />
            <meshStandardMaterial color={color} />
          </mesh>
          {/* Foot */}
          <mesh position={[0, -0.85, 0.05]} castShadow>
            <boxGeometry args={[0.1, 0.05, 0.2]} />
            <meshStandardMaterial color={color} />
          </mesh>
        </group>
      </group>

      <group position={[-0.12, 1.7, 0]} rotation={[0, 0, 0.05]}>
        <mesh position={[0, -0.4, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.06, 0.8, 32]} />
          <meshStandardMaterial color={color} />
        </mesh>
        {/* Knee Joint */}
        <mesh position={[0, -0.8, 0]} castShadow>
          <sphereGeometry args={[0.06, 32, 32]} />
          <meshStandardMaterial color={color} />
        </mesh>
        {/* Lower Leg */}
        <group position={[0, -0.8, 0]} rotation={[0, 0, -0.02]}>
          <mesh position={[0, -0.4, 0]} castShadow>
            <cylinderGeometry args={[0.06, 0.04, 0.8, 32]} />
            <meshStandardMaterial color={color} />
          </mesh>
          {/* Foot */}
          <mesh position={[0, -0.85, 0.05]} castShadow>
            <boxGeometry args={[0.1, 0.05, 0.2]} />
            <meshStandardMaterial color={color} />
          </mesh>
        </group>
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

function ScanningEffect() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 1.5 + 1.5;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.4, 0.42, 64]} />
      <meshBasicMaterial color="#4285F4" transparent opacity={0.5} side={THREE.DoubleSide} />
    </mesh>
  );
}

export default function Stylist3D({ gender, isStyled, productCategory, className = "" }: Stylist3DProps) {
  return (
    <div className={`w-full h-full min-h-[400px] ${className}`}>
      <Canvas shadows camera={{ position: [0, 0.5, 6], fov: 35 }}>
        <color attach="background" args={['#f8f8f5']} />
        
        {/* Lighting Setup */}
        <ambientLight intensity={0.4} />
        <spotLight 
          position={[5, 8, 5]} 
          angle={0.3} 
          penumbra={1} 
          intensity={1.5} 
          castShadow 
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight 
          position={[-5, 5, -5]} 
          intensity={0.5} 
          color="#ffffff" 
        />
        <pointLight position={[0, 2, 4]} intensity={0.3} color="#4285F4" />
        
        <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.3}>
          <group>
            <Mannequin gender={gender} />
            {isStyled && (
              <group position={[0, -1.2, 0]}>
                <ScanningEffect />
                
                {/* Detailed 3D representation of clothing */}
                {productCategory === 'Top' && (
                  <group>
                    {/* Main Body */}
                    <mesh position={[0, 2.3, 0]} castShadow>
                      <cylinderGeometry args={[0.3, 0.32, 0.65, 64]} />
                      <meshStandardMaterial color="#1a1a1a" roughness={0.7} metalness={0.1} />
                    </mesh>
                    {/* Hem detail */}
                    <mesh position={[0, 1.98, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
                      <torusGeometry args={[0.32, 0.01, 16, 64]} />
                      <meshStandardMaterial color="#111" />
                    </mesh>
                    {/* Collar - V-neck style */}
                    <mesh position={[0, 2.62, 0.05]} rotation={[Math.PI / 2 + 0.2, 0, 0]} castShadow>
                      <torusGeometry args={[0.08, 0.02, 16, 64, Math.PI]} />
                      <meshStandardMaterial color="#111" />
                    </mesh>
                    {/* Sleeves with cuffs */}
                    <group position={[0.28, 2.4, 0]} rotation={[0, 0, -0.15]}>
                      <mesh castShadow>
                        <cylinderGeometry args={[0.06, 0.05, 0.35, 32]} />
                        <meshStandardMaterial color="#1a1a1a" />
                      </mesh>
                      <mesh position={[0, -0.18, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
                        <torusGeometry args={[0.05, 0.01, 16, 32]} />
                        <meshStandardMaterial color="#111" />
                      </mesh>
                    </group>
                    <group position={[-0.28, 2.4, 0]} rotation={[0, 0, 0.15]}>
                      <mesh castShadow>
                        <cylinderGeometry args={[0.06, 0.05, 0.35, 32]} />
                        <meshStandardMaterial color="#1a1a1a" />
                      </mesh>
                      <mesh position={[0, -0.18, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
                        <torusGeometry args={[0.05, 0.01, 16, 32]} />
                        <meshStandardMaterial color="#111" />
                      </mesh>
                    </group>
                  </group>
                )}

                {productCategory === 'Outerwear' && (
                  <group>
                    {/* Main Body - Slightly flared */}
                    <mesh position={[0, 2.25, 0]} castShadow>
                      <cylinderGeometry args={[0.32, 0.35, 0.8, 64]} />
                      <meshStandardMaterial color="#0a0a0a" roughness={0.4} metalness={0.2} />
                    </mesh>
                    {/* High Collar */}
                    <mesh position={[0, 2.68, 0]} castShadow>
                      <cylinderGeometry args={[0.08, 0.09, 0.12, 32]} />
                      <meshStandardMaterial color="#050505" />
                    </mesh>
                    {/* Shoulders / Epaulettes */}
                    <mesh position={[0.28, 2.58, 0]} rotation={[0, 0, -0.1]} castShadow>
                      <boxGeometry args={[0.15, 0.02, 0.1]} />
                      <meshStandardMaterial color="#111" />
                    </mesh>
                    <mesh position={[-0.28, 2.58, 0]} rotation={[0, 0, 0.1]} castShadow>
                      <boxGeometry args={[0.15, 0.02, 0.1]} />
                      <meshStandardMaterial color="#111" />
                    </mesh>
                    {/* Pockets */}
                    <mesh position={[0.18, 2.0, 0.28]} castShadow>
                      <boxGeometry args={[0.12, 0.15, 0.02]} />
                      <meshStandardMaterial color="#050505" />
                    </mesh>
                    <mesh position={[-0.18, 2.0, 0.28]} castShadow>
                      <boxGeometry args={[0.12, 0.15, 0.02]} />
                      <meshStandardMaterial color="#050505" />
                    </mesh>
                    {/* Full Sleeves */}
                    <mesh position={[0.35, 2.2, 0]} rotation={[0, 0, -0.1]} castShadow>
                      <cylinderGeometry args={[0.08, 0.06, 0.8, 32]} />
                      <meshStandardMaterial color="#0a0a0a" />
                    </mesh>
                    <mesh position={[-0.35, 2.2, 0]} rotation={[0, 0, 0.1]} castShadow>
                      <cylinderGeometry args={[0.08, 0.06, 0.8, 32]} />
                      <meshStandardMaterial color="#0a0a0a" />
                    </mesh>
                  </group>
                )}

                {productCategory === 'Bottom' && (
                  <group position={[0, 1.5, 0]}>
                    {/* Waistband with belt loops */}
                    <mesh position={[0, 0.1, 0]} castShadow>
                      <cylinderGeometry args={[0.28, 0.29, 0.12, 64]} />
                      <meshStandardMaterial color="#1a1a1a" />
                    </mesh>
                    {/* Legs with knee detailing */}
                    <group position={[0.12, -0.6, 0]} rotation={[0, 0, -0.05]}>
                      <mesh castShadow>
                        <cylinderGeometry args={[0.1, 0.09, 1.3, 32]} />
                        <meshStandardMaterial color="#222" roughness={0.8} />
                      </mesh>
                      {/* Knee fold detail */}
                      <mesh position={[0, 0.1, 0.08]} castShadow>
                        <boxGeometry args={[0.12, 0.02, 0.02]} />
                        <meshStandardMaterial color="#111" />
                      </mesh>
                    </group>
                    <group position={[-0.12, -0.6, 0]} rotation={[0, 0, 0.05]}>
                      <mesh castShadow>
                        <cylinderGeometry args={[0.1, 0.09, 1.3, 32]} />
                        <meshStandardMaterial color="#222" roughness={0.8} />
                      </mesh>
                      {/* Knee fold detail */}
                      <mesh position={[0, 0.1, 0.08]} castShadow>
                        <boxGeometry args={[0.12, 0.02, 0.02]} />
                        <meshStandardMaterial color="#111" />
                      </mesh>
                    </group>
                  </group>
                )}
              </group>
            )}
          </group>
        </Float>
        
        <ContactShadows 
          position={[0, -0.01, 0]} 
          opacity={0.6} 
          scale={12} 
          blur={2.5} 
          far={4.5} 
        />
        
        <Environment preset="studio" />
        <OrbitControls 
          enablePan={false} 
          enableZoom={false} 
          minPolarAngle={Math.PI / 2.5} 
          maxPolarAngle={Math.PI / 1.8} 
        />
      </Canvas>
    </div>
  );
}
