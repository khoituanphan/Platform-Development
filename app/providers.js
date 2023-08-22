// app/providers.js
'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import { FileContextProvider } from '@/context/FileProvider';
import { SessionProvider } from 'next-auth/react';

export function Providers({ children, session }) {
	return (
		<SessionProvider session={session}>
			<FileContextProvider>
				<CacheProvider>
					<ChakraProvider>{children}</ChakraProvider>
				</CacheProvider>
			</FileContextProvider>
		</SessionProvider>
	);
}
