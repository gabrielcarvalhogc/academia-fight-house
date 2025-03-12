import React, { useEffect, useState } from 'react';
import AdminLogin from '../../components/adminLogin/AdminLogin';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import Spinner from 'react-bootstrap/esm/Spinner';

interface JwtPayload {
    exp: number;
}

const AdminPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [token, setToken] = useState<string | null>(null);
    const navigate = useNavigate();

    const isTokenExpired = (token: string): boolean => {
        try {
            const decoded: JwtPayload = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            return decoded.exp < currentTime;
        } catch (e) {
            console.error("Erro ao decodificar o token", e);
            return true;
        }
    };

    const checkAuthentication = () => {
        const storedToken = Cookies.get("jwtToken") || "";
        if (storedToken && !isTokenExpired(storedToken)) {
            setToken(storedToken);
        } else {
            Cookies.remove("jwtToken");
            setToken(null);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        checkAuthentication();

        const interval = setInterval(() => {
            if (token && isTokenExpired(token)) {
                Cookies.remove("jwtToken");
                setToken(null);
                navigate("/admin");
            }
        }, 600000); // 10 minutos

        return () => clearInterval(interval);
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