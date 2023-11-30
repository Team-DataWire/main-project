import prisma from "../prisma";
import data from "../categories";

interface PostData {
  slug: string;
  title: string;
  body: string;
  categoryId: string;
  category: string;
  publishedAt: Date;
}

/**
 * @description Get latest unresolved posts
 * @param count
 * @returns Promise of returned Post[]
 */
const getLatestUnresolved = async (count: number = 3): Promise<PostData[]> => {
  try {
    const latestUnresolved = await prisma.post
      .findMany({
        where: {
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
      .then((posts) =>
        posts.map((post) => ({
          ...post,
          category: data[post.categoryId],
        }))
      );

    return Promise.resolve(latestUnresolved);
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export default getLatestUnresolved;
