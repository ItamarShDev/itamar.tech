import { useState } from "react";

export default function useScrollObserver() {
    const [percentage, setPercentage] = useState(0);
    if (process.browser)
        window.onscroll = () => {
            const winScroll =
                document.body.scrollTop || document.documentElement.scrollTop;
            const height =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            setPercentage(scrolled);
        };
    return percentage;
}
