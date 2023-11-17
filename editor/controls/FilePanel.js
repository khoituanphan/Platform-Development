'use client';

import { useContext } from 'react';
import {
	Flex,
	Heading,
	Text,
	Button,
	FormLabel,
	Input,
} from '@chakra-ui/react';
import {
	saveToLocal,
	clearLocal,
	useModelStateStore,
	initializeFromLocal,
} from '../store/useStore';
import { addModelToDB } from '../store/localdb';
import { v4 as uuidv4 } from 'uuid';
import { SceneContext } from '@/context/SceneProvider';
import { useRouter } from 'next/navigation';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';

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
	const { scene } = useContext(SceneContext);
	const router = useRouter();
	// Function to handle the export and upload
	const exportAndUploadScene = () => {
		if (scene) {
			const exporter = new GLTFExporter();
			exporter.parse(
				scene,
				function (glb) {
					const blob = new Blob([glb], { type: 'model/gltf-binary' });
					uploadToServer(blob);
				},
				{ binary: true }
			);
		}
	};

	// Function to handle the upload
	const uploadToServer = async (blob) => {
		const formData = new FormData();
		formData.append('file', blob, '3dscene.glb');
		try {
			const res = await fetch('/api/upload-model', {
				method: 'POST',
				body: formData,
			});
			const data = await res.json();
			console.log(data);
			router.push(`/render/${data.body.modelID}`);
		} catch (err) {
			console.error(err);
		}
	};

	const { addModel } = useModelStateStore();

	const handleUpload = (e) => {
		const uuid = uuidv4();
		const file = e.target.files[0];
		const fileURL = URL.createObjectURL(file);

		// console.log(fileURL);
		// setFileData(fileURL);
		// router.push('/render');
		addModelToDB({
			uuid: uuid,
			file: file,
			position: { x: 0, y: 0, z: 0 },
			rotation: { x: 0, y: 0, z: 0 },
			scale: { x: 1, y: 1, z: 1 },
		});
		addModel(fileURL, uuid);
		console.log(file);
	};

	// .then((response) => response.json())
	// .then((data) => {
	// 	console.log('Upload successful', data);
	// 	// Handle success, update UI or state as needed
	// })
	// .catch((error) => {
	// 	console.error('Error uploading :', error);
	// 	// Handle error, update UI or state as needed
	// });

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
				<PanelButtons onClick={saveToLocal}>Save to local</PanelButtons>
				<PanelButtons onClick={initializeFromLocal}>
					Load data from local
				</PanelButtons>
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
				<PanelButtons onClick={clearLocal}>Clear scene</PanelButtons>
				<PanelButtons onClick={exportAndUploadScene}>
					Upload Scene to Model Viewer
				</PanelButtons>
			</Flex>
		</Flex>
	);
};

export default FilePanel;
