// Showroom.js
// CS-385 Final Project
// Jacob Duncan

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import "./styles.css";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Floor } from "./Objects/Floor";
import { Finish } from "./Objects/Finish";
import { Car } from "./Objects/Car";
import { RightFlag } from "./Objects/RightFlag";
import { LeftFlag } from "./Objects/LeftFlag";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { GUI } from 'dat.gui';

function Showroom(){
    // This function is used to populate the canvas with the objects, lights, & effect for the scene.
    // It also sets up the camera and its controls.
    return (
    <>
      <OrbitControls target={[0, 0.25, 0]} maxPolarAngle={1.5}/>
      <PerspectiveCamera makeDefault fov={65} position={[5, 5, 5]}/>
        <color args={[.0, 0, 0]} attach="background"/>
        <RightFlag/>
        <LeftFlag/>
        <Car/>
        <spotLight
            color={lights.light1}
            intensity={0.5}
            angle={0.5}
            penumbra={0.5}
            position={[5, 10, 10]}
            castShadow
            shadow-bias={-0.0001}
        />
        <spotLight
            color={lights.light2}
            intensity={0.5}
            angle={0.5}
            penumbra={0.5}
            position={[5, 10, -10]}
            castShadow
            shadow-bias={-0.0001}
        />
        <spotLight
            color={lights.light3}
            intensity={0.5}
            angle={0.5}
            penumbra={0.5}
            position={[-5, 10, 10]}
            castShadow
            shadow-bias={-0.0001}
        />
        <spotLight
            color={lights.light4}
            intensity={0.5}
            angle={0.5}
            penumbra={0.5}
            position={[-5, 10, -10]}
            castShadow
            shadow-bias={-0.0001}
        />
        <Finish/>
        <Floor/>
        <EffectComposer>
            <Bloom
                blendFunction={BlendFunction.ADD}
                intensity={0.25}
                width={300}
                height={300}
                kernelSize={5}
                luminanceThreshold={0.15}
                luminanceSmoothing={0.025}
            />
        </EffectComposer>
        </>
  );
}

// Variables to hold the color values for each of the four lights
let lights = {
    light1: '#FFFFFF',
    light2: '#FFFFFF',
    light3: '#FFFFFF',
    light4: '#FFFFFF',
}

// Creates a GUI in the top right corner of the page to allow the user to change the color of the lights.
// Not working, as the color of the lights does not change as the value is adjusted by the user.
const gui = new GUI()
const lightFolder = gui.addFolder('Lights')
lightFolder.addColor(lights, 'light1')
           .name('Light 1')
           .listen()
           .onChange( function(e) {lights.light1 = e})
lightFolder.addColor(lights, 'light2')
           .name('Light 2')
           .listen()
           .onChange( function(e) {lights.light2 = e})
lightFolder.addColor(lights, 'light3')
           .name('Light 3')
           .listen()
           .onChange( function(e) {lights.light3 = e})
lightFolder.addColor(lights, 'light4')
           .name('Light 4')
           .listen()
           .onChange( function(e) {lights.light4 = e})

export default function App() {
    return (
        <Suspense fallback={null}>
          <Canvas shadows>
            <Showroom />
          </Canvas>
        </Suspense>
      );
}