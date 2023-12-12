import { expect, test } from "@jest/globals";
import { getLatestUnresolved } from "../pages/api/latestUnresolved";
import { describe } from "node:test";
/**
 * @description Get latest unresolved posts
 * check if the result is an array and has
 * the corresponding types expected from the output
 */
describe("getLatestUnresolved", () => {
  test("correct properties", async () => {
    const result = await getLatestUnresolved();
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty("slug");
    expect(result[0]).toHaveProperty("title");
    expect(result[0]).toHaveProperty("body");
    expect(result[0]).toHaveProperty("categoryId");
    expect(result[0]).toHaveProperty("category");
    expect(result[0]).toHaveProperty("publishedAt");
  });
  test("correct types", async () => {
    const result = await getLatestUnresolved();
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThan(0);
    expect(typeof result[0].slug).toBe("string");
    expect(typeof result[0].title).toBe("string");
    expect(typeof result[0].body).toBe("string");
    expect(typeof result[0].categoryId).toBe("string");
    expect(typeof result[0].category).toBe("string");
    expect(typeof result[0].publishedAt).toBe("object");
  });
  test("correct values for single date", async () => {
    // select a single Date (December 4, 2022)
    const result = await getLatestUnresolved(new Date(2022, 11, 4), new Date(2022, 11, 5)); // exclusive selection
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].slug).toBe("DBF6PF903");
    expect(result[0].title).toBe("0 probability for log in homework 6");
    expect(result[0].body).toBe(
      "When calculating the entropy, we noticed that it is possible for the class probability to be 0 which would make the log undefined. Assuming we should ignore that term and set it to 0 but wanted to ensure that was the correct behavior. "
    );
    expect(result[0].categoryId).toBe("fa89385b-0384-4274-91f4-e56c97171be1");
    expect(result[0].category).toBe("HW 6");
    expect(new Date(result[0].publishedAt)).toEqual(new Date("2022-12-04T20:23:31.192Z"));
  });
  test("correct values for multiple dates", async () => {
    // select a date range (October 1, 2022 - October 5, 2022)
    const result = await getLatestUnresolved(new Date(2022, 9, 1), new Date(2022, 9, 6), 100); // exclusive selection
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(15); // 15 unresolved posts in this date range
  });
});
