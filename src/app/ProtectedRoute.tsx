import React from 'react';
import {Navigate, Outlet, useLocation} from 'react-router-dom';

import {useAuth} from '../auth/AuthContext';
import {DesktopLayout} from '../layout/DesktopLayout';
import {MobileLayout} from '../layout/MobileLayout';
import {useIsMobile} from './useIsMobile';
import {SECTIONS} from './navigation';

export function ProtectedRoute() {
    const {isAuthenticated} = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{from: location.pathname}} replace />;
    }

    return <ProtectedLayout />;
}

function ProtectedLayout() {
    const isMobile = useIsMobile();
    const location = useLocation();
    const activeSection = React.useMemo(() => {
        const segment = location.pathname.split('/').filter(Boolean)[0];
        return SECTIONS.some((section) => section.id === segment) ? segment : 'dashboard';
    }, [location.pathname]);

    React.useLayoutEffect(() => {
        window.scrollTo({top: 0, behavior: 'auto'});
    }, [location.pathname]);

    if (isMobile) {
        return (
            <MobileLayout activeSection={activeSection}>
                <Outlet />
            </MobileLayout>
        );
    }

    return (
        <DesktopLayout activeSection={activeSection}>
            <Outlet />
        </DesktopLayout>
    );
}
