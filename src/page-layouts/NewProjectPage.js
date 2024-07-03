'use client';

import React from 'react';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import {
	Text,
	Box,
	Button,
	Flex,
	Input,
	Modal,
	ModalOverlay,
	ModalBody,
	ModalContent,
	ModalHeader,
	ModalFooter,
} from '@chakra-ui/react';
import Image from 'next/image';

const NewProjectPage = () => {
	const session = useSession();
	const [projectName, setProjectName] = useState('');
	console.log(session);
	return (
		<>
			<Box
				height="100vh"
				width={'100vw'}
				maxHeight={'100vh'}
				maxWidth={'100vw'}
				backgroundColor="#2f3730"
			>
				<Image
					src="/resc.webp"
					alt="background"
					layout="fill"
					objectFit="cover"
					style={{ filter: 'blur(10px)' }}
				/>
			</Box>
			<Modal isOpen={true} size="xl" isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>New Project</ModalHeader>
					<ModalBody>
						<Text margin="8px 0">project name</Text>
						<Flex alignItems="center">
							<Text fontWeight={'bold'}>placeholder</Text>
							<Text margin="0 16px">/</Text>
							<Input width="200px" />
						</Flex>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme="blue">Continue</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default NewProjectPage;
