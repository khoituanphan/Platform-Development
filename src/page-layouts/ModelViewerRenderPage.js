'use client';

import { useContext } from 'react';
import { Flex, Button } from '@chakra-ui/react';
import { FileContext } from '@/context/FileProvider';

const ModelViewerRenderPage = () => {
	const { fileData } = useContext(FileContext);
	return (
		<Flex h="100vh" w="100vw" alignItems={'center'} justifyContent={'center'}>
			<model-viewer
				alt="3D file uploaded by user"
				src="/cat.glb"
				camera-controls
				style={{
					width: '90%',
					height: '90%',
				}}
				auto-rotate
				ar
			>
				<Button
					slot="ar-button"
					variant={'ghost'}
					colorScheme="white"
					// style="background-color: white; border-radius: 4px; border: none; position: absolute; top: 16px; right: 16px; "
				>
					👋 Activate AR
				</Button>
			</model-viewer>
		</Flex>
	);
};

export default ModelViewerRenderPage;
