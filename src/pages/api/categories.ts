import prisma from "../../typescript/prisma";
import data from "../../typescript/categories";
import { NextApiRequest, NextApiResponse } from "next";

interface categoryCounts {
    category: string;
    count: number;
}

interface categories {
    [key: string]: number;
}

const categoriesCount = async (date1: Date, date2: Date
    ): Promise<categories[]> => {
        try {
            const categoriesCounts = (await prisma.$queryRaw`SELECT DISTINCT "categoryId" AS "category", COUNT("number") AS "count" FROM "Post" WHERE "createdAt" BETWEEN ${date1} AND ${date2} GROUP BY "categoryId" ` as categoryCounts[]
            ).map((categoryCount: categoryCounts) => {const category = { [data[categoryCount.category]]: Number(categoryCount.count)};
            if (category) {
                return category;
            }
            else {
                return {"NULL": 0};
            }});
            return Promise.resolve(Object.assign({}, ...categoriesCounts));
        }
        catch(error) {
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
          const categoriesCounts = await categoriesCount(startDate, endDate);
          res.json(categoriesCounts);
        } else {
          // if there is only one date, use it as both the start and end date
          const dateObj = new Date(date);
          const categoriesCounts = await categoriesCount(dateObj, dateObj);
          res.json(categoriesCounts);
        }
      }
    }
  }