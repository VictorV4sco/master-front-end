import api from "./axios";
import { ListarTodasAsPerguntasType } from "@/types/ListarTodasAsPerguntasType";

class checkPaymentDay {
    static async getListarTodasAsPerguntas(
        year: string,
        month: string,
        day: string
    ) {
        try {
            return (await api.get(`/payments/year-month-day/${year}/${month}/${day}`)).data
        } catch (error) {
            console.log(error);
        }
    }
}

export { checkPaymentDay }