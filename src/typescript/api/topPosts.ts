// set up general data fetching commands with prisma client
import prisma from '../prisma';

async function getTopWeightedPosts(count: number = 5) {
    const top = await prisma.$queryRaw`SELECT * , ("uniqueViewsCount"*2 + "viewsCount" + "answersCount" * 50) AS value FROM "Post" ORDER BY value DESC LIMIT 5`;
    console.log(top);
}

getTopWeightedPosts();

async function getPostsInDateRange(date1: Date, date2: Date) {
    const top = await prisma.$queryRaw`SELECT * FROM "Post" WHERE "createdAt" BETWEEN ${date1} AND ${date2}`;
    console.log(top);
}

async function getTopPostsInDateRange(date1: Date, date2: Date) {
    const top = await prisma.$queryRaw`SELECT *, ("uniqueViewsCount"*2 + "viewsCount" + "answersCount" * 50) AS value FROM "Post" WHERE "createdAt" BETWEEN ${date1} AND ${date2} ORDER BY value DESC LIMIT 5`;
    console.log(top);
}

let d1: Date = new Date("2022-10-18")
let d2: Date = new Date("2022-10-20")

getPostsInDateRange(d1, d2);
getTopPostsInDateRange(d1, d2);