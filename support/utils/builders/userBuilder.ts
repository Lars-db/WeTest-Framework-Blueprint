/**
 * BUILDER PATTERN — UserBuilder
 *
 * Problem it solves: UserRequest has required and optional fields, including a
 * nested address object. Without a builder, registering a new user in a test
 * requires 10+ fields every time — most of which are irrelevant to what the
 * test is actually verifying.
 *
 * Usage:
 *   const payload = new UserBuilder().build();                          // valid defaults
 *   const payload = new UserBuilder().withEmail('x@test.com').build();  // override one field
 *   const payload = new UserBuilder().withAddress('Elm St', 'Brussels').build();
 */
export class UserBuilder {
    private data: {
        first_name: string;
        last_name: string;
        email: string;
        password: string;
        dob: string;
        phone: string;
        address: {
            street: string;
            city: string;
            state: string;
            country: string;
            postal_code: string;
        };
    } = {
        first_name: 'Test',
        last_name: 'User',
        email: `testuser+${Date.now()}@example.com`,
        password: 'WeT3st!Fr@mework2026',
        dob: '1990-01-01',
        phone: '0612345678',
        address: {
            street: 'Test Street 1',
            city: 'Amsterdam',
            state: 'Noord-Holland',
            country: 'Netherlands',
            postal_code: '1234AB',
        },
    };

    withFirstName(firstName: string): this {
        this.data.first_name = firstName;
        return this;
    }

    withLastName(lastName: string): this {
        this.data.last_name = lastName;
        return this;
    }

    withEmail(email: string): this {
        this.data.email = email;
        return this;
    }

    withPassword(password: string): this {
        this.data.password = password;
        return this;
    }

    withDateOfBirth(dob: string): this {
        this.data.dob = dob;
        return this;
    }

    withAddress(street: string, city: string, country = 'Netherlands'): this {
        this.data.address = { ...this.data.address, street, city, country };
        return this;
    }

    build() {
        return { ...this.data, address: { ...this.data.address } };
    }
}
