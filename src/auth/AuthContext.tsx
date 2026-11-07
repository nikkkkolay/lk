import React from 'react';

import {validateCredentials, type Credentials} from './credentials';

const STORAGE_KEY = 'lk.auth.user';

type AuthState = {
    isAuthenticated: boolean;
    login: string | null;
    signIn: (credentials: Credentials) => boolean;
    signOut: () => void;
};

const AuthContext = React.createContext<AuthState | null>(null);

function readStoredLogin(): string | null {
    try {
        return window.localStorage.getItem(STORAGE_KEY);
    } catch {
        return null;
    }
}

export function AuthProvider({children}: React.PropsWithChildren) {
    const [login, setLogin] = React.useState<string | null>(() => readStoredLogin());

    const signIn = React.useCallback((credentials: Credentials) => {
        if (!validateCredentials(credentials)) {
            return false;
        }

        const normalized = credentials.login.trim().toLowerCase();
        try {
            window.localStorage.setItem(STORAGE_KEY, normalized);
        } catch {
            // localStorage may be unavailable — сессия проживёт до перезагрузки
        }
        setLogin(normalized);
        return true;
    }, []);

    const signOut = React.useCallback(() => {
        try {
            window.localStorage.removeItem(STORAGE_KEY);
        } catch {
            // ignore
        }
        setLogin(null);
    }, []);

    const value = React.useMemo<AuthState>(
        () => ({
            isAuthenticated: Boolean(login),
            login,
            signIn,
            signOut,
        }),
        [login, signIn, signOut],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
    const context = React.useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }

    return context;
}
