import React, { useState, useEffect } from 'react';
import './Robot.css';

const MrRobotic = () => {
    const [isChatVisible, setIsChatVisible] = useState(false);
    const [isRobotMinimized, setIsRobotMinimized] = useState(false);
    const [animationState, setAnimationState] = useState('');
    const [isTextVisible, setIsTextVisible] = useState(false);
    const [textAnimationTimer, setTextAnimationTimer] = useState(null);

    useEffect(() => {
        const minimized = localStorage.getItem('robotMinimized') === 'true';
        setIsRobotMinimized(minimized);
    }, []);

    useEffect(() => {
        localStorage.setItem('robotMinimized', isRobotMinimized.toString());
    }, [isRobotMinimized]);

    useEffect(() => {
        if (isRobotMinimized) {
            // Stop and clear any previous timer
            if (textAnimationTimer) {
                clearTimeout(textAnimationTimer);
            }
            setIsTextVisible(false);
            setAnimationState('animate-out');
        } else {
            const startAnimation = () => {
                setAnimationState('animate-in');
                setIsTextVisible(true); // Start fading in text

                const timer1 = setTimeout(() => {
                    setAnimationState('animate-out');
                    const timer2 = setTimeout(() => setIsTextVisible(false), 3000); // Fade out text after 3 seconds

                    const timer3 = setTimeout(startAnimation, 8000); // Start animation again after 8 seconds of hidden state
                    setTextAnimationTimer(timer3);
                }, 11000); // Total time: 3s fade-in, 3s visible, 3s fade-out, 2s hidden before restarting

                setTextAnimationTimer(timer1);
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
        const currentPage = window.location.pathname === '/about' ? '/' : '/about';
        window.location.href = currentPage;
    };

    const goToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsChatVisible(false); // Close chat bubbles when scrolling to top
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

            {/* Background dimmer */}
            {isChatVisible && (
                <div id="backdrop" className={`backdrop ${isChatVisible ? 'active' : ''}`} onClick={() => setIsChatVisible(false)}>
                </div>
            )}

            {/* Scrolling text */}
            {!isRobotMinimized && isTextVisible && (
                <div id="scrolling-text" className="scrolling-text">
                    {"Need help?"}
                </div>
            )}
        </div>
    );
};

export default MrRobotic;
