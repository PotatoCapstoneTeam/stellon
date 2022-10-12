import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import Star from './Star';

const Space = () => {
  return (
    <Canvas>
      <PerspectiveCamera
        position={[Math.PI / 2, 0, 1]}
        fov={60}
        near={1}
        far={1000}
        aspect={window.innerWidth / window.innerHeight}
      />
      <Star />
    </Canvas>
  );
};

export default Space;
