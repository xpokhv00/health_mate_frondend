import { ILogin, IRegister } from "../types/Auth";
import api from "./api.service";

async function login(data : ILogin): Promise<any> {
    return (await api.post(`/auth/login`, data)).data;
}

async function register(data: IRegister): Promise<any> {
    return (await api.post(`/auth/register`, data)).data;
}

const auth = {login, register}
export default auth;
