import React from 'react';
import { Flex, Heading, Text, Button } from '@chakra-ui/react';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';
import { useScene } from '../scene/SceneContext';

const FilePanel = () => {

    // Function to handle the export and upload
    const exportAndUploadScene = () => {
        const exporter = new GLTFExporter();
        exporter.parse('scene ở đauuuuuuuuuuuuu', function (glb) {
            const blob = new Blob([glb], { type: 'model/gltf-binary' });
            uploadToServer(blob);
        }, { binary: true });
    };

    // Function to handle the upload
    const uploadToServer = (blob) => {
        const formData = new FormData();
        formData.append('file', blob, 'scene.glb');

        fetch('/api/upload-model', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Upload successful', data);
            // Handle success, update UI or state as needed
        })
        .catch(error => {
            console.error('Error uploading :', error);
            // Handle error, update UI or state as needed
        });
    };

    return (
        <Flex
            position="fixed"
            width="300px"
            height="calc(100vh - 64px)"
            bgColor="#181c20"
            left="0"
            margin="32px"
            zIndex={99}
            boxShadow={'0px 0px 10px 0px rgba(0,0,0,0.75)'}
            borderRadius={'12px'}
            justifyContent={'center'}
        >
            <Flex
                bgColor={'#292d39'}
                width="100%"
                borderRadius={'12px 12px 0 0 '}
                height="70px"
                justifyContent={'center'}
                alignItems={'center'}
                padding={'24px'}
            >
                <Text fontFamily="Monospace" color="#8c92a3" fontSize="2xl">
                    File Panel
                </Text>
            </Flex>
            {/* Add the button here */}
            <Button
                colorScheme="blue"
                margin="20px"
                onClick={exportAndUploadScene}
            >
                Export
            </Button>
        </Flex>
    );
};

export default FilePanel;
