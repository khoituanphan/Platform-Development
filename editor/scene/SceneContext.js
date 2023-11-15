import React, { createContext, useContext } from 'react';

const SceneContext = createContext(null);

export const useScene = () => useContext(SceneContext);

export const SceneProvider = ({ children, scene }) => {
    return (
        <SceneContext.Provider value={scene}>
            {children}
        </SceneContext.Provider>
    );
};
