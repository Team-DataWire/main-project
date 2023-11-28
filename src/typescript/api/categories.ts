// set up general data fetching commands with prisma client
import prisma from '../prisma';

async function getCategories() {
    const top = await prisma.$queryRaw`SELECT DISTINCT "categoryId" AS "category", MIN("number") AS "number" FROM "Post" GROUP BY "categoryId" `;
    console.log(top);
}

getCategories();

async function countByCategories() {
    const top = await prisma.$queryRaw`SELECT DISTINCT "categoryId" AS "category", COUNT("number") AS "count" FROM "Post" GROUP BY "categoryId" `;
    console.log(top);
}

countByCategories();