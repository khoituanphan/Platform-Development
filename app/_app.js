// pages/_app.js

import { FileContextProvider } from '@/context/FileProvider';

function MyApp({ Component, pageProps }) {
  return (
    <FileContextProvider>
	  <ModelViewerRenderPage />
      <Component {...pageProps} />
    </FileContextProvider>
  );
}

export default MyApp;
