export default function useScreenSize() {
    if (process.browser) {
        const isMobile =
            window.matchMedia &&
            window.matchMedia("screen and (max-width: 968px)").matches;
        return { isMobile };
    }
    return {};
}
