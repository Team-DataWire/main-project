// set up general data fetching commands with prisma client
import prisma from '../prisma';

async function countByCategories(date1: Date, date2: Date) {
    const top = await prisma.$queryRaw`SELECT DISTINCT "categoryId" AS "category", COUNT("number") AS "count" FROM "Post" WHERE "createdAt" BETWEEN ${date1} AND ${date2} GROUP BY "categoryId" `;
    console.log(top);
}

let d1: Date = new Date("2022-09-01")
let d2: Date = new Date("2022-12-31")
countByCategories(d1, d2);