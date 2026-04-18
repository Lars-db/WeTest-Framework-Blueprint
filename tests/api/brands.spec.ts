import { expect, test } from "@playwright/test";
import { HttpStatus } from "../../support/enums/httpStatus";
import { BrandsApiHelper } from "../../support/utils/helpers/apiHelpers/brandsApiHelper";
import { BrandResponse } from "../../support/.zod/schemas/brandResponse";
import { getBrandsResponse } from "../../support/.zod/brand";

test.describe("Brands API", () => {
  test("returns an array of brands", async ({ request }) => {
    let brands: BrandResponse[] = [];

    await test.step("Fetch all brands", async () => {
      const { status, body } = await BrandsApiHelper.getAll(request);
      expect(status).toBe(HttpStatus.OK);
      brands = body;
    });

    await test.step("Validate brands response", () => {
      const result = getBrandsResponse.safeParse(brands);
      expect(result.success, result.error?.message).toBe(true);
    });
  });
});
