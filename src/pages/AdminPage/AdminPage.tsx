import React, { useEffect, useState } from 'react';
import AdminLogin from '../../components/adminLogin/AdminLogin';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Spinner from 'react-bootstrap/esm/Spinner';
import { useAuth } from '../../hooks/useAuth.ts';

const AdminPage: React.FC = () => {
    const { token, setToken, isLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate("/admin");
        }
    }, [token, navigate]);

    if (isLoading) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        )
    }

    if (!token) {
        return (
            <AdminLogin
                onLoginSuccess={(newToken) => {
                    // Armazena o token em um cookie com expiração de 3 horas (3/24 = 0.125 dias)
                    Cookies.set("jwtToken", newToken, { expires: 0.125, path: "/admin" });
                    setToken(newToken);
                    navigate("/admin");
                }}
            />
        );
    }

    return (
        <main className='bg-light p-5'>
            <h1>Página de Administração</h1>
            <p>Bem-vindo, administrador!</p>
        </main>
    );
};

export default AdminPage;