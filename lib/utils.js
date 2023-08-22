//lib/utils.js
function generateModifiedFilename(filename) {
	// Split the filename into name and extension using a regular expression
	const splitName = filename.match(/(.+)(\..+)$/);
	if (!splitName) {
		throw new Error('Invalid filename format');
	}

	const name = splitName[1];
	const extension = splitName[2];

	// Get the current Unix timestamp
	const timestamp = Math.floor(Date.now());

	// Concatenate the name with the timestamp and add back the extension
	const modifiedFilename = `${name}_${timestamp}${extension}`;

	return modifiedFilename;
}

function getFileURL(filename) {
	return `https://${process.env.DO_BUCKET}.nyc3.digitaloceanspaces.com/${filename}`;
}

export { generateModifiedFilename, getFileURL };
