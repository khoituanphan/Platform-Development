'use client';

import { useContext, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Flex } from '@chakra-ui/react';
import { OrbitControls, TransformControls } from '@react-three/drei';
import { useControls, folder } from 'leva';
import MeshObject from '../model/MeshObject';
import { useModelStateStore } from '../store/useStore';
import { SceneContext } from '@/context/SceneProvider';

const SceneFiber = () => {
	// to handle selected objects
	const { scene } = useThree();
	const { setScene } = useContext(SceneContext);

	useEffect(() => {
		setScene(scene);
	}, [scene, setScene]);

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
		</>
	);
};

export default SceneFiber;
