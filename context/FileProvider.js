import React, { createContext, useState } from 'react';

const FileContext = createContext(null);

const FileProvider = ({ children }) => {
	const [fileData, setFileData] = useState(null);

	return (
		<FileContext.Provider value={{ fileData, setFileData }}>
			{children}
		</FileContext.Provider>
	);
};

export { FileContext, FileProvider };
