import { useFrame, useLoader } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import imgCircle from '../assets/circle.png';
import * as THREE from 'three';

const Star = () => {
  const STAR = useLoader(THREE.TextureLoader, imgCircle);
  const bufferRef = useRef();
  const geoRef = useRef();

  let rotate = 0;

  let positions = useMemo(() => {
    let position = [];
    for (let i = 0; i < 6000; i++) {
      let x = Math.random() * 600 - 300;
      let y = Math.random() * 600 - 300;
      let z = Math.random() * 600 - 300;
      position.push(x, y, z);
    }
    return new Float32Array(position);
  }, []);

  useFrame(() => {
    let idx = 2;
    const positions = bufferRef.current.array;
    geoRef.current.rotateY += 1;
    let velocity = 0;
    let acc = 0.02;

    for (let v = 0; v < 6000; v++) {
      velocity += acc;
      positions[idx] -= velocity;
      if (positions[idx] < -500) {
        positions[idx] = 200;
        velocity = 0;
      }
      idx += 3;
    }
    bufferRef.current.needsUpdate = true;
    geoRef.current.needsUpdate = true;
  });
  return (
    <points>
      <bufferGeometry ref={geoRef} attach="geometry" rotateY={rotate}>
        <bufferAttribute
          ref={bufferRef}
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        map={STAR}
        color="white"
        size={1}
        sizeAttenuation
        transparent={false}
      />
    </points>
  );
};

export default Star;
