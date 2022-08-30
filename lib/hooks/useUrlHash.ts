import {  useEffect, useState } from "react";

export default function useUrlHash(hash) {
    const [currentUrlHash, setCurrentUrlHash] = useState<string>();
    function updateCurrentHash() {
        if (location.hash != currentUrlHash) {
            setCurrentUrlHash(location.hash);
        }
    }
    useEffect(() => {
        window.addEventListener("hashchange", updateCurrentHash, false);
        return () => {
            window.removeEventListener("hashchange", updateCurrentHash);
        };
    }, []);

    return currentUrlHash === `#${hash}`;
}
