'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TransformControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { useControls, folder } from 'leva';
import { useModelStateStore } from '../store/useStore';

const MeshObject = ({ fileURL, fileUUID, editing, mode, ...props }) => {
	// const model = modelStore.models[fileUUID];
	const [selectedObject, setSelectedObject] = useState(null);

	// console.log('from meshobject', modelSettings);
	const groupRef = useRef(null);
	const transformControlsRef = useRef(null);

	// Load the GLTF file
	const gltf = useLoader(GLTFLoader, fileURL);

	const onSelect = (e) => {
		// console.log('onSelect');
		if (!editing) return;
		e.stopPropagation();
		// have to set this as groupRef.current or it will select individual meshes
		setSelectedObject(groupRef.current);
	};
	const { updateModel, models } = useModelStateStore();
	// console.log(selectedObject);
	const [modelSettings, set] = useControls(() => ({
		[fileUUID]: folder({
			position: {
				x: 0,
				y: 0,
				z: 0,
				render: (get) => get('editing'),
				onChange: (e) => {
					// console.log(e);
					groupRef.current.position.x = e.x;
					groupRef.current.position.y = e.y;
					groupRef.current.position.z = e.z;
					updateModel(fileUUID, {
						...models[fileUUID],
						position: {
							x: e.x,
							y: e.y,
							z: e.z,
						},
					});
				},
			},
			rotateX: {
				value: 0,
				min: 0,
				max: 2 * Math.PI,
				render: (get) => get('editing'),
				onChange: (e) => {
					groupRef.current.rotation.x = e;
					updateModel(fileUUID, {
						...models[fileUUID],
						rotation: {
							...models[fileUUID].rotation,
							x: e,
						},
					});
				},
			},
			rotateY: {
				value: 0,
				min: 0,
				max: 2 * Math.PI,
				render: (get) => get('editing'),
				onChange: (e) => {
					groupRef.current.rotation.y = e;
					updateModel(fileUUID, {
						...models[fileUUID],
						rotation: {
							...models[fileUUID].rotation,
							y: e,
						},
					});
				},
			},
			rotateZ: {
				value: 0,
				min: 0,
				max: 2 * Math.PI,
				render: (get) => get('editing'),
				onChange: (e) => {
					groupRef.current.rotation.z = e;
					updateModel(fileUUID, {
						...models[fileUUID],
						rotation: {
							...models[fileUUID].rotation,
							z: e,
						},
					});
				},
			},
			scale: {
				x: 1,
				y: 1,
				z: 1,
				render: (get) => get('editing'),
				onChange: (e) => {
					groupRef.current.scale.x = e.x;
					groupRef.current.scale.y = e.y;
					groupRef.current.scale.z = e.z;
					updateModel(fileUUID, {
						...models[fileUUID],
						scale: {
							x: e.x,
							y: e.y,
							z: e.z,
						},
					});
				},
			},
		}),
	}));

	// to sync the state from TransformControls to leva by only updating them when the user is done dragging
	const onTranslate = useCallback(() => {
		// console.log(groupRef.current.position);
		let newPosition = {
			x: groupRef.current?.position.x,
			y: groupRef.current?.position.y,
			z: groupRef.current?.position.z,
		};
		set({ position: newPosition });
	}, [set]);

	const onRotate = useCallback(() => {
		let newRotation = {
			x: groupRef.current?.rotation.x,
			y: groupRef.current?.rotation.y,
			z: groupRef.current?.rotation.z,
		};

		set({
			rotateX: newRotation.x,
			rotateY: newRotation.y,
			rotateZ: newRotation.z,
		});
	}, [set]);

	const onScale = useCallback(() => {
		let newScale = {
			x: groupRef.current?.scale.x,
			y: groupRef.current?.scale.y,
			z: groupRef.current?.scale.z,
		};

		set({ scale: newScale });
	}, [set]);
	// adds event listener to TransformControls through useEffect
	useEffect(() => {
		const controls = transformControlsRef.current;
		const onDragChange = (e) => {
			// event has finished
			// console.log(e);
			if (!e.value) {
				if (mode === 'translate') onTranslate();
				if (mode === 'rotate') onRotate();
				if (mode === 'scale') onScale();
				// console.log('hey');
			}
		};
		controls.addEventListener('dragging-changed', onDragChange);
		return () => controls.removeEventListener('dragging-changed', onDragChange);
	}, [onTranslate, onRotate, onScale, mode]);

	return (
		<TransformControls
			ref={transformControlsRef}
			object={selectedObject}
			mode={mode}
			enabled={!!selectedObject && editing}
			showX={!!selectedObject && editing}
			showY={!!selectedObject && editing}
			showZ={!!selectedObject && editing}
		>
			<>
				<group
					ref={groupRef}
					onClick={onSelect}
					onDoubleClick={() => setSelectedObject(null)}
					{...props}
				>
					<primitive object={gltf.scene} />
				</group>
			</>
		</TransformControls>
	);
};

export default MeshObject;
