// Floor.js
// CS-385 Final Project
// Jacob Duncan

import React, { useEffect } from "react";
import { MeshReflectorMaterial } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { LinearEncoding, RepeatWrapping, TextureLoader } from "three";

export function Floor() {
    // Loads the downloaded texture of the floor
    const [textMap, roughness, normal] = useLoader(TextureLoader, [
        process.env.PUBLIC_URL + "Textures/asphalt_02_diff_1k.jpg",
        process.env.PUBLIC_URL + "Textures/asphalt_02_rough_1k.jpg",
        process.env.PUBLIC_URL + "Textures/asphalt_02_nor_gl_1k.jpg",
        // For loading the other floor texture
        /*process.env.PUBLIC_URL + "Textures/floor_tiles_06_diff_1k.jpg",
        process.env.PUBLIC_URL + "Textures/floor_tiles_06_rough_1k.jpg",
        process.env.PUBLIC_URL + "Textures/floor_tiles_06_nor_gl_1k.jpg",*/
    ]);
    // Wraps the texture for the floor around the plane
    useEffect (() => {
        [textMap, roughness, normal].forEach((t) => {
            t.wrapS = RepeatWrapping;
            t.wrapT = RepeatWrapping;
            t.repeat.set(5, 5);
        });
        textMap.encoding = LinearEncoding;
        roughness.encoding = LinearEncoding;
        normal.encoding = LinearEncoding;
    }, [textMap, roughness, normal]);
    // Simulates the floor's movement by moving the texture's position for each frame
    useFrame((state, delta) => {
        let t = -state.clock.getElapsedTime() * 5;
        textMap.offset.set(0, t);
        roughness.offset.set(0, t);
        normal.offset.set(0, t);
    });
    // Returns the floor for rendering in the Showroom
    // Features visual effects as defined in the MeshReflectorMaterial
    // The lines commented out of the MeshReflectorMaterial are for the other floor texture
    return (
      <mesh rotation-x={-Math.PI * 0.5} castShadow receiveShadow>
        <planeGeometry args={[100, 100]} />
        <MeshReflectorMaterial
            envMapIntensity={0}
            map={textMap}
            mapScale={[0.1, 0.1]}
            normalMap={normal}
            normalScale={[0.1, 0.1]}
            roughnessMap={roughness}
            roughnessScale={[0.1, 0.1]}
            dithering={true}
            color={[0.1, 0.1, 0.1]}
            //color={[0.25, 0.25, 0.25]}
            emissive={[0, 0, 0]}
            roughness={0.33}
            mixStrength={25}
            mixContrast={1}
            resolution={1024}
            mirror={0}
            //mirror={0.5}
            depthScale={1}
            //depthScale={0.75}
            minDepthThreshold={1}
            //minDepthThreshold={0.25}
            //maxDepthThreshold={1}
            //depthToBlurRatioBias={0.25}
            reflectorOffset={0}
        />
      </mesh>
    );
}