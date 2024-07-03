import React, { useRef } from 'react';
import { Flex, Button, Tooltip, Input, FormLabel, Box } from '@chakra-ui/react';
import { useModelStateStore } from '@/editor/store/useStore';
import { useCurrentSelectedModel } from '@/context/CurrentSelectedModelProvider';
import { v4 as uuidv4 } from 'uuid';
import {
	ArrowDownIcon,
	AddIcon,
	DeleteIcon,
	DownloadIcon,
	RepeatIcon,
	SettingsIcon,
} from '@chakra-ui/icons';

const PanelButtons = ({
	children,
	tooltip,
	hoverStyle,
	icon,
	disabled,
	onClick,
}) => {
	return (
		<Tooltip label={tooltip} placement="bottom" hasArrow>
			<Button
				disabled={disabled}
				variant="outline"
				margin="0 10px"
				color="black" // Set text color to white
				_hover={{
					bg: 'blue.500', // Change background to blue on hover
					color: 'black', // Keep text color white on hover
					border: 'none', // Removes border on hover as well
					...hoverStyle,
				}}
				border="none"
				onClick={onClick}
			>
				<Flex alignItems="center" justifyContent="center">
					{icon ? <Box as={icon} ml="0.5" color="black" /> : null}
					{children}
				</Flex>
			</Button>
		</Tooltip>
	);
};

const Toolbar = ({
	onSaveToLocal,
	onInitializeFromLocal,
	onClearLocal,
	onExport,
	setModalOpen,
}) => {
	const { addModel, removeModel } = useModelStateStore();
	const fileInputRef = useRef();
	const { globallySelectedModel, setGloballySelectedModel } =
		useCurrentSelectedModel();

	const handleUpload = (e) => {
		const uuid = uuidv4();
		const file = e.target.files[0];
		const fileURL = URL.createObjectURL(file);
		addModel(fileURL, uuid);
	};

	const triggerFileInput = () => {
		fileInputRef.current.click();
	};

	const deleteIndividualModel = () => {
		if (globallySelectedModel == null) return;
		removeModel(globallySelectedModel);
		setGloballySelectedModel(null);
		console.log('deleting model');
	};

	return (
		<>
			<Flex
				position="fixed"
				left="30%"
				top="10px"
				margin="32px"
				zIndex={99} // Ensure buttons are on top of the hidden toolbar
				justifyContent="space-between"
				width={'min-content'}
			>
				{/* Visible buttons */}
				<Flex>
					{/* Group for left buttons */}
					<PanelButtons
						onClick={onSaveToLocal}
						tooltip="Save to local"
						icon={ArrowDownIcon}
					/>
					<PanelButtons
						onClick={onInitializeFromLocal}
						tooltip="Load data from local"
						icon={DownloadIcon}
					/>
					<PanelButtons
						onClick={triggerFileInput}
						tooltip="Add a model"
						icon={AddIcon}
					/>
					<PanelButtons
						onClick={deleteIndividualModel}
						tooltip="Delete selected model"
						icon={DeleteIcon}
						disabled={globallySelectedModel == null}
					/>
					<PanelButtons
						onClick={onClearLocal}
						tooltip="Clear scene"
						icon={RepeatIcon}
					/>
					<PanelButtons
						onClick={() => setModalOpen(true)}
						tooltip="Animation Settings"
						icon={SettingsIcon}
					/>
				</Flex>

				<Flex>
					<PanelButtons
						onClick={onExport}
						tooltip="Export"
						hoverStyle={{ bg: 'blue.500', color: 'black' }}
					>
						Export
					</PanelButtons>
				</Flex>
			</Flex>
			<FormLabel htmlFor="toolbar-model-upload" hidden>
				<Input
					ref={fileInputRef}
					hidden
					accept=".glb, .gltf"
					type="file"
					id="toolbar-model-upload"
					onChange={handleUpload}
				/>
			</FormLabel>
		</>
	);
};

export default Toolbar;
