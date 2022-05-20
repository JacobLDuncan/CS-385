// Car.js
// CS-385 Final Project
// Jacob Duncan

import React, { useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";

export function Car() {
    const gltf = useLoader(GLTFLoader, process.env.PUBLIC_URL + "/Racecar/scene.gltf");
    useEffect(() => {
        //gltf.scene.scale.set(0.005, 0.005, 0.005);
        //gltf.scene.position.set(0, -0.035, 0);
        gltf.scene.scale.set(1.5, 1.5, 1.5);
        gltf.scene.position.set(0, 0.85, 1);
        gltf.scene.traverse((object) => {
            if (object instanceof Mesh) {
                object.castShadow = true;
                object.receiveShadow = true;
                object.material.envMapIntensity = 20;
            }
        });
    }, [gltf]);
    // Animation for the tires of the car to spin
    // Not working, as this model comes a single child that contains all four wheels,
    // rather than each wheel being a child of the car.
    // I've been unable to get these wheels to spin and maintain their position on the car.
    /*
    useFrame((state, delta) => {
        let t = state.clock.getElapsedTime();
        // Rotates rims
        gltf.scene.children[0].children[0].children[0].rotation.x = t * 2;
        // Rotates tires
        gltf.scene.children[0].children[0].children[2].rotation.x = t * 2;
    });*/
    return <primitive object={gltf.scene}/>
}