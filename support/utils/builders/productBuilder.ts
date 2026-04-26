/**
 * BUILDER PATTERN — ProductBuilder
 *
 * Problem it solves: ProductRequest has 8 fields, most optional. Without a
 * builder, tests either pass a large object literal every time (repetitive,
 * fragile) or receive a long parameter list that is hard to read.
 *
 * Usage:
 *   const payload = new ProductBuilder().withName('Hammer').withStock(0).build();
 *   const payload = new ProductBuilder().asRental().build();
 */
export class ProductBuilder {
    private data: {
        name: string;
        description: string;
        price: number;
        category_id: string;
        brand_id: string;
        product_image_id: string;
        is_location_offer: boolean;
        is_rental: boolean;
    } = {
        name: 'Test Product',
        description: 'A product created for testing purposes.',
        price: 9.99,
        category_id: '01',
        brand_id: '01',
        product_image_id: '01',
        is_location_offer: false,
        is_rental: false,
    };

    withName(name: string): this {
        this.data.name = name;
        return this;
    }

    withDescription(description: string): this {
        this.data.description = description;
        return this;
    }

    withPrice(price: number): this {
        this.data.price = price;
        return this;
    }

    withCategory(categoryId: string): this {
        this.data.category_id = categoryId;
        return this;
    }

    withBrand(brandId: string): this {
        this.data.brand_id = brandId;
        return this;
    }

    asRental(): this {
        this.data.is_rental = true;
        return this;
    }

    asLocationOffer(): this {
        this.data.is_location_offer = true;
        return this;
    }

    build() {
        return { ...this.data };
    }
}
