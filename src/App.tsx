import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';

import {LoginPage} from './auth/LoginPage';
import {useAuth} from './auth/AuthContext';
import {ProtectedRoute} from './app/ProtectedRoute';
import {SectionRouter} from './app/SectionRouter';
import {DashboardPage} from './pages/DashboardPage';

function LoginRoute() {
    const {isAuthenticated} = useAuth();

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return <LoginPage />;
}

export function App() {
    return (
        <Routes>
            <Route path="/login" element={<LoginRoute />} />

            <Route element={<ProtectedRoute />}>
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/:sectionId" element={<SectionRouter />} />
                <Route path="/:sectionId/:subsectionId" element={<SectionRouter />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Route>
        </Routes>
    );
}
