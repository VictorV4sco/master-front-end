import api from "./axios";

export async function updatePayment(id: number, payload: any) {
    const response = await api.put(`/payments/update/${id}`, payload);
    return response.data;
}
