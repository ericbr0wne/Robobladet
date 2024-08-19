import React, { useState, useEffect } from 'react';
import './Robot.css';

const MrRobotic = () => {
    const [isChatVisible, setIsChatVisible] = useState(false);
    const [isRobotMinimized, setIsRobotMinimized] = useState(false);
    const [animationState, setAnimationState] = useState('');

    useEffect(() => {
        const minimized = localStorage.getItem('robotMinimized') === 'true';
        setIsRobotMinimized(minimized);
    }, []);

    useEffect(() => {
        localStorage.setItem('robotMinimized', isRobotMinimized.toString());
    }, [isRobotMinimized]);

    useEffect(() => {
        if (isRobotMinimized) {
            const startAnimation = () => {
                setAnimationState('animate-in');

                // Efter att roboten har glidit in, vänta 10 sekunder och sedan börja animera ut
                setTimeout(() => {
                    setAnimationState('animate-out');


                    setTimeout(startAnimation, 5000);
                }, 10000);
            };


            startAnimation();
        }
    }, [isRobotMinimized]);

    const minimizeRobot = () => {
        setIsRobotMinimized(true);
        setIsChatVisible(false);
    };

    const restoreRobot = () => {
        setIsRobotMinimized(false);
        setIsChatVisible(false);
    };

    const toggleChatBubbles = () => {
        console.log("Robot clicked!");
        setIsChatVisible(prev => !prev);
    };

    const navigate = () => {
        const currentPage = window.location.pathname === '/privacy' ? '/' : '/privacy';
        window.location.href = currentPage;
    };

    return (
        <div className="robot-container">
            <div
                id="robot"
                className={`robot ${isRobotMinimized ? 'minimized' : ''}`}
                onClick={toggleChatBubbles}
            >
            </div>

            {isChatVisible && (
                <div id="chat-bubbles" className={`chat-bubbles ${isChatVisible ? 'show' : ''}`}>
                    <div id="bubble-top" className="chat-bubble" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        {"To the top"}
                    </div>
                    <div id="bubble-nav" className="chat-bubble" onClick={navigate}>
                        {"To other page"}
                    </div>
                    <div id="bubble-hide" className="chat-bubble" onClick={minimizeRobot}>
                        {"Minimize robot"}
                    </div>
                </div>
            )}

            {isRobotMinimized && (
                <div
                    id="minimized-robot"
                    className={`minimized-robot ${animationState}`}
                    onClick={restoreRobot}
                >
                </div>
            )}

            {/* Denna gör så jag kan dämpa bakgrunden när jag klickar på roboten */}
            {isChatVisible && (
                <div id="backdrop" className={`backdrop ${isChatVisible ? 'active' : ''}`} onClick={() => setIsChatVisible(false)}>
                </div>
            )}

            {/* Detta är scroll texten */}
            <div id="scrolling-text" className="scrolling-text" style={{ display: isRobotMinimized ? 'none' : 'block' }}>
                {"Need help?"}
            </div>
        </div>
    );
};

export default MrRobotic;
