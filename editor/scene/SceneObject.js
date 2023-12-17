'use client';

import { useContext, useEffect, useCallback } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Flex } from '@chakra-ui/react';
import { OrbitControls, TransformControls } from '@react-three/drei';
import { useControls, folder } from 'leva';
import MeshObject from '../model/MeshObject';
import { useModelStateStore } from '../store/useStore';
import { SceneContext } from '@/context/SceneProvider';
import { v4 as uuidv4 } from 'uuid';


const SceneFiber = () => {
    const { scene } = useThree();
    const { setScene } = useContext(SceneContext);
    const { editing, mode } = useControls({
        editing: {
            value: false,
        },
        mode: {
            options: { translate: 'translate', rotate: 'rotate', scale: 'scale' },
            render: (get) => get('editing'),
        },
    });
    const { models, addModel  } = useModelStateStore();

    useEffect(() => {
        setScene(scene);
    }, [scene, setScene]);

    const handleDragOver = useCallback((e) => {
        e.preventDefault(); // Necessary for the drop event to fire
    }, []);

    const handleDrop = useCallback((e) => {
		e.preventDefault();
		const assetURL = e.dataTransfer.getData("application/my-app");
		if (assetURL) {
			const uuid = uuidv4(); // Generate a new UUID for the new model
			addModel(assetURL, uuid); // Add the new model to the state
		}
	}, [addModel]);

    useEffect(() => {
        const canvasElement = document.getElementsByTagName('canvas')[0];
        canvasElement.addEventListener('dragover', handleDragOver);
        canvasElement.addEventListener('drop', handleDrop);

        return () => {
            canvasElement.removeEventListener('dragover', handleDragOver);
            canvasElement.removeEventListener('drop', handleDrop);
        };
    }, [handleDragOver, handleDrop]);

    return (
        <>
            <ambientLight intensity={1} />
            <gridHelper args={[50, 50, '#2e2f30', '#828399']} position={[0, 0, 0]} />
            <axesHelper args={[2]} />
            <OrbitControls makeDefault />
            {Object.entries(models).map(([uuid, model]) => {
                return (
                    <MeshObject
                        key={uuid}
                        fileUUID={uuid}
                        fileURL={model.fileURL}
                        editing={editing}
                        mode={mode}
                    />
                );
            })}
        </>
    );
};

export default SceneFiber;
