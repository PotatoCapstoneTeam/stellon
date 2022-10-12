import { useFrame, useLoader } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import imgCircle from '../assets/circle.png';
import * as THREE from 'three';

const Star = () => {
  const STAR = useLoader(THREE.TextureLoader, imgCircle); // 이미지 사진 로더
  const bufferRef = useRef();
  const geoRef = useRef();

  let rotate = 0;

  let positions = useMemo(() => {   // x, y, z 3차원 좌표들을 배열에 저장
    let position = [];
    for (let i = 0; i < 6000; i++) {
      let x = Math.random() * 600 - 300;
      let y = Math.random() * 600 - 300;
      let z = Math.random() * 600 - 300;
      position.push(x, y, z);
    }
    return new Float32Array(position);
  }, []);

  useFrame(() => {    // 매초마다 실행되는 hook
    let idx = 2;
    const positions = bufferRef.current.array;
    geoRef.current.rotateY += 1;
    let velocity = 0;
    let acc = 0.02;

    for (let v = 0; v < 6000; v++) {  // x, y, z중 y좌표를 수정
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
        <bufferAttribute    // BufferGeometry 와 연결된 속성에 대한 데이터를 저장하고 전달
          ref={bufferRef}
          attach="attributes-position"
          array={positions} // 버퍼에 저장된 데이터를 보유하는 배열
          count={positions.length / 3} // 백터의 개수
          itemSize={3} // 배열에 저장되는 백터의 길이
        />
      </bufferGeometry>
      <pointsMaterial      // 점의 재료
        map={STAR}         // useLoader로 로드한 별 사진
        color="white"
        size={1}
        sizeAttenuation
        transparent={false}
      />
    </points>
  );
};

export default Star;
