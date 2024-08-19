import React, { useState, useEffect } from 'react';
import './Robot.css';

const MrRobotic = () => {
    const [isChatVisible, setIsChatVisible] = useState(false);
    const [isRobotMinimized, setIsRobotMinimized] = useState(false);

    useEffect(() => {
        const minimized = localStorage.getItem('robotMinimized') === 'true';
        setIsRobotMinimized(minimized);
    }, []);

    useEffect(() => {
        localStorage.setItem('robotMinimized', isRobotMinimized.toString());
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
                    className="minimized-robot"
                    onClick={restoreRobot}
                >
                </div>
            )}

            {isChatVisible && (
                <div id="backdrop" className="backdrop" onClick={() => setIsChatVisible(false)}>
                    {"Vad är detta????"}
                </div>
            )}

            <div id="scrolling-text" style={{ display: isRobotMinimized ? 'none' : 'block' }}>
                {"Hej behöver du hjälp?"}
            </div>
        </div>
    );
};

export default MrRobotic;
