// app/providers.tsx
'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import { FileContextProvider } from '@/context/FileProvider';

export function Providers({ children }) {
	return (
		<FileContextProvider>
			<CacheProvider>
				<ChakraProvider>{children}</ChakraProvider>
			</CacheProvider>
		</FileContextProvider>
	);
}
