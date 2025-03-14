import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
    exp: number;
}

export const useAuth = () => {
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const isTokenExpired = (token: string): boolean => {
        try {
            const decoded: JwtPayload = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            return decoded.exp < currentTime;
        } catch (error) {
            console.error("Erro ao decodificar o token:", error);
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
            }
        }, 600000); // 10 minutos

        return () => clearInterval(interval);
    }, [token]);

    return { token, setToken, isLoading };
};
