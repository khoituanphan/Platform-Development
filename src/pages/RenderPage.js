'use client';

import { useState } from 'react';
import { Box, Text, Flex, VStack } from '@chakra-ui/layout';
import { RepeatIcon } from '@chakra-ui/icons';
import ModelWrapper from '../model/ModelWrapper';

const Actions = ({ children, active, setActive }) => {
	return (
		<Flex
			w="30px"
			h="30px"
			justifyContent={'center'}
			alignItems={'center'}
			filter={active ? 'none' : 'opacity(50%)'}
			backgroundColor={active ? 'none' : 'rgb(12, 12, 12)'}
			border={active ? '1px solid' : 'none'}
			borderRadius={'4px'}
			onClick={setActive}
			transition="all 0.2s ease-in-out"
			willChange={'filter, background-color, border'}
		>
			{children}
		</Flex>
	);
};

const RenderPage = () => {
	const [rotating, setRotating] = useState(false);
	return (
		<Flex
			w="100vw"
			h="100vh"
			p="8px"
			alignItems="center"
			justifyContent="center"
			flexDirection="column"
			// border="1px solid red"
		>
			<Flex
				id="displayCanvas"
				w="92%"
				h="90%"
				border="2px solid"
				borderColor={'gray.300'}
				borderRadius={'12px'}
			>
				<VStack
					p="12px"
					backgroundColor="rgb(20, 20, 20)"
					borderRadius={'12px 0 0 12px'}
				>
					<Actions active={rotating} setActive={() => setRotating(!rotating)}>
						<RepeatIcon />
					</Actions>
				</VStack>
				<ModelWrapper autoRotate={rotating} />
			</Flex>
		</Flex>
	);
};

export default RenderPage;
