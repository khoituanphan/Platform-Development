'use client';

import { useContext } from 'react';
import {
	Flex,
	Heading,
	Text,
	Button,
	FormLabel,
	Input,
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
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
import * as THREE from 'three';

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

const AssetButton = ({ assetName, assetURL }) => {
	const { addModel } = useModelStateStore();
	const handleAddModel = () => {
		const uuid = uuidv4();
		addModel(assetURL, uuid);
	};
	return (
		<PanelButtons onClick={() => handleAddModel()}>{assetName}</PanelButtons>
	);
};

const FilePanel = () => {
	const { scene } = useContext(SceneContext);
	const router = useRouter();
	const exporter = new GLTFExporter();

	const filterMeshesFromScene = (originalScene) => {
		const newScene = new THREE.Scene();
		originalScene.traverse((child) => {
			if (child.isGroup) {
				// Clone the mesh
				const clonedMesh = child.clone();

				// Add the cloned mesh to the export scene
				newScene.add(clonedMesh);
			}
		});

		return newScene;
	};

	const onExport = () => {
		if (scene) {
			// console.log(scene.children);
			const newScene = filterMeshesFromScene(scene);
			// console.log(newScene.children);
			exporter.parse(
				newScene,
				(gltf) => {
					console.log(gltf);
					const blob = new Blob([gltf], { type: 'model/gltf-binary' });
					uploadToServer(blob);

					// download only for debug purposes

					// const link = document.createElement('a');
					// link.style.display = 'none';
					// link.href = URL.createObjectURL(blob);
					// link.download = 'scene.glb';
					// document.body.appendChild(link);
					// link.click();
					// document.body.removeChild(link);
				},
				(err) => {
					console.error(err);
				},
				{
					binary: true,
				}
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
				<Tabs isFitted variant="enclosed" width={'100%'}>
					<TabList>
						<Tab>Assets</Tab>
						<Tab>Actions</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>
							<AssetButton assetName="Cat" assetURL="/cat.glb" />
							<AssetButton assetName="Batwing" assetURL="/batwing.glb" />
							<AssetButton assetName="Cute Chick" assetURL="/cute_chick.glb" />
						</TabPanel>
						<TabPanel>
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
							<PanelButtons onClick={onExport}>
								Upload Scene to Model Viewer
							</PanelButtons>
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Flex>
		</Flex>
	);
};

export default FilePanel;
