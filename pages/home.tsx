import styles from '../styles/home.module.css'

export default function HomePage() {
    return (
        <div>
            <h1 className={styles.welcome}>Bem-vindo!</h1>

            <div className={styles.payments}>
                <h2>Pagamentos</h2>
                <ul>
                    <li><button>Inserir Pagamento</button></li>
                    <li><button>Checar pagamento - número</button></li>
                    <li><button>Checar pagamento - dia</button></li>
                    <li><button>Checar pagamento - mês</button></li>
                    <li><button>Checar pagamento - ano</button></li>
                </ul>
            </div>
        </div>
    )
}
