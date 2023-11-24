import React, { useRef } from 'react';
import {
  Flex,
  Button,
  Tooltip,
  Input,
  FormLabel,
  Box,
} from '@chakra-ui/react';
import { useModelStateStore } from '@/editor/store/useStore';
import { v4 as uuidv4 } from 'uuid';
import { ArrowDownIcon, AddIcon, DeleteIcon, DownloadIcon } from '@chakra-ui/icons';


const PanelButtons = ({ children, tooltip, hoverStyle, icon ,...props }) => {
    return (
      <Tooltip label={tooltip} placement="bottom" hasArrow>
        <Button
          {...props}
          variant='outline'
        //   minWidth="60px" // Adjust this value as needed
          margin="0 10px"
          color="white" // Set text color to white
          _hover={{ 
            bg: "blue.500", // Change background to blue on hover
            color: "white", // Keep text color white on hover
            ...hoverStyle,
            border: 'none' // Removes border on hover as well
        }}      
          border="none"
        >
            <Flex alignItems="center" justifyContent="center">
            {icon ? <Box as={icon} ml="0.5" color="black" /> : null}
            {children}
            </Flex>
        </Button>
      </Tooltip>
    );
};

const Toolbar = ({ onSaveToLocal, onInitializeFromLocal, onClearLocal, onExport }) => {
    const { addModel } = useModelStateStore();
    const fileInputRef = useRef();


    const handleUpload = (e) => {
        const uuid = uuidv4();
        const file = e.target.files[0];
        const fileURL = URL.createObjectURL(file);

        addModel(fileURL, uuid);
        // additional logic if needed
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

  return (
    <Flex
      position="fixed"
      width="1000px"
      height="calc(100vh - 1050px)"
      left="600"
      margin="32px"
      zIndex={99}
      boxShadow={'0px 0px 10px 0px rgba(0,0,0,0.75)'}
      bgColor={'#292d39'}
      borderRadius={'12px'}
      alignItems={'center'}
      flexDirection={'row'}
      justifyContent='space-between' // Adjusts the space between the left and right groups
      top="10px"
    >
      <Flex> {/* Group for left buttons */}
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
            onClick={onClearLocal} 
            tooltip="Clear scene"
            icon={DeleteIcon}
        />
      </Flex>

      <Flex> {/* Group for right button */}
        <PanelButtons 
            onClick={onExport}
            tooltip="Export "
            hoverStyle={{ bg: "blue.500", color: "white" }}>Export</PanelButtons>
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
    </Flex>
  );
};

export default Toolbar;
