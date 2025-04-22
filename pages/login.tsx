import styles from '../styles/login.module.css'

export default function Login() {
    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <form className={styles.formBox}>
                    <h1 className={styles.title}>Controle de Caixa</h1>
                    <div className={styles.formGroup}>
                        <label>Usuário:</label><br />
                        <input type="text" name="username" className={styles.input} />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Senha:</label><br />
                        <input type="password" name="password" className={styles.input} />
                    </div>
                    <button type="submit" className={styles.button}>Entrar</button>
                </form>
            </div>
        </div>
    );
}