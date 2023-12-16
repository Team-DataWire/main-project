import { expect, test } from "@jest/globals";
import { getTopPosts } from "../pages/api/topPosts";
import { describe } from "node:test";

/**
 * @description Get posts by which day of the week they were published
 * check if the result is an array and has
 * the corresponding types expected from the output
 * along with single day and multiple day tests
 */


describe("getTopPosts", () => {
    test("correct properties", async () => {
      const result = await getTopPosts(new Date(2022, 8, 5), new Date(2022, 11, 20));
      expect(result).toBeInstanceOf(Array);
      expect(result[0]).toHaveProperty("slug");
      expect(result[0]).toHaveProperty("title");
      expect(result[0]).toHaveProperty("body");
      expect(result[0]).toHaveProperty("categoryId");
      expect(result[0]).toHaveProperty("category");
      expect(result[0]).toHaveProperty("publishedAt");
    });
    test("correct types", async () => {
      const result = await getTopPosts(new Date(2022, 8, 5), new Date(2022, 11, 20));
      expect(result).toBeInstanceOf(Array);
      expect(typeof result[0].slug).toBe("string");
      expect(typeof result[0].title).toBe("string");
      expect(typeof result[0].body).toBe("string");
      expect(typeof result[0].categoryId).toBe("string");
      expect(typeof result[0].category).toBe("string");
      expect(typeof result[0].publishedAt).toBe("object");
    });
    test("correct values for single date", async () => {
      // select a single Date (October 4, 2022)
      const result = await getTopPosts(new Date(2022, 9, 4), new Date(2022, 9, 5));
      expect(result).toBeInstanceOf(Object);
      expect(result[2].slug).toBe('9E7C45P4B');
      expect(result[2].title).toBe('Input');
      expect(result[2].body).toBe(' When I run with python solver.py 802356174 greedy-h1, it kept saying it does not recognize the flavor but when I change it to greedy_h1, it works. Yes, I did change the condition in the elif part. Am I missing something?');
      expect(result[2].categoryId).toBe('e03d79c7-74a5-4db3-8e43-45b4c5335051');
      expect(result[2].category).toBe('HW 1');
    });
    test("correct values for multiple dates", async () => {
      // select a date range (November 1, 2022 - November 31, 2022)
      const result = await getTopPosts(new Date(2022, 10, 1), new Date(2022, 11, 1));
      expect(result).toBeInstanceOf(Object);
      expect(result[3].slug).toBe('56P1D8191');
      expect(result[3].title).toBe('Final exam');
      expect(result[3].body).toBe('When and where is our final exam');
      expect(result[3].categoryId).toBe('99a4beac-edfa-4bc4-8ceb-de5ed823e6a3');
      expect(result[3].category).toBe('Final Exam');
    });
  });