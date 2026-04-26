/**
 * FACTORY PATTERN — ProductFactory
 *
 * Problem it solves: tests that cover different product types (standard, rental,
 * location-specific) would otherwise duplicate field setup in each spec. The
 * factory encodes what a "standard" or "rental" product looks like in one place.
 *
 * Usage:
 *   const payload = ProductFactory.standard();
 *   const payload = ProductFactory.rental();
 *   const payload = ProductFactory.withOverrides({ name: 'Custom Hammer', price: 4.99 });
 */
import { ProductBuilder } from '../builders/productBuilder';

type ProductPayload = ReturnType<ProductBuilder['build']>;

export class ProductFactory {
    static standard(): ProductPayload {
        return new ProductBuilder()
            .withName('Standard Claw Hammer')
            .withDescription('A reliable claw hammer for everyday use.')
            .withPrice(12.99)
            .withCategory('01')
            .withBrand('01')
            .build();
    }

    static rental(): ProductPayload {
        return new ProductBuilder()
            .withName('Rental Angle Grinder')
            .withDescription('Heavy-duty angle grinder available for rental.')
            .withPrice(24.99)
            .withCategory('02')
            .withBrand('01')
            .asRental()
            .build();
    }

    static locationOffer(): ProductPayload {
        return new ProductBuilder()
            .withName('Location-Only Workbench')
            .withDescription('Available in-store only.')
            .withPrice(149.99)
            .withCategory('03')
            .withBrand('02')
            .asLocationOffer()
            .build();
    }

    static withOverrides(overrides: Partial<ProductPayload>): ProductPayload {
        return { ...ProductFactory.standard(), ...overrides };
    }
}
