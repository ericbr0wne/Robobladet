import React, { useState, useEffect } from 'react';
import './Robot.css';

const MrRobotic = () => {
    const [isChatVisible, setIsChatVisible] = useState(false);
    const [isRobotMinimized, setIsRobotMinimized] = useState(false);
    const [animationState, setAnimationState] = useState('');
    const [isTextVisible, setIsTextVisible] = useState(false);
    const [textAnimationTimer, setTextAnimationTimer] = useState(null);

    useEffect(() => {
        const minimized = sessionStorage.getItem('robotMinimized') === 'true';
        setIsRobotMinimized(minimized);

        if (!minimized) {
            startAnimation();
        }
    }, []);

    useEffect(() => {
        sessionStorage.setItem('robotMinimized', isRobotMinimized.toString());
    }, [isRobotMinimized]);

    useEffect(() => {
        if (isChatVisible) {
            // Hide text when chat bubbles are visible
            setIsTextVisible(false);
            if (textAnimationTimer) {
                clearTimeout(textAnimationTimer);
            }
        } else if (!isRobotMinimized) {
            startAnimation();
        }
    }, [isChatVisible]);

    const startAnimation = () => {
        setAnimationState('animate-in');
        setIsTextVisible(true);

        const timer1 = setTimeout(() => {
            setAnimationState('animate-out');
            const timer2 = setTimeout(() => setIsTextVisible(false), 3000);

            const timer3 = setTimeout(startAnimation, 8000);
            setTextAnimationTimer(timer3);
        }, 11000);

        setTextAnimationTimer(timer1);
    };

    const minimizeRobot = () => {
        setAnimationState('animate-out');
        setTimeout(() => {
            setIsRobotMinimized(true);
            setIsChatVisible(false);
        }, 10);
    };

    const restoreRobot = () => {
        setAnimationState('animate-in');
        setIsRobotMinimized(false);
        setIsChatVisible(false);
        startAnimation();
    };

    const toggleChatBubbles = () => {
        setIsChatVisible(prev => !prev);
    };

    const navigate = () => {
        const currentPage = window.location.pathname === '/about' ? '/' : '/about';
        window.location.href = currentPage;
    };

    const goToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsChatVisible(false);
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
                    <div id="bubble-top" className="chat-bubble" onClick={goToTop}>
                        {"To the top"}
                    </div>
                    <div id="bubble-nav" className="chat-bubble" onClick={navigate}>
                        {window.location.pathname === '/about' ? "Home" : "Who created me?"}
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

            {isChatVisible && (
                <div id="backdrop" className={`backdrop ${isChatVisible ? 'active' : ''}`} onClick={() => setIsChatVisible(false)}>
                </div>
            )}

            {!isRobotMinimized && isTextVisible && !isChatVisible && (
                <div id="scrolling-text" className="scrolling-text">
                    {"Need help?"}
                </div>
            )}
        </div>
    );
};

export default MrRobotic;
