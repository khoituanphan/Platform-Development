'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Flex, Box, Text } from '@chakra-ui/react';
import { OrbitControls, TransformControls } from '@react-three/drei';

const MeshObject = ({ ...props }) => {
	const [highlighted, setHighlighted] = useState(false);
	const meshRef = useRef(null);

	const fileURL = '/cat.glb';
	const gltf = useLoader(GLTFLoader, fileURL);

	useFrame(() => {
		if (highlighted) {
			meshRef.current.material.color.set('skyblue');
		} else {
			meshRef.current.material.color.set('white');
		}
	});

	return (
		<mesh
			{...props}
			ref={meshRef}
			onPointerOver={(e) => {
				e.stopPropagation();
				setHighlighted(true);
			}}
			onPointerOut={() => {
				setHighlighted(false);
			}}
		>
			<primitive object={gltf.scene} />;
		</mesh>
	);
};

const SceneFiber = () => {
	const { camera, gl } = useThree();
	// to handle selected objects
	const [selectedObject, setSelectedObject] = useState(null);
	const [editing, setEditing] = useState(false);
	// ref to the transform controls element
	const transformControlsRef = useRef(null);

	const onSelect = (e) => {
		e.stopPropagation();
		setSelectedObject(e.object);
		setEditing(true); // Assuming you want to start editing upon selection
	};

	const clearSelection = (e) => {
		// Check if clicked object is part of the scene (but not necessarily a selectable object)
		if (e) {
			setSelectedObject(null);
			setEditing(false); // Disable editing as nothing is selected
		}
	};

	// TODO: add event listener to the transform controls element and disable object selection
	useEffect(() => {
		// Add event listener to the canvas element
		const onCanvasClick = (e) => {
			// Check if clicked object is part of the scene (but not necessarily a selectable object)
			if (e.target === gl.domElement) {
				clearSelection();
			}
		};
		gl.domElement.addEventListener('pointerdown', onCanvasClick);

		// Specify how to clean up after this effect:
		return () => {
			gl.domElement.removeEventListener('pointerdown', onCanvasClick);
		};
	}, [gl.domElement]);

	return (
		<>
			<ambientLight intensity={1} />
			<gridHelper args={[50, 50]} />
			<axesHelper args={[2]} />
			<OrbitControls makeDefault />
			<TransformControls
				ref={transformControlsRef}
				// object={selectedObject}
				mode="translate"
				enabled={!!selectedObject}
				showX={!!selectedObject}
				showY={!!selectedObject}
				showZ={!!selectedObject}
				space="world"
				camera={camera}
			>
				<MeshObject onClick={onSelect} />
			</TransformControls>
		</>
	);
};

const CanvasObjectFiber = () => {
	return (
		<Flex h="100vh" w="100vw" alignItems={'center'} justifyContent={'center'}>
			<Canvas>
				<SceneFiber />
			</Canvas>
		</Flex>
	);
};

export default CanvasObjectFiber;
