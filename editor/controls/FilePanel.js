import React from 'react';
import { Flex, Heading, Text } from '@chakra-ui/react';

const FilePanel = () => {
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
			// padding={'24px'}
			justifyContent={'center'}

			// alignItems={'center'}
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
		</Flex>
	);
};

export default FilePanel;
