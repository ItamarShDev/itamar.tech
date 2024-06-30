import ReactDOM from "react-dom";

/**
 * Creates a portal for a component under the selected dom area
 * @param {JSX.Element} component
 * @param {HTMLElement} parent
 */
export default function usePortal(component, parent) {
	if (process.browser) {
		const elm = parent || document.getElementsByTagName("body")[0];
		return ReactDOM.createPortal(component, elm);
	}
	return component;
}
