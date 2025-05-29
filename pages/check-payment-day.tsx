import { useState } from "react";
import { checkPaymentDay } from "@/services/checkPaymentDay";
import { deletePayment } from "@/services/deletePayment";
import { updatePayment } from "@/services/updatePayment";
import { ListarTodasAsPerguntasType } from "@/types/ListarTodasAsPerguntasType";
import styles from "@/styles/check-payment-day.module.css";
import { toast } from 'react-toastify';
import BackToHomeButton from '@/components/BackToHomeButton';
import EditPaymentModal from '@/components/EditPaymentModal';


export default function CheckPaymentDay() {
	const [listPayment, setListPayment] = useState<ListarTodasAsPerguntasType[]>([]);
	const [date, setDate] = useState("");
	const [editingPayment, setEditingPayment] = useState<ListarTodasAsPerguntasType | null>(null);

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

	const handleDelete = async (id: number | undefined) => {
		if (!id) return;

		try {
			await deletePayment(id);
			toast.success("Pagamento excluído com sucesso!");
			setListPayment((prev) => prev.filter((item) => item.id !== id));
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			} else {
				toast.error("Erro ao excluir pagamento.");
			}
		}
	};

	const handleEdit = (payment: ListarTodasAsPerguntasType) => {
		setEditingPayment(payment);
	};

	const handleSave = async (updated: ListarTodasAsPerguntasType) => {
		if (!updated.id) return;

		try {
			await updatePayment(updated.id, updated);
			toast.success("Pagamento atualizado com sucesso!");
			setListPayment((prev) =>
				prev.map((item) => (item.id === updated.id ? updated : item))
			);
			setEditingPayment(null);
		} catch (error) {
			toast.error("Erro ao atualizar pagamento.");
		}
	};

	return (
		<div className={styles.page}>
			<BackToHomeButton />
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

				{listPayment.length > 0 && (
					<div>
						{listPayment.map((item) => (
							<div key={item.id} className={styles.card}>
								<p><span className={styles.label}>ID:</span> {item.id}</p>
								<p><span className={styles.label}>Nome:</span> {item.payerName}</p>
								<p><span className={styles.label}>Tipo:</span> {item.type}</p>
								<p><span className={styles.label}>Valor:</span> R$ {item.value?.toFixed(2)}</p>
								<p><span className={styles.label}>Data de Pagamento:</span> {item.paymentMoment}</p>

								<div className={styles.cardActions}>
									<button
										className={styles.editButton}
										onClick={() => handleEdit(item)}
									>
										Editar
									</button>
									<button
										className={styles.deleteButton}
										onClick={() => handleDelete(item.id)}
									>
										Deletar
									</button>
								</div>
							</div>
						))}
					</div>
				)}

				{editingPayment && (
                    <EditPaymentModal
                        isOpen={true}
                        data={editingPayment}
                        onClose={() => setEditingPayment(null)}
                        onSave={handleSave}
                    />
                )}
			</div>
		</div>
	);
}
