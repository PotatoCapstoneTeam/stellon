import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import Star from './Star';

const Space = () => {
  return (
    <Canvas>
      <PerspectiveCamera
        position={[Math.PI / 2, 0, 1]}
        fov={60} // 수직 시야
        near={1} // 근평면
        far={1000} // 원평면
        aspect={window.innerWidth / window.innerHeight} // 종횡비
      />
      <Star />
    </Canvas>
  );
};

export default Space;
