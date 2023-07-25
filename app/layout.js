import { Providers } from './providers';
import './globals.css';

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>
				<title>ARIS Web View</title>
				<script
					type="module"
					src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.1.1/model-viewer.min.js"
					async
				></script>
			</head>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
