// LoadingPage.js
import React from 'react';

const LoadingPage = ({ isLoading, onContinue,showContinueButton }) => {
    return (
        isLoading && (
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'blue',
            }}>
                <div style={{
                    textAlign: 'center', 
                }}>
                    <p style={{ color: 'white' }}>Đang tải chờ tí nào,vội thế?</p>
                    {showContinueButton && (
                        <button onClick={onContinue} id="continueButton" style={{
                            marginTop: '20px',
                            padding: '10px 20px',
                            fontSize: '16px',
                            cursor: 'pointer',
                        }}>Đây của mày đây</button>
                    )}
                </div>
            </div>
        )
    );
};

export default LoadingPage;

