// app/providers.tsx
'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import { FileProvider } from '../context/FileProvider';

export function Providers({ children }) {
	return (
		<FileProvider>
			<CacheProvider>
				<ChakraProvider>{children}</ChakraProvider>
			</CacheProvider>
		</FileProvider>
	);
}
