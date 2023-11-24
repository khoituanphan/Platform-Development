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
import Toolbar from '@/src/navigation/Toolbar';
import { Box, Image } from '@chakra-ui/react';


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

const AssetButton = ({ assetName, assetURL, assetImgUrl }) => {
	const { addModel } = useModelStateStore();
	const handleAddModel = () => {
		const uuid = uuidv4();
		addModel(assetURL, uuid);
	};
    return (
        <Box 
            as="button"
            onClick={handleAddModel}
            width="100%" 
			height="150px"
            borderWidth="1px" 
            borderRadius="lg" 
            overflow="hidden"
            textAlign="center"
            mb="20px"
            _hover={{ boxShadow: "md", cursor: "pointer", transform: "translateY(-2px)" }} // Slight lift effect on hover
            transition="transform 0.2s, box-shadow 0.2s" // Smooth transition for hover effect
        >
            <Image 
                src={assetImgUrl} 
                alt={`Image of ${assetName}`}
                width="100%" 
                height="auto" // This makes the image height adjust to its aspect ratio
                objectFit="cover"
            />
            <Text fontSize="lg" fontWeight="bold" mt="2" mb="2">
                {assetName}
            </Text>
        </Box>
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
				const clonedMesh = child.clone(true); // Deep clone

				// Reset the matrix transformation to apply world position, rotation, scale
				clonedMesh.applyMatrix4(child.matrixWorld);

				// If the mesh is a direct child of the original scene, add it to newScene
				// Otherwise, recreate the hierarchy
				if (child.parent === originalScene) {
					newScene.add(clonedMesh);
				} else {
					// Recreate the parent group structure if necessary
					let parentClone = newScene.getObjectByName(child.parent.name);
					if (!parentClone) {
						parentClone = new THREE.Group();
						parentClone.name = child.parent.name;
						newScene.add(parentClone);
					}
					parentClone.add(clonedMesh);
				}
			}
		});

		return newScene;
	};

	const onExport = () => {
		if (scene) {
			console.log(scene.children);
			const newScene = filterMeshesFromScene(scene);
			console.log(newScene.children);
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
					Assets
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
					<TabPanels>
						<TabPanel>
							<AssetButton 
								assetName="Bird" 
								assetURL="/Bird.glb" 
								assetImgUrl="/Bird.png"/>
							<AssetButton 
								assetName="Room" 
								assetURL="/farm.glb" 
								assetImgUrl="/room.png"/>
							<AssetButton 
								assetName="Star Buck" 
								assetURL="/heart.glb"
								assetImgUrl="/starbuck.png"/>
							<AssetButton 
								assetName="Chicken" 
								assetURL="/chicken.glb"
								assetImgUrl="/chicken.png"/>
							<AssetButton 
								assetName="Earth" 
								assetURL="/earth.glb"
								assetImgUrl="/earth.png"/> 
						</TabPanel>
						<Toolbar 
							onSaveToLocal={saveToLocal}
							onInitializeFromLocal={initializeFromLocal}
							onAddModel={() => { 
							<Input
								hidden
								accept=".glb, .gltf"
								type="file"
								id="editor-model-upload"
								onChange={(e) => handleUpload(e)}
							/> }}
							onClearLocal={clearLocal}
							onExport={onExport}
						/>
					</TabPanels>
				</Tabs>
			</Flex>
		</Flex>
	);
};

export default FilePanel;
