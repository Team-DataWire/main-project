/**
 * top contributors client file to get Data
 * from Supabase to solve the top contributor
 * question for the front-end
 */
import prisma from "../../typescript/prisma";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * returns a JSON list of contributors with the following shape:
 * [
 *  {
 *    slug: string,
 *    totalCount: number
 *  }
 * ...
 * ]
 */
interface Author {
  slug: string;
  totalCount: number;
}

interface AuthorInfo {
  slug: string;
  firstName: string;
  lastName: string;
  totalCount: number;
}

const getTopContributors = async (
  startDate: Date = new Date(2022, 8, 5), // Default start date of September 5th, 2022 (0-based indices for month)
  endDate: Date = new Date(2022, 11, 20), // Default end date of December 20th, 2022 (0-based indices for month)
  count: number = 3 // Default number of contributors to return
): Promise<AuthorInfo[]> => {
  try {
    const authors = (
      (await prisma.$queryRaw`
      SELECT a.slug, 
      COUNT(DISTINCT c.id) + 
      COUNT(DISTINCT p.id) + 
      COUNT(DISTINCT lm.id) as "totalCount"
      FROM "Author" a
      LEFT JOIN "Comment" c 
          ON a.slug = c."authorSlug" AND c."createdAt" BETWEEN ${startDate} AND ${endDate}
      LEFT JOIN "Post" p 
          ON a.slug = p."authorSlug" AND p."createdAt" BETWEEN ${startDate} AND ${endDate}
      LEFT JOIN "LastMessage" lm 
          ON a.slug = lm."authorSlug" AND lm."createdAt" BETWEEN ${startDate} AND ${endDate} 
      GROUP BY a.slug
      ORDER BY "totalCount" DESC
      LIMIT ${count}
    `) as Author[]
    ).map(async (author: Author) => {
      const authorInfo = await prisma.author.findUnique({
        where: {
          slug: author.slug,
        },
        select: {
          firstName: true,
          lastName: true,
        },
      });
      if (authorInfo) {
        return {
          slug: author.slug,
          firstName: authorInfo.firstName,
          lastName: authorInfo.lastName,
          totalCount: Number(author.totalCount),
        };
      }
      return {
        slug: author.slug,
        firstName: "",
        lastName: "",
        totalCount: Number(author.totalCount),
      };
    });

    return Promise.all(authors);
  } catch (error: any) {
    return Promise.reject(error);
  }
};

// API handler function
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { date } = req.query;

  if (date) {
    if (typeof date === "string") {
      const dateArray = date.split(",");
      if (dateArray.length === 2) {
        const startDate = new Date(dateArray[0]);
        const endDate = new Date(dateArray[1]);
        const contributors = await getTopContributors(startDate, endDate);
        res.json(contributors);
      } else {
        const dateObj = new Date(date.split(",")[0]);
        const contributors = await getTopContributors(dateObj, dateObj);
        res.json(contributors);
      }
    }
  }
}
