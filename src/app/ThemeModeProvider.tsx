import React from 'react';

import {ThemeProvider, type RealTheme} from '@gravity-ui/uikit';

const STORAGE_KEY = 'lk.theme';

type ThemeMode = 'light' | 'dark';

type ThemeModeContextValue = {
    theme: ThemeMode;
    toggleTheme: () => void;
    setTheme: (theme: ThemeMode) => void;
};

const ThemeModeContext = React.createContext<ThemeModeContextValue | null>(null);

function getInitialTheme(): ThemeMode {
    try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored === 'light' || stored === 'dark') {
            return stored;
        }
    } catch {
        // ignore
    }

    const prefersDark =
        typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;

    return prefersDark ? 'dark' : 'light';
}

export function ThemeModeProvider({children}: React.PropsWithChildren) {
    const [theme, setThemeState] = React.useState<ThemeMode>(getInitialTheme);

    const setTheme = React.useCallback((next: ThemeMode) => {
        setThemeState(next);
        try {
            window.localStorage.setItem(STORAGE_KEY, next);
        } catch {
            // ignore
        }
    }, []);

    const toggleTheme = React.useCallback(() => {
        setThemeState((current) => {
            const next: ThemeMode = current === 'light' ? 'dark' : 'light';
            try {
                window.localStorage.setItem(STORAGE_KEY, next);
            } catch {
                // ignore
            }
            return next;
        });
    }, []);

    React.useEffect(() => {
        const meta = document.querySelector('meta[name="theme-color"]');
        meta?.setAttribute('content', theme === 'light' ? '#e7ebf4' : '#1f2328');
    }, [theme]);

    const value = React.useMemo(() => ({theme, toggleTheme, setTheme}), [theme, toggleTheme, setTheme]);

    return (
        <ThemeModeContext.Provider value={value}>
            <ThemeProvider theme={theme as RealTheme}>{children}</ThemeProvider>
        </ThemeModeContext.Provider>
    );
}

export function useThemeMode(): ThemeModeContextValue {
    const context = React.useContext(ThemeModeContext);

    if (!context) {
        throw new Error('useThemeMode must be used within ThemeModeProvider');
    }

    return context;
}
