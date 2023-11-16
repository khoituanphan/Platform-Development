'use client';

import React, { useState, useRef, useEffect, useContext } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Flex } from '@chakra-ui/react';
import { OrbitControls, TransformControls } from '@react-three/drei';
import { useControls, folder } from 'leva';
import MeshObject from '../model/MeshObject';
import { useModelStateStore } from '../store/useStore';
import FilePanel from '../controls/FilePanel';
import SceneContext from './SceneContext';

const SceneFiber = () => {
	const { scene } = useThree();
    const { setScene } = useContext(SceneContext);

    useEffect(() => {
        setScene(scene);
    }, [scene, setScene]);

	// to handle selected objects
	const { editing, mode } = useControls({
		editing: {
			value: false,
		},
		mode: {
			options: { translate: 'translate', rotate: 'rotate', scale: 'scale' },
			render: (get) => get('editing'),
		},
	});
	const { models } = useModelStateStore();
	// const [editing, setEditing] = useState(false);

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

			{/* <MeshObject onClick={onSelect} fileURL="/batwing.glb" /> */}
		</>
	);
};

const CanvasObjectFiber = () => {
    const [scene, setScene] = useState(null);

    return (
        <SceneContext.Provider value={{ scene, setScene }}>
            <FilePanel />
            <Flex h="100vh" w="100vw" alignItems={'center'} justifyContent={'center'}>
                <Canvas>
                    <SceneFiber />
                </Canvas>
            </Flex>
        </SceneContext.Provider>
    );
};

export default CanvasObjectFiber;
