// store.js
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { v4 as uuidv4 } from 'uuid';

const useModelStateStore = create(
	immer((set) => ({
		models: {
			'5e96dbba-dc55-4460-9ff5-c694825f7944': {
				uuid: '5e96dbba-dc55-4460-9ff5-c694825f7944',
				fileURL: '/cat.glb',
				position: [0, 0, 0],
				rotation: [0, 0, 0],
				scale: [1, 1, 1],
			},
			'5e96dcba-dc55-4460-9ff5-d694825f3445': {
				uuid: '5e96dcba-dc55-4460-9ff5-d694825f3445',
				fileURL: '/cute_chick.glb',
				position: [0, 0, 0],
				rotation: [0, 0, 0],
				scale: [1, 1, 1],
			},
		},
		addModel: (fileURL) => {
			const uuid = uuidv4();
			set((state) => {
				state.models[uuid] = {
					fileURL,
					position: [0, 0, 0],
					rotation: [0, 0, 0],
					scale: [1, 1, 1],
				};
			});
		},
		updateModel: (uuid, updates) => {
			set((state) => {
				Object.assign(state.models[uuid], updates);
			});
		},
		removeModel: (uuid) => {
			set((state) => {
				delete state.models[uuid];
			});
		},
	}))
);

// Utility functions for local storage
const saveToLocalStorage = (key, value) => {
	localStorage.setItem(key, JSON.stringify(value));
};

const getFromLocalStorage = (key) => {
	const value = localStorage.getItem(key);
	return value ? JSON.parse(value) : null;
};

// Initialize from local storage
const initializeFromLocal = () => {
	const persistedModels = getFromLocalStorage('models');
	if (persistedModels) {
		useModelStateStore.setState({ models: persistedModels });
	}
};

// Subscribe to changes and update local storage
const saveToLocal = () => {
	saveToLocalStorage('models', state.models);
};

const clearLocal = () => {
	localStorage.clear();
};
// useModelStateStore.subscribe((state) =>{})

export { useModelStateStore, saveToLocal, initializeFromLocal };
