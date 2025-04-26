import { useRouter } from "next/router";
import { useEffect } from "react";
import Cookies from 'js-cookie';

export default function Payment() {
    const router = useRouter();
    
    useEffect(() => {
            const token = Cookies.get('token');
            if (!token) {
                router.push('/login');  // Redireciona para login se não houver token
            }
            }, [router]);

    return (
        <div>oi</div>
    )
}