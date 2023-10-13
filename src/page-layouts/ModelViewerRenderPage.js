'use client';

import { useContext, useRef, useState } from 'react';
import {
	Flex,
	Button,
	Text,
	Slider,
	SliderThumb,
	SliderFilledTrack,
	SliderTrack,
	Heading,
	Input,
} from '@chakra-ui/react';
import { FileContext } from '@/context/FileProvider';

const ModelSliders = ({ name, value, setValue }) => {
	return (
		<Flex width="100%" h={'50px'} alignItems="center" m={8} padding="16px">
			<Text width="100px" m="8px">
				{name}
			</Text>
			<Slider
				defaultValue={value}
				onChange={setValue}
				width="70%"
				ml="10px"
				min={0}
				max={1}
				step={0.01}
			>
				<SliderTrack>
					<SliderFilledTrack />
				</SliderTrack>
				<SliderThumb />
			</Slider>
			<Input
				value={value}
				onChange={(event) => setValue(event.target.value)}
				width="20%"
				ml="10px"
			/>
		</Flex>
	);
};

const ModelViewerRenderPage = () => {
	const { fileData } = useContext(FileContext);
	const modelViewerRef = useRef(null);

	const SettingsSidebar = () => {
		const [metallic, setMetallic] = useState(0);
		const [roughness, setRoughness] = useState(0);
		const onChangeColor = () => {
			const [material] = modelViewerRef.current.model.materials;
			material.pbrMetallicRoughness.setBaseColorFactor('#ff0000');
		};
		const onMetallicSliderChange = (value) => {
			const [material] = modelViewerRef.current.model.materials;
			material.pbrMetallicRoughness.setMetallicFactor(value);
			setMetallic(value);
		};
		const onRoughnessSliderChange = (value) => {
			const [material] = modelViewerRef.current.model.materials;
			material.pbrMetallicRoughness.setRoughnessFactor(value);
			setRoughness(value);
		};
		return (
			<Flex
				width="20%"
				height="100%"
				bgColor="gray.200"
				flexDir={'column'}
				alignItems={'center'}
			>
				<Heading mt="50px">Settings</Heading>
				<ModelSliders
					name="Metallic-ness"
					value={metallic}
					setValue={onMetallicSliderChange}
				/>
				<ModelSliders
					name="Roughness"
					value={roughness}
					setValue={onRoughnessSliderChange}
				/>
				<Button onClick={onChangeColor}>
					<Text>Change Color</Text>
				</Button>
			</Flex>
		);
	};

	return (
		<Flex h="100vh" w="100vw" alignItems={'center'} justifyContent={'center'}>
			<SettingsSidebar />
			<model-viewer
				alt="3D file uploaded by user"
				src={fileData}
				camera-controls
				style={{
					width: '90%',
					height: '90%',
				}}
				auto-rotate
				ar
				ref={modelViewerRef}
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
