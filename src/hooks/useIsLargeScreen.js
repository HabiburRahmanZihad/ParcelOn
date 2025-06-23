// hooks/useIsLargeScreen.js
import { useEffect, useState } from "react";

const useIsLargeScreen = () => {
    const [isLargeScreen, setIsLargeScreen] = useState(() => window.innerWidth >= 1024);

    useEffect(() => {
        const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return isLargeScreen;
};

export default useIsLargeScreen;