import api from "./axios";

export async function deletePayment(id: number) {
    const response = await api.delete(`/payments/delete/${id}`);
    return response.data;
}
