import { useRouter } from "next/router";
import { useEffect } from "react";
import Cookies from 'js-cookie';
import { useState, ChangeEvent, FormEvent } from 'react';
import moment, { Moment } from 'moment';
import api from "@/services/axios";
import styles from '../styles/payment-insert.module.css';
import { insertPayment } from "@/services/insertPaymentService";

// Importando ícones
import { User, FileText, DollarSign, Calendar } from 'lucide-react';

export default function Payment() {
    const router = useRouter();
    const token = Cookies.get('token');
    const [successMessage, setSuccessMessage] = useState('');
    
    interface FormData {
        payerName: string;
        type: string;
        value: number;
        paymentMoment: Moment;
    }

    const [form, setForm] = useState<FormData>({
        payerName: '',
        type: '',
        value: 0, // inicializando com um valor padrão numérico
        paymentMoment: moment() // inicializando com a data atual
    });

    // Tipando o evento de mudança do input
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === 'value') {
            setForm((prev) => ({ ...prev, [name]: parseFloat(value) })); // Para garantir que o valor seja tratado como número
        } else if (name === 'paymentMoment') {
            setForm((prev) => ({ ...prev, [name]: moment(value) })); // Convertendo a string para momento (data)
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
        const res = await insertPayment(form);
        
        if (res.status === 201) {
            setSuccessMessage('Pagamento inserido com sucesso! 🎉');
            setForm({
                payerName: '',
                type: '',
                value: 0,
                paymentMoment: moment()
            });
        } else {
            console.error('Erro ao inserir pagamento:', res);
        }
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error('Erro:', err.message);
        } else {
            console.error('Erro desconhecido');
        }
    }
};



    useEffect(() => {
            const token = Cookies.get('token');
            if (!token) {
                router.push('/login');  // Redireciona para login se não houver token
            }
            }, [router]);
            
    return (
        <div className={styles.container}>
        {successMessage && (
            <div className={styles.alert}>
                {successMessage}
            </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
            <h2 className={styles.title}>Novo Pagamento</h2>

            <div className={styles.inputGroup}>
                <User />
                <input
                    type="text"
                    name="payerName"
                    value={form.payerName}
                    onChange={handleChange}
                    placeholder="Nome do pagante"
                />
            </div>

            <div className={styles.inputGroup}>
                <FileText />
                <input
                    type="text"
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    placeholder="Tipo"
                />
            </div>

            <div className={styles.inputGroup}>
                <DollarSign />
                <input
                    type="number"
                    name="value"
                    value={form.value}
                    onChange={handleChange}
                    placeholder="Valor"
                />
            </div>

            <div className={styles.inputGroup}>
                <Calendar />
                <input
                    type="datetime-local"
                    name="paymentMoment"
                    value={form.paymentMoment.format('YYYY-MM-DDTHH:mm')}
                    onChange={handleChange}
                />
            </div>

            <button type="submit" className={styles.button}>
                Enviar
            </button>
        </form>
    </div>
    )
}