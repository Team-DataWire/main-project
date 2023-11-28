// set up general data fetching commands with prisma client
import prisma from '../prisma';

async function postsByDay() {
    const top = await prisma.$queryRaw`SELECT COUNT(*), CAST("publishedAt" AS DATE) AS date FROM "Post" GROUP BY CAST("publishedAt" AS DATE) ORDER BY CAST("publishedAt" AS DATE)`;
    console.log(top);
}

postsByDay()

async function postsByWeek() {
    const top = await prisma.$queryRaw`SELECT COUNT(*), DATE '2021/12/27' + CAST(7 * EXTRACT(week FROM "publishedAt") AS INT) AS "WEEK" FROM "Post" GROUP BY EXTRACT(week FROM "publishedAt") ORDER BY EXTRACT(week FROM "publishedAt")`;
    console.log(top);
}

postsByWeek()


async function postsByMonth() {
    const top = await prisma.$queryRaw`SELECT COUNT(*), EXTRACT(month FROM "publishedAt") AS "MONTH" FROM "Post" GROUP BY EXTRACT(month FROM "publishedAt") ORDER BY EXTRACT(month FROM "publishedAt")`;
    console.log(top);
}

postsByMonth()