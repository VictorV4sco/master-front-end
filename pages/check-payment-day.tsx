import { useState } from "react";
import { checkPaymentDay } from "@/services/checkPaymentDay";
import { ListarTodasAsPerguntasType } from "@/types/ListarTodasAsPerguntasType";
import styles from "@/styles/check-payment-day.module.css";
import { toast } from 'react-toastify';

export default function CheckPaymentDay() {
    const [listPayment, setListPayment] = useState<ListarTodasAsPerguntasType[]>([]);
    const [date, setDate] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!date) return;

    const [year, month, day] = date.split("-");
    try {
        const data = await checkPaymentDay.getListarTodasAsPerguntas(year, month, day);

        if (!Array.isArray(data) || data.length === 0) {
            toast.info("Nenhum pagamento encontrado para esta data.");
        }

        setListPayment(data || []);
    } catch (error) {
        if (error instanceof Error) {
        toast.error(error.message);
    } else {
        toast.error("Erro ao buscar os pagamentos.");
    }
    setListPayment([]);
    }
};


    return (
        <div className={styles.page}>
            
            <div className={styles.container}>
                <h1 className={styles.title}>Buscar Pagamentos por Data</h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <label htmlFor="date">Data:</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className={styles.input}
                    />
                    <button type="submit" className={styles.button}>
                        Buscar
                    </button>
                </form>

                {listPayment.length > 0 ? (
                    <div>
                        {listPayment.map((item) => (
                            <div key={item.id} className={styles.card}>
                                <p><span className={styles.label}>ID:</span> {item.id}</p>
                                <p><span className={styles.label}>Nome:</span> {item.payerName}</p>
                                <p><span className={styles.label}>Tipo:</span> {item.type}</p>
                                <p><span className={styles.label}>Valor:</span> R$ {item.value?.toFixed(2)}</p>
                                <p><span className={styles.label}>Data de Pagamento:</span> {item.paymentMoment}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Nenhum pagamento encontrado.</p>
                )}
            </div>

        </div>
    );
}
