/**
 * STRATEGY PATTERN — AuthStrategy
 *
 * Problem it solves: some tests need a customer token, others need an admin
 * token. Without this pattern, the role decision leaks into every test that
 * needs authentication, and switching strategies means touching many files.
 *
 * The interface defines the contract. Each concrete strategy encapsulates
 * exactly how that role acquires a token. Tests depend only on the interface.
 *
 * Usage:
 *   const strategy: AuthStrategy = new AdminAuthStrategy();
 *   const token = await strategy.getToken(request);
 *   const result = await ProductsApiHelper.create(request, token, payload);
 *
 * Swapping roles in a test is a one-line change:
 *   const strategy: AuthStrategy = new CustomerAuthStrategy();
 */
import { APIRequestContext } from '@playwright/test';
import { UserFactory } from '../factories/userFactory';

export interface AuthStrategy {
    getToken(request: APIRequestContext): Promise<string>;
}

export class CustomerAuthStrategy implements AuthStrategy {
    async getToken(request: APIRequestContext): Promise<string> {
        return UserFactory.token(request, 'customer');
    }
}

export class AdminAuthStrategy implements AuthStrategy {
    async getToken(request: APIRequestContext): Promise<string> {
        return UserFactory.token(request, 'admin');
    }
}