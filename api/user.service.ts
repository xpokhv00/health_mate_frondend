import { ITreatment } from "../types/Treatment";
import { IUserInfo } from "../types/User";
import { IMessage } from "../types/IMessage";
import api from "./api.service";

async function postInfo(data: IUserInfo): Promise<any> {
    return (await api.post(`/user/info`, data)).data;
}

async function getTreatments(): Promise<any> {
    return (await api.get(`/user/medication_today`)).data
}

async function message(data: IMessage): Promise<any> {
    return (await api.post(`/medisearch/message`, data)).data
}

async function doctorMessage(data: { message: string; email: string }): Promise<any> {
    return (await api.post(`user/message/doctor`, data)).data
}

async function getInfoByUserId(id: string): Promise<any> {
    return (await api.get(`doctor/patient/${id}`)).data
}

async function getMedications(): Promise<any> {
    return (await api.get(`auth/api/medication/`)).data
}

async function getDoctors(): Promise<any> {
    return (await api.get(`user/doctor`)).data
}
async function prescribeMedecine(id: string, data: any): Promise<any> {
    return (await api.post(`doctor/patient/${id}/treatment`, data)).data
}

const user = {postInfo, getTreatments, message, getInfoByUserId, prescribeMedecine, getMedications, getDoctors, doctorMessage}
export default user;
