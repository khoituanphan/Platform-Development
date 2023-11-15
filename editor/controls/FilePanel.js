import React from 'react';
import {
	Flex,
	Heading,
	Text,
	Button,
	FormLabel,
	Input,
} from '@chakra-ui/react';
import { saveToLocal, clearLocal, useModelStateStore } from '../store/useStore';

const PanelButtons = ({ children, ...props }) => {
	return (
		<Button
			{...props}
			variant={'outline'}
			width="100%"
			height={'100px'}
			marginTop="32px"
		>
			{children}
		</Button>
	);
};

const FilePanel = () => {
	const { addModel } = useModelStateStore();
	const handleUpload = (e) => {
		const file = e.target.files[0];
		const fileURL = URL.createObjectURL(file);
		addModel(fileURL);
		// console.log(fileURL);
		// setFileData(fileURL);
		// router.push('/render');
	};
	return (
		<Flex
			position="fixed"
			width="300px"
			height="calc(100vh - 64px)"
			left="0"
			margin="32px"
			zIndex={99}
			boxShadow={'0px 0px 10px 0px rgba(0,0,0,0.75)'}
			bgColor={'#292d39'}
			borderRadius={'12px'}
			// padding={'24px'}
			alignItems={'center'}
			flexDirection={'column'}
			// alignItems={'center'}
		>
			<Flex height="70px" justifyContent={'center'} alignItems={'center'}>
				<Text fontFamily="Monospace" color="#8c92a3" fontSize="2xl">
					File Panel
				</Text>
			</Flex>
			<Flex
				width="100%"
				borderRadius={'12px 12px 0 0 '}
				// justifyContent={'center'}
				alignItems={'center'}
				padding={'24px'}
				bgColor="#181c20"
				flexDir={'column'}
				height="calc(100% - 70px)"
			>
				<PanelButtons onClick={() => saveToLocal()}>Save to local</PanelButtons>
				<PanelButtons>Load data from local</PanelButtons>
				<FormLabel htmlFor="editor-model-upload" w="100%">
					<PanelButtons as="div">Add a model</PanelButtons>
				</FormLabel>
				<Input
					hidden
					accept=".glb, .gltf"
					type="file"
					id="editor-model-upload"
					onChange={(e) => handleUpload(e)}
				/>
				<PanelButtons>Clear scene</PanelButtons>
			</Flex>
		</Flex>
	);
};

export default FilePanel;
