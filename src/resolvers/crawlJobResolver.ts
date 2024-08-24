import { createCrawlJob, getCrawlJob } from "../services";

export const crawlJobResolver = {
  createCrawlJob: async ({ url }: { url: string }) => {
    return createCrawlJob(url);
  },
  getCrawlJob: async ({ id }: { id: string }) => {
    return getCrawlJob(id);
  },
};
