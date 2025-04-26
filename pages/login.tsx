import styles from '../styles/login.module.css';
import { useState } from 'react';
import { login } from '@/services/auth';
import { useRouter } from 'next/router';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            await login({ username, password });
            router.push('/home');
        } catch (error) {
            console.error(error);
            alert('Login falhou');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <form className={styles.formBox} onSubmit={handleSubmit}>
                    <h1 className={styles.title}>Controle de Caixa</h1>

                    <div className={styles.formGroup}>
                        <label>Usuário:</label><br />
                        <input
                            type="text"
                            name="username"
                            className={styles.input}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Senha:</label><br />
                        <input
                            type="password"
                            name="password"
                            className={styles.input}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    <button type="submit" className={styles.button} disabled={loading}>
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>
            </div>
        </div>
    );
}