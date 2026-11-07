import React from 'react';
import ReactDOM from 'react-dom/client';
import {HashRouter} from 'react-router-dom';

import {MobileProvider, ToasterComponent, ToasterProvider} from '@gravity-ui/uikit';

import '@gravity-ui/uikit/styles/styles.css';
import './styles/theme.css';
import './styles/app.css';

import {App} from './App';
import {AuthProvider} from './auth/AuthContext';
import {ThemeModeProvider} from './app/ThemeModeProvider';
import {toaster} from './app/toaster';
import {useIsMobile} from './app/useIsMobile';

function Root() {
    const isMobile = useIsMobile();

    return (
        <ThemeModeProvider>
            <MobileProvider mobile={isMobile}>
                <ToasterProvider toaster={toaster}>
                    <AuthProvider>
                        {/* HashRouter: GitHub Pages не умеет отдавать SPA по произвольному
                            пути, из-за чего такие ссылки отвечали 404 и ломались при
                            пересылке в мессенджерах. С хешем всегда отдаётся 200. */}
                        <HashRouter>
                            <App />
                        </HashRouter>
                    </AuthProvider>
                    <ToasterComponent />
                </ToasterProvider>
            </MobileProvider>
        </ThemeModeProvider>
    );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>,
);
