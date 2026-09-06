import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, OrbitControls, Sparkles } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const routes = [
  [0.66, 0.27, 0.18],
  [0.14, 0.52, 0.62],
  [-0.42, 0.28, 0.76],
  [-0.72, 0.05, 0.53],
  [0.04, -0.55, 0.72],
] as const;

function Globe() {
  const group = useRef<THREE.Group>(null);
  const hub = new THREE.Vector3(0.72, 0.3, 0.52).normalize().multiplyScalar(2.04);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.045;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      state.pointer.y * 0.08,
      0.025,
    );
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      -state.pointer.x * 0.08,
      0.025,
    );
  });

  const stars = useMemo(
    () =>
      Array.from({ length: 110 }, (_, index) => {
        const phi = Math.acos(-1 + (2 * index) / 109);
        const theta = Math.sqrt(110 * Math.PI) * phi;
        return new THREE.Vector3(
          2.015 * Math.cos(theta) * Math.sin(phi),
          2.015 * Math.sin(theta) * Math.sin(phi),
          2.015 * Math.cos(phi),
        );
      }),
    [],
  );

  return (
    <group ref={group} rotation={[0.15, -0.65, -0.08]}>
      <mesh>
        <sphereGeometry args={[2, 72, 72]} />
        <meshPhysicalMaterial
          color="#081118"
          roughness={0.52}
          metalness={0.76}
          clearcoat={0.7}
          clearcoatRoughness={0.28}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.015, 38, 38]} />
        <meshBasicMaterial color="#89a8b5" wireframe transparent opacity={0.11} />
      </mesh>
      {stars.map((position, index) => (
        <mesh key={index} position={position}>
          <sphereGeometry args={[index % 7 === 0 ? 0.025 : 0.012, 8, 8]} />
          <meshBasicMaterial color={index % 7 === 0 ? "#d8b878" : "#7595a0"} />
        </mesh>
      ))}
      <Float speed={1.4} rotationIntensity={0} floatIntensity={0.12}>
        <mesh position={hub}>
          <sphereGeometry args={[0.075, 20, 20]} />
          <meshStandardMaterial color="#e0bc78" emissive="#c79545" emissiveIntensity={2.2} />
        </mesh>
      </Float>
      {routes.map((route, index) => {
        const target = new THREE.Vector3(...route).normalize().multiplyScalar(2.04);
        const midpoint = hub.clone().add(target).multiplyScalar(0.64).normalize().multiplyScalar(2.75);
        const curve = new THREE.QuadraticBezierCurve3(hub, midpoint, target);
        return (
          <group key={index}>
            <Line
              points={curve.getPoints(42)}
              color={index % 2 ? "#7698a4" : "#d7b16d"}
              lineWidth={1.1}
              transparent
              opacity={0.62}
            />
            <mesh position={target}>
              <sphereGeometry args={[0.035, 12, 12]} />
              <meshBasicMaterial color="#d5be91" />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

export default function TradeGlobe() {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 6.7], fov: 43 }} gl={{ antialias: true }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 4, 5]} intensity={2.6} color="#f5d9a5" />
      <pointLight position={[-4, -2, 4]} intensity={2.2} color="#4b839c" />
      <Sparkles count={70} scale={7} size={1.2} speed={0.18} opacity={0.38} color="#d6bc8b" />
      <Globe />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.12} />
    </Canvas>
  );
}