'use client';

import { useState } from 'react';
import { FilePanel, AssetsSidebar } from './controls/FilePanel';
import { Flex } from '@chakra-ui/react';
import { Canvas } from '@react-three/fiber';
import SceneFiber from './scene/SceneObject';
import { SceneContext } from '@/context/SceneProvider';
import { CurrentSelectedModelProvider } from '@/context/CurrentSelectedModelProvider';
import AnimationsModal from './controls/AnimationsModal';

const CanvasObjectFiber = ({ filename }) => {
	const [scene, setScene] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [enableAnimations, setEnableAnimations] = useState(true);

	return (
		<SceneContext.Provider value={{ scene, setScene }}>
			<CurrentSelectedModelProvider>
				<FilePanel setModalOpen={setIsModalOpen} />
				<AssetsSidebar />
				<Flex
					h="100vh"
					w="100vw"
					alignItems={'center'}
					justifyContent={'center'}
					bgColor={'#171923'}
				>
					<Canvas>
						<SceneFiber enableAnimations={enableAnimations} />
					</Canvas>
				</Flex>
				<AnimationsModal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
					enableAnimations={enableAnimations}
					setEnableAnimations={setEnableAnimations}
				/>
			</CurrentSelectedModelProvider>
		</SceneContext.Provider>
	);
};

export default CanvasObjectFiber;
