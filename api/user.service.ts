import { ITreatment } from "../types/Treatment";
import { IUserInfo } from "../types/User";
import { IMessage } from "../types/IMessage";
import api from "./api.service";

async function postInfo(data: IUserInfo): Promise<any> {
    return (await api.post(`user/info`, data)).data;
}

async function putInfo(id: string, data: IUserInfo): Promise<any> {
    return (await api.put(`auth/api/profile/${id}/`, data)).data;
}

async function getTreatments(): Promise<any> {
    return (await api.get(`user/medication_today`)).data
}

async function putTreatments(id: string, data: any): Promise<any> {
    return (await api.put(`auth/api/treatment/${id}/`, data)).data
}

async function getDiagnosis(): Promise<any> {
    return (await api.get(`user/diagnosis`)).data
}

async function message(data: IMessage): Promise<any> {
    return (await api.post(`medisearch/message`, data)).data
}

async function doctorMessage(data: { message: string; email: string }): Promise<any> {
    return (await api.post(`user/message/doctor`, data)).data
}

async function getInfoByUserId(id: string): Promise<any> {
    return (await api.get(`doctor/patient/${id}`)).data
}

async function getAppointmentsByPatientId(id: string): Promise<any> {
    return (await api.get(`patient/${id}/appointment`)).data
}

async function getAppointmentsByDoctorId(id: string): Promise<any> {
    return (await api.get(`doctor/${id}/appointment`)).data
}

async function getMedications(): Promise<any> {
    return (await api.get(`auth/api/medication/`)).data
}

async function getDoctors(): Promise<any> {
    return (await api.get(`user/doctor`)).data
}

async function getPatients(): Promise<any> {
    return (await api.get(`user/patient`)).data
}

async function prescribeMedecine(id: string, data: any): Promise<any> {
    return (await api.post(`doctor/patient/${id}/treatment`, data)).data
}

async function createAppointment(id: string, data: any): Promise<any> {
    return (await api.post(`doctor/patient/${id}/appointment`, data)).data
}

async function deleteAppointment(id: string): Promise<any> {
    return (await api.delete(`auth/api/appointment/${id}/`)).data
}

async function deleteDiagnosis(id: string): Promise<any> {
    return (await api.delete(`auth/api/diagnosis/${id}/`)).data
}

async function deleteMedicine(id: string): Promise<any> {
    return (await api.delete(`auth/api/treatment/${id}/`)).data
}

async function prescribeDiagnosis(id: string, data: any): Promise<any> {
    return (await api.post(`doctor/patient/${id}/diagnosis`, data)).data
}

const user = {postInfo, getTreatments, message, getInfoByUserId, prescribeMedecine, getMedications, getDoctors, doctorMessage, getAppointmentsByPatientId, getAppointmentsByDoctorId, getPatients, prescribeDiagnosis, createAppointment, getDiagnosis, putInfo, deleteMedicine, deleteDiagnosis, putTreatments, deleteAppointment}
export default user;
