'use client';

import FilePanel from './controls/FilePanel';
import { Flex } from '@chakra-ui/react';
import { Canvas } from '@react-three/fiber';
import SceneFiber from './scene/SceneObject';

const CanvasObjectFiber = () => {
	return (
		<>
			<FilePanel />
			<Flex h="100vh" w="100vw" alignItems={'center'} justifyContent={'center'}>
				<Canvas>
					<SceneFiber />
				</Canvas>
			</Flex>
		</>
	);
};

export default CanvasObjectFiber;
