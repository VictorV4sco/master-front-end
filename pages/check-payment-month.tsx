import { useState } from 'react';
import { checkPaymentMonth } from '@/services/getPaymentsByMonthService';
import moment from 'moment';
import styles from '../styles/check-payment-month.module.css';
import BackToHomeButton from '@/components/BackToHomeButton';

interface Payment {
	payerName: string;
	type: string;
	value: number;
	paymentMoment: string;
}

export default function CheckPaymentMonth() {
	const [year, setYear] = useState('');
	const [month, setMonth] = useState('');
	const [payments, setPayments] = useState<Payment[]>([]);
	const [error, setError] = useState('');

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError('');
		setPayments([]);

		try {
			const data = await checkPaymentMonth.getListarTodosPagamentosDoMes(year, month);
			setPayments(data);
		} catch (err: any) {
			setError(err.message);
		}
	};

	return (
		<div className={styles.container}>
			<form onSubmit={handleSubmit} className={styles.form}>
				<h2 className={styles.title}>Consultar Pagamentos por Mês</h2>

				<div className={styles.inputGroup}>
					<input
						type="text"
						placeholder="Ano (ex: 2025)"
						value={year}
						onChange={(e) => setYear(e.target.value)}
					/>
				</div>

				<div className={styles.inputGroup}>
					<input
						type="text"
						placeholder="Mês (ex: 05)"
						value={month}
						onChange={(e) => setMonth(e.target.value)}
					/>
				</div>

				<button type="submit" className={styles.button}>
					Buscar
				</button>

				{error && (
					<div className={styles.alertError}>
						{error}
					</div>
				)}

				{payments.length > 0 ? (
					<div className={styles.result}>
						<h3>Pagamentos encontrados:</h3>
						<ul>
							{payments.map((p, i) => (
								<li key={i} className={styles.paymentItem}>
									<strong>Nome:</strong> {p.payerName} <br />
									<strong>Tipo:</strong> {p.type} <br />
									<strong>Valor:</strong> R$ {p.value.toFixed(2)} <br />
									<strong>Data:</strong>{' '}
									{moment(p.paymentMoment).format('DD/MM/YYYY HH:mm')}
								</li>
							))}
						</ul>
					</div>
				) : (
					!error && (
						<div className={styles.noPayments}>
							Nenhum pagamento encontrado para o mês e ano informados.
						</div>
					)
				)}
			</form>

			<BackToHomeButton />
		</div>
	);
}
