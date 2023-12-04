import prisma from "../../typescript/prisma";
import { NextApiRequest, NextApiResponse } from "next";

interface PostData {
  Monday: number;
  Tuesday: number;
  Wednesday: number;
  Thursday: number;
  Friday: number;
  Saturday: number;
  Sunday: number;
}

/**
 * @description Get posts by which day of the week they were published
 * @param startDate
 * @param endDate
 * @returns PostData
 */
const getDayPosts = async (
  startDate: Date = new Date(2022, 8, 5),
  endDate: Date = new Date(2022, 11, 15)
): Promise<PostData> => {
  try {
    const res = {
      Monday: 0,
      Tuesday: 0,
      Wednesday: 0,
      Thursday: 0,
      Friday: 0,
      Saturday: 0,
      Sunday: 0,
    };
    const posts = await prisma.post.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
        // don't need to filter out private posts, can be helpful in the graph
      },
      select: {
        publishedAt: true,
      },
    });
    posts.forEach((post) => {
      const day = post.publishedAt.getDay();
      switch (day) {
        case 0:
          res.Sunday++;
          break;
        case 1:
          res.Monday++;
          break;
        case 2:
          res.Tuesday++;
          break;
        case 3:
          res.Wednesday++;
          break;
        case 4:
          res.Thursday++;
          break;
        case 5:
          res.Friday++;
          break;
        case 6:
          res.Saturday++;
          break;
      }
    });

    return res;
  } catch (error: any) {
    throw new Error(error);
  }
};

// API handler function
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
        const contributors = await getDayPosts(startDate, endDate);
        res.json(contributors);
      } else {
        // if there is only one date, use it as both the start and end date
        const dateObj = new Date(date);
        const contributors = await getDayPosts(dateObj, dateObj);
        res.json(contributors);
      }
    }
  }
}
