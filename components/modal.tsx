import { usePortal, useScrollbarOnBody } from "lib/hooks";
import { useEffect, useState } from "react";
import styles from "./Modal.module.css";

function ModalComponent({ open, setOpened, title, children, footer = null }) {
	return (
		<div
			className={`${styles.container} ${open ? styles.opened : styles.closed}`}
		>
			<div className={styles.modalWrapper}>
				<div
					className={`${styles.modal} ${open ? styles.opened : styles.closed}`}
				>
					{title && (
						<div className={styles.header}>
							<span className={styles.title}>{title}</span>
							<button
								type="button"
								className={styles.close}
								onClick={() => setOpened(false)}
							>
								<svg
									viewBox="0 0 15 15"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									width="15"
									height="15"
								>
									<title>open modal</title>
									<path
										d="M1.5 1.5l12 12m-12 0l12-12"
										stroke={"var(--colors-text)"}
										strokeWidth="2px"
									/>
								</svg>
							</button>
						</div>
					)}
					<div className={styles.body}>{children}</div>
					{footer && <div className={styles.footer}>{footer}</div>}
				</div>
			</div>
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
	}, [open, setScrollingOnBody]);
	const [root, setRoot] = useState<HTMLElement | null>(null);
	useEffect(() => {
		if (parentEl) {
			setRoot(parentEl);
		} else {
			const elm = document.querySelector("body");
			setRoot(elm);
		}
	}, [parentEl]);
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
