function getNarrowAngle() {
	const degree = Math.random() * 360;
	if (degree % 60 > 30) return degree + 30;
	return degree;
}
function HomeBackground() {
	const randomDegree = getNarrowAngle();
	return (
		<>
			<div className="bg" />
			<div className="bg bg2" />
			<div className="bg bg3" />
			<style jsx>{`
                .bg {
                    animation: slide 20s ease-in-out 2 alternate;
                    background-image: linear-gradient(
                        -${randomDegree}deg,
                        var(--colors-bg) 50%,
                        var(--colors-hoverDecorations) 50%
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
                    animation-duration: 15s;
                }

                .bg3 {
                    animation-duration: 12s;
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
