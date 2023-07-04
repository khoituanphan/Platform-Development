import { Providers } from './providers';
import './globals.css';

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<title>ARIS Web View</title>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
