/**
 * FACADE PATTERN — UserApiHelper
 *
 * Problem it solves: callers shouldn't need to know about headers, URL
 * construction, JSON parsing, or the shape of the login response just to get
 * a Bearer token. The helper exposes a clean surface; implementation details
 * (resolve, URL composition, auth header) stay hidden inside.
 *
 * Two levels of facade shown here:
 *  1. Individual methods  — one method per endpoint, returns ApiResult<T>
 *  2. Compound method     — registerAndLogin() combines two calls into one
 *                           for tests that need a fresh authenticated user
 *                           without caring about the intermediate steps.
 *
 * Usage — individual:
 *   const result = await UserApiHelper.login(request, { email, password });
 *   expect(result.status).toBe(HttpStatus.OK);
 *   const token = result.body.access_token;
 *
 * Usage — compound facade:
 *   const token = await UserApiHelper.registerAndLogin(request, payload);
 */
import { APIRequestContext, APIResponse } from '@playwright/test';
import { ApiResult } from './apiTypes';
import { UserBuilder } from '../../builders/userBuilder';

type LoginCredentials = { email: string; password: string };
type TokenResponse    = { access_token: string; token_type: string; expires_in: number };
type UserProfile      = { id: string; email: string; first_name: string; last_name: string };

async function resolve<T>(call: Promise<APIResponse>): Promise<ApiResult<T>> {
    const res = await call;
    return { status: res.status(), body: await res.json().catch(() => null) };
}

const base = () => process.env.API_BASE_URL! + process.env.USERS_ENDPOINT!;

export abstract class UserApiHelper {

    static login(request: APIRequestContext, credentials: LoginCredentials): Promise<ApiResult<TokenResponse>> {
        return resolve(request.post(`${base()}/login`, { data: credentials }));
    }

    static register(request: APIRequestContext, data: ReturnType<UserBuilder['build']>): Promise<ApiResult<{ id: string }>> {
        return resolve(request.post(`${base()}/register`, { data }));
    }

    static getMe(request: APIRequestContext, token: string): Promise<ApiResult<UserProfile>> {
        return resolve(request.get(`${base()}/me`, {
            headers: { Authorization: `Bearer ${token}` },
        }));
    }

    static delete(request: APIRequestContext, userId: string, token: string): Promise<ApiResult<null>> {
        return resolve(request.delete(`${base()}/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
        }));
    }

    /**
     * Compound facade: register a new user and immediately log them in.
     * Returns the Bearer token so the test can act as that user right away.
     * The test never sees the intermediate register/login responses.
     */
    static async registerAndLogin(
        request: APIRequestContext,
        data: ReturnType<UserBuilder['build']>
    ): Promise<string> {
        await UserApiHelper.register(request, data);
        const { body } = await UserApiHelper.login(request, {
            email: data.email,
            password: data.password,
        });
        return body.access_token;
    }
}