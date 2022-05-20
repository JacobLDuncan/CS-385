// LeftFlag.js
// CS-385 Final Project
// Jacob Duncan

import React, { useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";

export function LeftFlag() {
    // Loads the checkered flag gltf model for the left flag
    const leftFlag = useLoader(GLTFLoader, process.env.PUBLIC_URL + "/Flag/LeftFlag/scene.gltf");
    // Initializes the transformations of the left flag for use in the Showroom
    useEffect(() => {
        leftFlag.scene.scale.set(0.5, 0.5, 0.5);
        leftFlag.scene.position.set(3, 2, 4);
        leftFlag.scene.rotation.set(0.5, -0.5, 1);
        leftFlag.scene.traverse((object) => {
            if (object instanceof Mesh) {
                object.castShadow = true;
                object.receiveShadow = false;
            }
        });
    }, [leftFlag]);
    // Animates the left flag by applying rotations each frame to make the flag "wave"
    useFrame((state, delta) => {
        let t = state.clock.getElapsedTime();
        leftFlag.scene.rotation.x = t * -5;
        leftFlag.scene.rotation.z = t * -5;
    });
    return <primitive object={leftFlag.scene}/>
}