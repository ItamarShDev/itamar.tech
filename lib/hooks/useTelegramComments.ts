import { useEffect } from "react";

const useTelegramComments = (elementId = "blog-post") => {
	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://comments.app/js/widget.js?3";
		script.async = true;
		script.setAttribute("data-comments-app-website", "Uw2PtLy1");
		script.setAttribute("data-limit", "5");
		script.setAttribute("data-color", "F0B138");
		script.setAttribute("data-dislikes", "1");
		script.setAttribute("data-colorful", "1");
		script.setAttribute("data-dark", "1");
		const post = document.getElementById(elementId);
		if (post) post.appendChild(script);

		return () => {
			if (post) post.removeChild(script);
		};
	}, [elementId]);
};

export default useTelegramComments;
