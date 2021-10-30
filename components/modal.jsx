import { useScrollbarOnBody, usePortal } from "lib/hooks";
import { useState, useEffect } from "react";

function ModalComponent({ open, setOpened, title, children, footer = null }) {
    return (
        <div className={`container ${open ? "opened" : "closed"}`}>
            <div className="modal-wrapper">
                <div className={`modal ${open ? "opened" : "closed"}`}>
                    {title && (
                        <div className="header">
                            <span className="title">{title}</span>
                            <a
                                className="close"
                                onClick={() => setOpened(false)}
                            >
                                <svg
                                    viewBox="0 0 15 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="15"
                                    height="15"
                                >
                                    <path
                                        d="M1.5 1.5l12 12m-12 0l12-12"
                                        stroke={"var(--colors-text)"}
                                        strokeWidth="2px"
                                    ></path>
                                </svg>
                            </a>
                        </div>
                    )}
                    <div className="body">{children}</div>
                    {footer && <div className="footer">{footer}</div>}
                </div>
            </div>

            <style jsx>{`
                .container {
                    transition: backdrop-filter 1s ease-in-out;
                    z-index: 10;
                    bottom: 0;
                    top: 0;
                    right: 0;
                    left: 0;
                    height: 100%;
                    width: 100%;
                    background-color: rgba(0, 0, 0, 0.6);
                }
                .container.opened {
                    position: fixed;
                    display: block;
                    backdrop-filter: blur(5px) grayscale(1);
                }
                .container.closed {
                    backdrop-filter: blur(0) grayscale(0);
                }
                .modal-wrapper {
                    position: absolute;
                    top: 30%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
                .modal {
                    width: 600px;
                    display: grid;
                    grid-template-rows: 6rem 1fr;
                    background-color: var(--colors-modalBg);
                    border: 1px solid var(--colors-decorations);
                    border-radius: 1rem;
                    padding: 1rem;
                    box-shadow: 0 0 10em -3em var(--colors-decorations);
                    transform-origin: center;
                }
                @media screen and (max-width: 768px) and (orientation: portrait) {
                    .modal-wrapper {
                        left: 0;
                        right: 0;
                        top: 0;
                        transform: translate(0, 0);
                    }
                    .modal {
                        width: 100%;
                    }
                }
                .modal.opened {
                    transition: transform 0.5s ease-in;
                    transform: scale(1);
                }
                .modal.closed {
                    transition: transform 0.5s ease-in;
                    transform: scale(0);
                }

                .header {
                    display: grid;
                    grid-template-columns: 1fr 6rem;
                }

                .title {
                    line-height: 6rem;
                    font-size: 3rem;
                    margin: 0;
                    padding: 0 1rem;
                }

                .body {
                    padding: 15px 1rem;
                    height: 100%;
                }
                .header .close {
                    font-size: 3rem;
                    display: flex;
                    text-align: center;
                    line-height: 6rem;
                    cursor: pointer;
                    color: var(--colors-text);
                    justify-content: center;
                    align-items: center;
                }
                .close:hover {
                    opacity: 0.8;
                    transform: scale(1.3) rotate(1turn);
                    transition: transform ease-in-out 0.3s;
                    transform-origin: center center;
                }
            `}</style>
        </div>
    );
}

function Modal({
    open,
    setOpened,
    refreshOnRender,
    title,
    children,
    footer = null,
    parentEl = null,
}) {
    const [_, setScrollingOnBody] = useScrollbarOnBody(!open);
    useEffect(() => {
        setScrollingOnBody(!open);
    }, [open]);
    const [root, setRoot] = useState(null);
    useEffect(() => {
        if (parentEl) {
            setRoot(parentEl);
        } else {
            const elm = document.querySelector("body");
            setRoot(elm);
        }
    }, []);
    const modal = (
        <ModalComponent
            open={open}
            setOpened={setOpened}
            title={title}
            footer={footer}
        >
            {children}
        </ModalComponent>
    );
    const portal = usePortal(modal, root);

    if (!process.browser) return null;
    if (!root) return null;

    if (refreshOnRender) {
        return open ? portal : null;
    }
    return portal;
}

export default Modal;
