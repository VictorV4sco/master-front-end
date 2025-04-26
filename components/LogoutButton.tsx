'use client'; // <- se estiver usando Next.js 13+ com App Route
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = () => {
        Cookies.remove('token'); // Remove o token
        router.push('/login');   // Redireciona para login
    };

    return (
        <button 
            onClick={handleLogout} 
            style={{ 
                position: 'absolute',
                top: '20px',       // Distância do topo
                right: '20px',     // Distância da borda direita
                padding: '10px 20px',
            }}>
            Logout
        </button>
    );
}
