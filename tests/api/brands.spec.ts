import { expect, test } from "@playwright/test";
import { HttpStatus } from "../../support/enums/httpStatus";
import { BrandsApiHelper } from "../../support/utils/helpers/apiHelpers/brandsApiHelper";
import { BrandResponse } from "../../support/.zod/schemas/brandResponse";

test.describe("Brands API", () => {
  test("returns an array of brands", async ({ request }) => {
    let brands: BrandResponse[] = [];

    await test.step("Fetch all brands", async () => {
      const { status, body } = await BrandsApiHelper.getAll(request);
      expect(status).toBe(HttpStatus.OK);
      brands = body;
    });

    await test.step("Validate brands response", () => {
      expect(Array.isArray(brands)).toBe(true);
      expect(brands.length).toBeGreaterThan(0);
      expect(brands[0]).toMatchObject({
        id: expect.any(String),
        name: expect.any(String),
        slug: expect.any(String),
      });
    });
  });
});
