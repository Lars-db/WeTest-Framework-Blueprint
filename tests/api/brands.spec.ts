import { expect, test } from "@playwright/test";
import { HttpStatus } from "../../support/enums/httpStatus";
import { BrandsApiHelper } from "../../support/utils/helpers/apiHelpers/brandsApiHelper";
import { getBrandsResponse } from "../../support/.zod/brand";

test.describe("Brands API", () => {
    test("returns an array of brands", async ({ request }) => {
        const { body: brandsResponse } = await test.step("Fetch all brands", async () => {
            const result = await BrandsApiHelper.getAll(request);
            expect(result.status).toBe(HttpStatus.OK);
            return result;
        });

        await test.step("Validate brands response", async () => {
            const validationResult = getBrandsResponse.safeParse(brandsResponse);
            expect(validationResult.success, validationResult.error?.message).toBe(true);
        });
    });
});