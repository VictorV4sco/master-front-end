import { useState } from 'react';
import styles from '../styles/home.module.css'
import Link from 'next/link'

export default function HomePage() {
    const [openPagamento, setOpenPagamento] = useState(false);
    const [openDespesa, setOpenDespesa] = useState(false);

    return (
        <div className={styles.container}>
            <h1 className={styles.welcome}>Academia Master</h1>

            <div className={styles.main}>

                <div>
                    <h2 className={styles.subtitulo}>Pagamentos</h2>
                    <nav className={styles.navigation}>
                        <ul className={styles.ul}>
                            <li><Link className={styles.link} href="/payment">Inserir</Link></li>
                            <li><a className={styles.link} href="">Atualizar</a></li>
                            <li><a className={styles.link} href="">Deletar</a></li>

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

                <div>
                    <h2 className={styles.subtitulo}>Despesas</h2>
                    <nav className={styles.navigation}>
                        <ul className={styles.ul}>
                            <li><a className={styles.link} href="">Inserir</a></li>
                            <li><a className={styles.link} href="">Atualizar</a></li>
                            <li><a className={styles.link} href="">Deletar</a></li>
                            
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

                <div>
                    <h2 className={styles.subtitulo}>Academia</h2>
                    <nav className={styles.navigation}>
                        <ul className={styles.ul}>
                            <li><a className={styles.link} href="">Checar ganhos</a></li>
                        </ul>
                    </nav>
                </div>

            </div>

        </div>
    )
}
