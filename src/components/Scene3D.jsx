import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei'
import * as THREE from 'three'

function FloatingGeometry({ position, color, speed = 1, scale = 1, type = 'icosahedron' }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15 * speed
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2 * speed
    }
  })

  const geometry = useMemo(() => {
    switch (type) {
      case 'torus':
        return <torusGeometry args={[1, 0.4, 16, 32]} />
      case 'octahedron':
        return <octahedronGeometry args={[1]} />
      case 'dodecahedron':
        return <dodecahedronGeometry args={[1]} />
      case 'torusKnot':
        return <torusKnotGeometry args={[0.8, 0.3, 128, 16]} />
      default:
        return <icosahedronGeometry args={[1, 1]} />
    }
  }, [type])

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        {geometry}
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.15}
          roughness={0.4}
          metalness={0.8}
          distort={0.25}
          speed={2}
          wireframe
        />
      </mesh>
    </Float>
  )
}

function ParticleField({ count = 200 }) {
  const points = useRef()

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return positions
  }, [count])

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.02
      points.current.rotation.x = state.clock.elapsedTime * 0.01
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#6366f1"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function GlowingSphere({ position, color, scale = 1 }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(scale + Math.sin(state.clock.elapsedTime * 0.5) * 0.05)
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[1, 32, 32]} />
      <MeshWobbleMaterial
        color={color}
        transparent
        opacity={0.08}
        factor={0.3}
        speed={1}
      />
    </mesh>
  )
}

export default function Scene3D({ variant = 'default' }) {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} color="#6366f1" />
        <directionalLight position={[-5, -5, 5]} intensity={0.3} color="#a855f7" />

        <ParticleField count={150} />

        {variant === 'about' && (
          <>
            <FloatingGeometry position={[4, 1, -2]} color="#6366f1" scale={0.8} type="icosahedron" />
            <FloatingGeometry position={[-4, -1, -3]} color="#a855f7" scale={0.6} type="octahedron" />
            <GlowingSphere position={[0, 0, -5]} color="#22d3ee" scale={2} />
          </>
        )}

        {variant === 'projects' && (
          <>
            <FloatingGeometry position={[5, 2, -2]} color="#a855f7" scale={0.7} type="torus" />
            <FloatingGeometry position={[-5, -2, -3]} color="#22d3ee" scale={0.5} type="dodecahedron" />
            <FloatingGeometry position={[0, -3, -4]} color="#6366f1" scale={0.6} type="torusKnot" />
          </>
        )}

        {variant === 'experience' && (
          <>
            <FloatingGeometry position={[4, 0, -2]} color="#22d3ee" scale={0.7} type="torusKnot" />
            <FloatingGeometry position={[-3, 2, -4]} color="#6366f1" scale={0.5} type="torus" />
            <GlowingSphere position={[2, -2, -5]} color="#a855f7" scale={1.5} />
          </>
        )}

        {variant === 'contact' && (
          <>
            <FloatingGeometry position={[3, 1, -2]} color="#6366f1" scale={0.6} type="dodecahedron" />
            <FloatingGeometry position={[-4, -1, -3]} color="#a855f7" scale={0.7} type="icosahedron" />
            <GlowingSphere position={[0, 0, -6]} color="#22d3ee" scale={2.5} />
          </>
        )}

        {variant === 'default' && (
          <>
            <FloatingGeometry position={[3, 1, -2]} color="#6366f1" scale={0.7} type="icosahedron" />
            <FloatingGeometry position={[-3, -1, -3]} color="#a855f7" scale={0.5} type="octahedron" />
          </>
        )}
      </Canvas>
    </div>
  )
}
