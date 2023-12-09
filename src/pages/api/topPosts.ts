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
  

// This function takes in two dates that form a range from the datepicker, then finds the top posts
// in that date range as determined by highest viewsCount + 2*uniqueViewsCount + 100 * # of comments.
// It reutrns an array of promises. This formula weights all three components of post popularity roughly evenly

const getTopPosts = async (date1: Date, date2: Date
    ): Promise<PostData[]> => {
        try {
            const topPosts = (await prisma.$queryRaw`SELECT "slug", "title", "body", "categoryId", "publishedAt" FROM "Post" WHERE "createdAt" BETWEEN ${date1} AND ${date2} ORDER BY ("uniqueViewsCount"*2 + "viewsCount" + "answersCount" * 100) DESC LIMIT 5` as Post[]
            ).map((post: Post) => {const postData = { ...post, category: data[post.categoryId],};
            if (postData) {
                return postData;
            }
            else {
                return {slug: "", title: "", body: "", category: "", categoryId: "", publishedAt: new Date("2000-01-01")};
            }});
            
            return Promise.resolve(topPosts);
        }
        catch(error) {
            return Promise.reject(error);
        }
    };

// API handler function for next.js routing
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { date } = req.query;
    console.log(date)
  
    // handle the date range
    if (date) {
      if (typeof date === "string") {
        const dateArray = date.split(",");
        if (dateArray.length === 2) {
          // if there are two dates, use the first as the start date and the second as the end date
          const startDate = new Date(dateArray[0]);
          const endDate = new Date(dateArray[1]);
          console.log("startDate", startDate)
          const categoriesCounts = await getTopPosts(startDate, endDate);
          console.log(categoriesCounts);
          res.json(categoriesCounts);
        } else {
          // if there is only one date, use it as both the start and end date
          const dateObj = new Date(date);
          console.log("date", dateObj)
          const categoriesCounts = await getTopPosts(dateObj, dateObj);
          res.json(categoriesCounts);
        }
      }
    }
  }