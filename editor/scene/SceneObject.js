'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Flex, Box, Text } from '@chakra-ui/react';
import { OrbitControls, TransformControls } from '@react-three/drei';
import { useControls } from 'leva';
import MeshObject from '../model/MeshObject';

const SceneFiber = () => {
	const { camera, gl } = useThree();
	// to handle selected objects
	const [selectedObject, setSelectedObject] = useState(null);
	const { mode } = useControls({
		mode: {
			options: { editing: 'editing', playing: 'playing' },
		},
	});
	// const [editing, setEditing] = useState(false);
	// ref to the transform controls element
	const transformControlsRef = useRef(null);

	const onSelect = (e) => {
		if (mode === 'playing') return;
		e.stopPropagation();
		setSelectedObject(e.object.parent);
	};

	return (
		<>
			<ambientLight intensity={1} />
			<gridHelper args={[50, 50]} position={[0, 0, 0]} />
			<axesHelper args={[2]} />
			<OrbitControls makeDefault />
			<TransformControls
				ref={transformControlsRef}
				object={selectedObject}
				mode="translate"
				enabled={!!selectedObject && mode === 'editing'}
				showX={!!selectedObject && mode === 'editing'}
				showY={!!selectedObject && mode === 'editing'}
				showZ={!!selectedObject && mode === 'editing'}
				// space="world"
				camera={camera}
			>
				<MeshObject
					onClick={onSelect}
					fileURL="/cat.glb"
					fileUUID="5e96dbba-dc55-4460-9ff5-c694825f7944"
				/>
				{/* <MeshObject onClick={onSelect} fileURL="/batwing.glb" /> */}
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
