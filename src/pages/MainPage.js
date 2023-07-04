'use client';

import { useState } from 'react';
import {
	Box,
	Text,
	Flex,
	FormControl,
	Input,
	FormLabel,
} from '@chakra-ui/react';
import { DownloadIcon } from '@chakra-ui/icons';
import Sidebar from '../navigation/Sidebar';

const MainPage = () => {
	const [open, setOpen] = useState(true);
	return (
		<>
			<Sidebar isOpen={open} onClose={() => setOpen(false)} />
			<Flex
				h="100vh"
				p="8px"
				w="100vw"
				alignItems="center"
				justifyContent="center"
				flexDirection="column"
			>
				<Text fontSize="5xl">Welcome to ARIS Web View!</Text>
				<FormLabel htmlFor="model">
					<Flex
						h="200px"
						w="300px"
						border="3px solid"
						borderColor={'gray.500'}
						borderRadius={'12px'}
						mt="64px"
						alignItems="center"
						justifyContent="center"
						flexDir="column"
						transition={
							'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out'
						}
						willChange={'border-color'}
						_hover={{
							cursor: 'pointer',
							borderColor: 'gray.200',
							boxShadow: '0px 0px 40px 5px rgba(200,200,200,0.25)',
						}}
					>
						<DownloadIcon
							w={12}
							h={12}
							transform={'rotate(180deg)'}
							color={'gray.400'}
							mb="16px"
						/>
						<Text>Select your model!</Text>
					</Flex>
				</FormLabel>
				<FormControl id="model">
					<Input type="file" accept=".glb" display={'none'} />
				</FormControl>
			</Flex>
		</>
	);
};

export default MainPage;
