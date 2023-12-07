import {expect, jest, test} from '@jest/globals';
import { getLatestUnresolved } from './latestUnresolved';

/**
 * @description Get latest unresolved posts
 * check if the result is an array and has
 * the corresponding types expected from the output
 */
test('getLatestUnresolved', async () => {
    const result = await getLatestUnresolved();
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty('slug');
    expect(result[0]).toHaveProperty('title');
    expect(result[0]).toHaveProperty('body');
    expect(result[0]).toHaveProperty('categoryId');
    expect(result[0]).toHaveProperty('category');
    expect(result[0]).toHaveProperty('publishedAt');
});