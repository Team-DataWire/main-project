import { expect, test } from "@jest/globals";
import {categoriesCount} from "../pages/api/categories";
import { describe } from "node:test";

/**
 * @description Get posts by which day of the week they were published
 * check if the result is an array and has
 * the corresponding types expected from the output
 * along with single day and multiple day tests
 */


describe("getCategories", () => {
    test("correct properties all days", async () => {
      const result = await categoriesCount(new Date(2022, 8, 5), new Date(2022, 11, 20));
      expect(result).toBeInstanceOf(Object);
      expect(result).toHaveProperty("Course Logistics");
      expect(result).toHaveProperty("HW 1");
      expect(result).toHaveProperty("HW 2");
      expect(result).toHaveProperty("HW 3");
      expect(result).toHaveProperty("HW 4");
      expect(result).toHaveProperty("HW 5");
      expect(result).toHaveProperty("HW 6");
      expect(result).toHaveProperty("Final Exam");
    });
    test("correct properties one day", async () => {
        const result = await categoriesCount(new Date(2022, 10, 5), new Date(2022, 10, 6));
        expect(result).toBeInstanceOf(Object);
        expect(result).toHaveProperty("HW 4");
      });
  });
  