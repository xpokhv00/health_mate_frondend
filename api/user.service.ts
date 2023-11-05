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

async function getInfoByUserId(id: string): Promise<any> {
    return (await api.get(`doctor/patient/${id}`)).data
}

async function prescribeMedecine(id: string, data: any): Promise<any> {
    return (await api.post(`doctor/patient/${id}/treatment`, data)).data
}

const user = {postInfo, getTreatments, message, getInfoByUserId, prescribeMedecine}
export default user;
