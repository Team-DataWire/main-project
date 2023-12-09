import { expect, test } from "@jest/globals";
import { getDayPosts } from "../pages/api/dayPosts";
import { describe } from "node:test";

/**
 * @description Get posts by which day of the week they were published
 * check if the result is an array and has
 * the corresponding types expected from the output
 * along with single day and multiple day tests
 */
describe("getDayPosts", () => {
  test("correct properties", async () => {
    const result = await getDayPosts();
    expect(result).toBeInstanceOf(Object);
    expect(result).toHaveProperty("Monday");
    expect(result).toHaveProperty("Tuesday");
    expect(result).toHaveProperty("Wednesday");
    expect(result).toHaveProperty("Thursday");
    expect(result).toHaveProperty("Friday");
    expect(result).toHaveProperty("Saturday");
    expect(result).toHaveProperty("Sunday");
  });
  test("correct types", async () => {
    const result = await getDayPosts();
    expect(result).toBeInstanceOf(Object);
    expect(typeof result.Monday).toBe("number");
    expect(typeof result.Tuesday).toBe("number");
    expect(typeof result.Wednesday).toBe("number");
    expect(typeof result.Thursday).toBe("number");
    expect(typeof result.Friday).toBe("number");
    expect(typeof result.Saturday).toBe("number");
    expect(typeof result.Sunday).toBe("number");
  });
  test("correct values for single date", async () => {
    // select a single Date (December 4, 2022)
    const result = await getDayPosts(new Date(2022, 11, 4), new Date(2022, 11, 5));
    expect(result).toBeInstanceOf(Object);
    expect(result.Monday).toBe(0);
    expect(result.Tuesday).toBe(0);
    expect(result.Wednesday).toBe(0);
    expect(result.Thursday).toBe(0);
    expect(result.Friday).toBe(0);
    expect(result.Saturday).toBe(0);
    expect(result.Sunday).toBe(5);
  });
  test("correct values for multiple dates", async () => {
    // select a date range (October 1, 2022 - October 31, 2022)
    const result = await getDayPosts(new Date(2022, 9, 1), new Date(2022, 10, 1));
    expect(result).toBeInstanceOf(Object);
    expect(result.Monday).toBe(27);
    expect(result.Tuesday).toBe(50);
    expect(result.Wednesday).toBe(79);
    expect(result.Thursday).toBe(14);
    expect(result.Friday).toBe(11);
    expect(result.Saturday).toBe(7);
    expect(result.Sunday).toBe(19);
  });
});
