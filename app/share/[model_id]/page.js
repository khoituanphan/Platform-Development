// app/share/[model_id]/page.js
'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import RenderPage from '@/src/page-layouts/RenderPage'; 
import LoadingPage from '@/src/navigation/LoadingPage';

const SharePage = () => {
    const { model_id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [showContinueButton, setShowContinueButton] = useState(false);

    const handleContinue = () => {
        setIsLoading(false); // Hide loading screen when button is clicked
    };

    useEffect(() => {
        const modelViewer = document.querySelector('model-viewer'); // Event listener
        if (modelViewer) {
            modelViewer.addEventListener('load', () => {
                setShowContinueButton(true); // Show the button when model is loaded
            });
        }

        // Cleanup
        return () => {
            if (modelViewer) {
                modelViewer.removeEventListener('load', () => {
                    setShowContinueButton(true);
                });
            }
        };
    }, [model_id]);

    return (
        <>
            <RenderPage modelId={model_id} viewOnly />
			<LoadingPage isLoading={isLoading} onContinue={handleContinue} showContinueButton={showContinueButton} />
        </>
    );
};

export default SharePage;