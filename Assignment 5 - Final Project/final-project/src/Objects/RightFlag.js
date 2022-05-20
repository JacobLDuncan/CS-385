// RightFlag.js
// CS-385 Final Project
// Jacob Duncan

import React, { useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";

export function RightFlag() {
    // Loads the checkered flag gltf model for the right flag
    const rightFlag = useLoader(GLTFLoader, process.env.PUBLIC_URL + "/Flag/RightFlag/scene.gltf");
    // Initializes the transformations of the right flag for use in the Showroom
    useEffect(() => {
        rightFlag.scene.scale.set(0.5, 0.5, 0.5);
        rightFlag.scene.position.set(-3, 2, 4);
        rightFlag.scene.rotation.set(0.5, -0.5, 1);
        rightFlag.scene.traverse((object) => {
            if (object instanceof Mesh) {
                object.castShadow = true;
                object.receiveShadow = false;
            }
        });
    }, [rightFlag]);
    // Animates the right flag by applying rotations each frame to make the flag "wave"
    useFrame((state, delta) => {
        let t = state.clock.getElapsedTime();
        rightFlag.scene.rotation.x = t * 5;
        rightFlag.scene.rotation.z = t * 5;
    });
    return <primitive object={rightFlag.scene}/>
}