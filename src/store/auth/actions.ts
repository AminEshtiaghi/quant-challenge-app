import { ActionTree } from "vuex";
import { AuthState } from "./types";
import { RootState } from "../types";
import { Auth, LoginRequest, AuthActionResponse } from "../../models/Auth";
import { AuthMutations } from "./mutations";
import store from "..";

export const actions: ActionTree<AuthState ,RootState> = {
    login({ dispatch }, data: LoginRequest): Promise<AuthActionResponse> {

        let authActionResponse: AuthActionResponse = {
            token: null,
            expires_at: null,
            name: null,
            message: null,
            errors: null
        };

        const requestOptions = {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Accept": "application/json" 
            },
            body: JSON.stringify(data)
        };

        const url = `${process.env.VUE_APP_BASE_URL}/api/auth/login`;
        return fetch(url, requestOptions)
        .then((response) => {

            return response.json();

        })
        .then((authResponse: AuthActionResponse) => {
            
            if (authResponse.token && 
                authResponse.expires_at &&
                authResponse.name) {

                const auth: Auth = {
                    token: authResponse.token,
                    expires_at: new Date(authResponse.expires_at),
                    name: authResponse.name,
                }
                dispatch('setAuthData', auth);
                authActionResponse = authResponse;

            } else {

                authActionResponse.message = authResponse.message;
                authActionResponse.errors = authResponse.errors;

            }
            
            return authActionResponse;
        });

    },
    signout({ dispatch }): Promise<boolean> {

        const authActionResponse: AuthActionResponse = {
            token: null,
            expires_at: null,
            name: null,
            message: null,
            errors: null
        };

        const token = store.getters['auth/getToken'];
        const requestOptions = {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
        };

        const url = `${process.env.VUE_APP_BASE_URL}/api/auth/logout`;
        const result = fetch(url, requestOptions)
        .then((response) => {

            return response.json();

        })
        .then(() => {
            
            dispatch('setAuthData', authActionResponse);
            
            return true;
        });

        return result;

    },
    setAuthData({commit}, context: AuthState): void {
        if (context.token !== null) {
            localStorage.setItem('token', context.token);
            localStorage.setItem('expire_at', context.expires_at.toISOString());
            localStorage.setItem('name', context.name?context.name:'Unknown');
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('expire_at');
            localStorage.removeItem('name');
        }
        
        commit(AuthMutations.setAuth, context);
    },
    autoLogin({dispatch}): void {
        const token: string|null = localStorage.getItem('token');
        const expire_at: string|null = localStorage.getItem('expire_at');
        const expireAtDate: Date = expire_at? new Date(expire_at): new Date();
        const name: string|null = localStorage.getItem('name');

        if (token !== null && expireAtDate > new Date() && name !== null) {
            const auth: Auth = {
                token,
                expires_at: expireAtDate,
                name
            }
            
            dispatch('setAuthData', auth);
        }
    }
};
