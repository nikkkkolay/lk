import React from 'react';

export function useIsMobile(breakpoint = 760): boolean {
    const query = `(max-width: ${breakpoint}px)`;

    const [isMobile, setIsMobile] = React.useState(() =>
        typeof window === 'undefined' ? false : window.matchMedia(query).matches,
    );

    React.useEffect(() => {
        const mediaQuery = window.matchMedia(query);
        const onChange = (event: MediaQueryListEvent) => setIsMobile(event.matches);

        setIsMobile(mediaQuery.matches);
        mediaQuery.addEventListener('change', onChange);

        return () => mediaQuery.removeEventListener('change', onChange);
    }, [query]);

    return isMobile;
}
