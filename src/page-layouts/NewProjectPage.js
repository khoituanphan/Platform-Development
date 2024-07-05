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
	useToast,
	FormControl,
} from '@chakra-ui/react';
import Image from 'next/image';

const NewProjectPage = () => {
	const session = useSession();
	const [projectName, setProjectName] = useState('');
	const [buttonPressed, setButtonPressed] = useState(false);
	const toast = useToast();

	const createProject = async () => {
		setButtonPressed(true);
		try {
			if (!projectName) {
				throw new Error('Project name must not be empty.');
			}
			if (!/^[a-zA-Z0-9_]*$/.test(projectName)) {
				throw new Error('Project name must not contain special characters.');
			}
			const projName = session.data?.user?.username + '/' + projectName;
			const res = await fetch('/api/projects/create', {
				method: 'POST',
				body: JSON.stringify({
					projectName: projName,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!res.ok) {
				const msg = await res.json();
				console.log(msg);
				throw new Error('Project creation failed: ' + msg.message);
			}

			toast({
				title: 'Project created successfully!',
				status: 'success',
				duration: 5000,
				isClosable: true,
			});
		} catch (err) {
			console.error(err);
			toast({
				title: 'Project creation failed.',
				description: err.message,
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
		}
		setButtonPressed(false);
	};

	// console.log('from projects: ', session.data.user.username);
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
							<Text fontWeight={'bold'}>{session.data?.user?.username}</Text>
							<Text margin="0 16px">/</Text>
							<FormControl isRequired>
								<Input
									border={'1px solid green'}
									width="200px"
									onChange={(event) => setProjectName(event.target.value)}
								/>
							</FormControl>
						</Flex>
					</ModalBody>
					<ModalFooter>
						<Button
							colorScheme="blue"
							disabled={buttonPressed}
							onClick={() => createProject()}
						>
							Continue
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default NewProjectPage;
