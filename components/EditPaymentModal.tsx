// components/EditPaymentModal.tsx
import React, { useState } from "react";
import { ListarTodasAsPerguntasType } from "@/types/ListarTodasAsPerguntasType";
import styles from "@/styles/edit-payment-modal.module.css";

type Props = {
	isOpen: boolean;
	onClose: () => void;
	data: ListarTodasAsPerguntasType | null;
	onSave: (updated: ListarTodasAsPerguntasType) => void;
};

const EditPaymentModal: React.FC<Props> = ({ isOpen, onClose, data, onSave }) => {
	const [formData, setFormData] = useState<ListarTodasAsPerguntasType | null>(data);

	if (!isOpen || !formData) return null;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev!,
		[name]: name === "value" ? parseFloat(value) : value,
	}));
};


	const handleSave = () => {
		onSave(formData!);
		onClose();
	};

	return (
		<div className={styles.modalOverlay}>
			<div className={styles.modal}>
				<h2>Editar Pagamento</h2>
				<label>Nome:</label>
				<input name="payerName" value={formData.payerName || ""} onChange={handleChange} />

				<label>Tipo:</label>
				<input name="type" value={formData.type || ""} onChange={handleChange} />

				<label>Valor:</label>
				<input name="value" type="number" value={formData.value || ""} onChange={handleChange} />

				<label>Data de Pagamento:</label>
				<input name="paymentMoment" value={formData.paymentMoment || ""} onChange={handleChange} />

				<div className={styles.buttons}>
					<button onClick={handleSave}>Salvar</button>
					<button onClick={onClose}>Cancelar</button>
				</div>
			</div>
		</div>
	);
};

export default EditPaymentModal;
