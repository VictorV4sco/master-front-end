import { useEffect, useState } from 'react';
import styles from '../styles/home.module.css'
import Link from 'next/link'
import LogoutButton from '@/components/LogoutButton';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

export default function HomePage() {
    const [openPagamento, setOpenPagamento] = useState(false);
    const [openDespesa, setOpenDespesa] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) {
            router.push('/login');
        }
    }, [router]);

    return (
        <div className={styles.container}>
            <h1 className={styles.welcome}>Academia Master</h1>
            <LogoutButton />

            <div className={styles.main}>

                <div className={styles.card}>
                    <h2 className={styles.subtitulo}>Pagamentos</h2>
                    <nav className={styles.navigation}>
                        <ul className={styles.ul}>
                            <li><Link className={styles.link} href="/insert-payment">Inserir</Link></li>
                            <li className={styles.dropdown}>
                                <button className={styles.link} onClick={() => setOpenPagamento(!openPagamento)}>
                                    Checar pagamento
                                </button>
                                {openPagamento && (
                                    <ul className={styles.dropdownMenu}>
                                        <li><a href="#">Número</a></li>
                                        <li><a href="#">Dia</a></li>
                                        <li><a href="#">Mês</a></li>
                                        <li><a href="#">Ano</a></li>
                                    </ul>
                                )}
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className={styles.card}>
                    <h2 className={styles.subtitulo}>Despesas</h2>
                    <nav className={styles.navigation}>
                        <ul className={styles.ul}>
                            <li><a className={styles.link} href="#">Inserir</a></li>
                            <li className={styles.dropdown}>
                                <button className={styles.link} onClick={() => setOpenDespesa(!openDespesa)}>
                                    Checar despesa
                                </button>
                                {openDespesa && (
                                    <ul className={styles.dropdownMenu}>
                                        <li><a href="#">Número</a></li>
                                        <li><a href="#">Dia</a></li>
                                        <li><a href="#">Mês</a></li>
                                        <li><a href="#">Ano</a></li>
                                    </ul>
                                )}
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className={styles.card}>
                    <h2 className={styles.subtitulo}>Academia</h2>
                    <nav className={styles.navigation}>
                        <ul className={styles.ul}>
                            <li><a className={styles.link} href="#">Checar ganhos</a></li>
                        </ul>
                    </nav>
                </div>

            </div>
        </div>
    );
}
