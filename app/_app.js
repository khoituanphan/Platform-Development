import { FileProvider } from '../context/FileProvider';
import { ChakraProvider } from '@chakra-ui/react';

function MyApp({ Component, pageProps }) {
	return (
		<FileProvider>
			<ChakraProvider>
				<Component {...pageProps} />
			</ChakraProvider>
		</FileProvider>
	);
}

export default MyApp;
