import { Provider } from 'next-auth/client';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from '@/src/layout/layout';
import { FileProvider } from '@/context/FileProvider';

function MyApp({ Component, pageProps }) {
	return (
		<Provider session={pageProps.session}>
			<FileProvider>
				<ChakraProvider>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</ChakraProvider>
			</FileProvider>
		</Provider>
	);
}

export default MyApp;
