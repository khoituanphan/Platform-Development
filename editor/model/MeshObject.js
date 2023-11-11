'use client';

import { useState, useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { useControls } from 'leva';
import useModelStateStore from '../store/useStore';

const MeshObject = ({ fileURL, fileUUID, ...props }) => {
	const modelStore = useModelStateStore();
	// const model = modelStore.models[fileUUID];
	const modelSettings = useControls('model', {
		position: {
			x: 0,
			y: 0,
			z: 0,
			// onChange: (c) => {
			// 	modelStore.updateModel(fileUUID, {
			// 		position: [c.x, c.y, c.z],
			// 	});
			// 	console.log(modelStore.models[fileUUID]);
			// 	// console.log(c);
			// },
		},
		rotateX: {
			value: 0,
			min: -180,
			max: 180,
		},
		rotateY: {
			value: 0,
			min: -180,
			max: 180,
		},
		rotateZ: {
			value: 0,
			min: -180,
			max: 180,
		},
	});
	console.log(modelSettings);
	const groupRef = useRef(null);
	const gltf = useLoader(GLTFLoader, fileURL);
	return (
		<group
			ref={groupRef}
			{...props}
			// position={[position.x, position.y, position.z]}
		>
			<primitive object={gltf.scene} />
		</group>
	);
};

export default MeshObject;
