import api from "./axios";
import { ListarTodasAsPerguntasType } from "@/types/ListarTodasAsPerguntasType";

class checkPaymentMonth {
	static async getListarTodosPagamentosDoMes(
		year: string,
		month: string
	) {
		try {
			return (
				await api.get(`/payments/year-month/${year}/${month}`)
			).data;
		} catch (error: any) {
			if (error.response?.data?.message) {
				throw new Error(error.response.data.message);
			} else {
				console.log(error);
				throw new Error("Erro ao buscar pagamentos do mês.");
			}
		}
	}
}

export { checkPaymentMonth };
