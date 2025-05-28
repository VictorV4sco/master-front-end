// components/BackToHomeButton.tsx
import { useRouter } from 'next/router';
import styles from '../styles/BackToHomeButton.module.css';

export default function BackToHomeButton() {
    const router = useRouter();

    const handleClick = () => {
        router.push('/home');
    };

    return (
        <button className={styles.backButton} onClick={handleClick}>
        ⬅ Home
        </button>
    );
}
