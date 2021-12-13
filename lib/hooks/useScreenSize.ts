import { useEffect, useState } from "react";

function useMedia(query: string) {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        let media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        let listener = () => setMatches(media.matches);
        media.addListener(listener);
        return () => media.removeListener(listener);
    }, [query]);

    return matches;
}

export default function useScreenSize() {
    const isMobile = useMedia("(max-width: 968px)");
    return { isMobile };
}
