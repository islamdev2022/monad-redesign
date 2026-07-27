import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

function Nodes({ count = 60 }) {
  const mesh = useRef()
  const { pointer } = useThree()

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 2.0 + Math.random() * 1.5
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
    }
    return positions
  }, [count])

  useFrame((state) => {
    if (!mesh.current) return
    const t = state.clock.elapsedTime
    mesh.current.rotation.y = t * 0.04 + pointer.x * 0.2
    mesh.current.rotation.x = pointer.y * 0.15
  })

  return (
    <group ref={mesh}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={particles}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#1d4ed8"
          transparent
          opacity={0.7}
          sizeAttenuation
        />
      </points>
    </group>
  )
}

function Connections({ count = 60 }) {
  const lineRef = useRef()
  const { pointer } = useThree()

  const { positions, indices } = useMemo(() => {
    const pts = []
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 2.0 + Math.random() * 1.5
      pts.push(new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      ))
    }
    const idx = []
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        if (pts[i].distanceTo(pts[j]) < 1.4) {
          idx.push(i, j)
        }
      }
    }
    const flat = new Float32Array(pts.length * 3)
    pts.forEach((p, i) => {
      flat[i * 3] = p.x
      flat[i * 3 + 1] = p.y
      flat[i * 3 + 2] = p.z
    })
    return { positions: flat, indices: new Uint16Array(idx) }
  }, [count])

  useFrame((state) => {
    if (!lineRef.current) return
    const t = state.clock.elapsedTime
    lineRef.current.rotation.y = t * 0.04 + pointer.x * 0.2
    lineRef.current.rotation.x = pointer.y * 0.15
  })

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="index"
          count={indices.length}
          array={indices}
          itemSize={1}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color="#1d4ed8"
        transparent
        opacity={0.12}
      />
    </lineSegments>
  )
}

function CoreSphere() {
  const meshRef = useRef()
  const { pointer } = useThree()

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime
    meshRef.current.rotation.y = t * 0.04 + pointer.x * 0.2
    meshRef.current.rotation.x = pointer.y * 0.15
    meshRef.current.scale.setScalar(1 + Math.sin(t * 0.5) * 0.03)
  })

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.1, 2]} />
      <meshBasicMaterial
        color="#1d4ed8"
        wireframe
        transparent
        opacity={0.1}
      />
    </mesh>
  )
}

export default function NeuralNetwork() {
  return (
    <group>
      <CoreSphere />
      <Nodes count={60} />
      <Connections count={60} />
    </group>
  )
}
