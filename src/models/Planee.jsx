import React from "react";
import planeScene from "../assets/3d/plane.glb";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useRef ,useEffect} from "react";

function Planee({ isRotating, ...props }) {
  const ref = useRef();
  const { scene, animations } = useGLTF(planeScene);
  const { actions } = useAnimations(animations, ref);


  useEffect(() => {
    console.log({isRotating});
    if (isRotating) {
      actions['Take 001'].play();
    } else {
      actions['Take 001'].stop();
    }
  }, [isRotating, actions]);



  return (
    <mesh {...props} ref={ref}>
      <primitive object={scene} />
    </mesh>
  );
}

export default Planee;
