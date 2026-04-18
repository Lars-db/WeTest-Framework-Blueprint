import { APIRequestContext, APIResponse } from '@playwright/test';

export class UsersApi {
    constructor(private readonly request: APIRequestContext) {}

    login(credentials: { email: string; password: string }): Promise<APIResponse> {
        return this.request.post('/users/login', { data: credentials });
    }

    register(data: {
        first_name: string;
        last_name?: string;
        email: string;
        password?: string;
        dob?: string;
    }): Promise<APIResponse> {
        return this.request.post('/users/register', { data });
    }

    getMe(token: string): Promise<APIResponse> {
        return this.request.get('/users/me', {
            headers: { Authorization: `Bearer ${token}` },
        });
    }

    getMeUnauthorized(): Promise<APIResponse> {
        return this.request.get('/users/me');
    }

    logout(token: string): Promise<APIResponse> {
        return this.request.get('/users/logout', {
            headers: { Authorization: `Bearer ${token}` },
        });
    }
}
