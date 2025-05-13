import api from "./axios";
import moment from "moment";

export interface PaymentPayload {
    payerName: string;
    type: string;
    value: number;
    paymentMoment: moment.Moment;
}

export async function insertPayment(payload: PaymentPayload) {
    const formattedPayload = {
        ...payload,
        paymentMoment: payload.paymentMoment.format("YYYY-MM-DDTHH:mm:ss"),
};

const response = await api.post("/payments/new", formattedPayload);
return response;
}
