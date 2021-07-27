import { useThemeContext } from "lib/hooks/useTheme";
import React from "react";

function HomeBackground() {
    const randomDegree = Math.random() * 360;
    const { theme } = useThemeContext();
    return (
        <>
            <div className="bg"></div>
            <div className="bg bg2"></div>
            <div className="bg bg3"></div>
            <style jsx>{`
                .bg {
                    animation: slide 10s ease-in-out infinite alternate;
                    background-image: linear-gradient(
                        -${randomDegree}deg,
                        ${theme.bg} 50%,
                        ${theme.hoverDecorations} 50%
                    );
                    bottom: 0;
                    left: -50%;
                    opacity: 0.5;
                    position: fixed;
                    right: -50%;
                    top: 0;
                    z-index: -1;
                }

                .bg2 {
                    animation-direction: alternate-reverse;
                    animation-duration: 13s;
                }

                .bg3 {
                    animation-duration: 10s;
                }
                @keyframes slide {
                    from {
                        transform: translateX(-25%);
                    }
                    to {
                        transform: translateX(25%);
                    }
                }
            `}</style>
        </>
    );
}

export default HomeBackground;
