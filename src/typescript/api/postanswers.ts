// set up general data fetching commands with prisma client
import prisma from '../prisma';

async function unansweredPosts() {
    const top = await prisma.$queryRawUnsafe(`SELECT COUNT(*) FROM "Post" WHERE "answeredAt" IS NULL AND "type" = $1 AND "slug" NOT IN (SELECT "postSlug" FROM "Comment" WHERE "endorsed")`, `question`)
    console.log(top);
}

unansweredPosts();

async function latestUnansweredPosts() {
    const top = await prisma.$queryRawUnsafe(`SELECT * FROM "Post" WHERE "answeredAt" IS NULL AND "type" = $1 AND "slug" NOT IN (SELECT "postSlug" FROM "Comment" WHERE "endorsed") ORDER BY "createdAt" DESC LIMIT 5`, `question`)
    console.log(top);
}

latestUnansweredPosts();
