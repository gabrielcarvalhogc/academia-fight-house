import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminPage from '../pages/AdminPage/AdminPage';

const AppRouter: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/admin" element={<AdminPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;