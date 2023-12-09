import { expect, test } from "@jest/globals";
import { getTopContributors } from "../pages/api/topContributors";
import { describe } from "node:test";

/**
 * @description Get the top contributors by the number of posts they have written
 * check if the result is an array and has
 * the corresponding types expected from the output
 * along with single date and multiple date tests
 */
describe("getTopContributors", () => {
  test("correct properties", async () => {
    const result = await getTopContributors();
    expect(result).toBeInstanceOf(Array);
    expect(result[0]).toHaveProperty("slug");
    expect(result[0]).toHaveProperty("firstName");
    expect(result[0]).toHaveProperty("lastName");
    expect(result[0]).toHaveProperty("totalCount");
  });
  test("correct types", async () => {
    const result = await getTopContributors();
    expect(result).toBeInstanceOf(Array);
    expect(typeof result[0].slug).toBe("string");
    expect(typeof result[0].firstName).toBe("string");
    expect(typeof result[0].lastName).toBe("string");
    expect(typeof result[0].totalCount).toBe("number");
  });
  test("correct values for single date", async () => {
    // select a single date (October 26, 2022)
    const result = await getTopContributors(new Date(2022, 9, 26), new Date(2022, 9, 27));
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(3);
    expect(`${result[0].firstName} ${result[0].lastName}`).toBe("James Daniel");
    expect(result[0].totalCount).toBe(5);
    expect(`${result[1].firstName} ${result[1].lastName}`).toBe("Cheryl Vaughn");
    expect(result[2].totalCount).toBe(4);
    expect(`${result[2].firstName} ${result[2].lastName}`).toBe("Andrew Phillips");
    expect(result[2].totalCount).toBe(4);
  });
  test("correct values for multiple dates", async () => {
    // select a date range (September 23, 2022 - October 21, 2022)
    const result = await getTopContributors(new Date(2022, 8, 23), new Date(2022, 9, 22));
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(3);
    expect(`${result[0].firstName} ${result[0].lastName}`).toBe("Jessica James");
    expect(result[0].totalCount).toBe(37);
    expect(`${result[1].firstName} ${result[1].lastName}`).toBe("Alexander Harris");
    expect(result[1].totalCount).toBe(24);
    expect(`${result[2].firstName} ${result[2].lastName}`).toBe("William Adams");
    expect(result[2].totalCount).toBe(19);

  });
});
