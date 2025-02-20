import prisma from "../../typescript/prisma";
import data from "../../typescript/categories";
import { NextApiRequest, NextApiResponse } from "next";

// define the Post type as an interface when returning data from the database
interface PostData {
  slug: string;
  title: string;
  body: string;
  categoryId: string;
  category: string;
  publishedAt: Date;
}

// interface for the post data returned from the database
interface Post {
  slug: string;
  title: string;
  body: string;
  categoryId: string;
  publishedAt: Date;
}

/**
 * @description Get latest unresolved posts
 * @param count
 * @returns Promise of returned Post[]
 */
export const getLatestUnresolved = async (
  startDate: Date = new Date(2022, 8, 5),
  endDate: Date = new Date(2022, 11, 15),
  count: number = 10
): Promise<PostData[]> => {
  try {
    const latestUnresolved = await prisma.post
      .findMany({
        where: {
          publishedAt: {
            gte: startDate,
            lte: endDate,
          },
          // filter out private posts
          NOT: [
            {
              body: {
                startsWith: "zzz",
              },
            },
          ],
          // we want posts with no comments, where the answeredAt field is null
          answeredAt: null,
        },
        take: count,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          // select the following fields to return
          title: true,
          body: true,
          slug: true,
          categoryId: true,
          publishedAt: true,
        },
      })
      // map the posts to include the category name, to the PostData interface
      .then((posts: Post[]) =>
        posts.map((post: Post) => ({
          ...post,
          category: data[post.categoryId],
        }))
      );

    return Promise.resolve(latestUnresolved);
  } catch (error: any) {
    return Promise.reject(error);
  }
};

// API handler function for next.js routing
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { date } = req.query;

  // handle the date range
  if (date) {
    if (typeof date === "string") {
      const dateArray = date.split(",");
      if (dateArray.length === 2) {
        // if there are two dates, use the first as the start date and the second as the end date
        const startDate = new Date(dateArray[0]);
        const endDate = new Date(dateArray[1]);
        const contributors = await getLatestUnresolved(startDate, endDate);
        res.json(contributors);
      } else {
        // if there is only one date, use it as both the start and end date
        const dateObj = new Date(date);
        const contributors = await getLatestUnresolved(dateObj, dateObj);
        res.json(contributors);
      }
    }
  }
}
