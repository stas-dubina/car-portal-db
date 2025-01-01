import type {AuthProvider, QueryFunctionContext, UserIdentity} from "react-admin";
import {LoginResponse} from "@/app/api/auth/login/route";

const AUTH_KEY = "auth";

export const getToken = () => {
    const auth = localStorage.getItem(AUTH_KEY);
    if (auth) {
        const {token}: LoginResponse = JSON.parse(auth!);
        return token
    }
    return undefined
}

export const authProvider: AuthProvider = {
    checkAuth(params: any): Promise<void> {
        return localStorage.getItem(AUTH_KEY) ? Promise.resolve() : Promise.reject()
    },
    checkError(error: any): Promise<void> {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem(AUTH_KEY);
            return Promise.reject();
        }
        return Promise.resolve(undefined);
    },
    getIdentity(params: QueryFunctionContext | undefined): Promise<UserIdentity> {
        const auth = localStorage.getItem(AUTH_KEY);
        if (!auth) {
            return Promise.reject("Користувача не знайдено")
        }

        const {user}: LoginResponse = JSON.parse(auth);
        return Promise.resolve(user);
    },
    getPermissions(params: any): Promise<any> {
        return Promise.resolve(undefined);
    },
    handleCallback(params: QueryFunctionContext | undefined): Promise<any> {
        return Promise.resolve(undefined);
    },
    async login({username, password}): Promise<any> {
        const resp = await fetch("/api/auth/login", {
            method: "POST",
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            body: JSON.stringify({login: username, password}),
        })

        if (resp.status !== 200) {
            throw new Error(resp.statusText);
        }

        const data: LoginResponse = await resp.json();
        data.user.fullName = `${data.user.firstName} ${data.user.lastName}`

        localStorage.setItem(AUTH_KEY, JSON.stringify(data));
    },
    logout(params: any): Promise<void | false | string> {
        localStorage.removeItem(AUTH_KEY)
        return Promise.resolve();
    }

}