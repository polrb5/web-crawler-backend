import { createCrawlJob, getCrawlJob } from "../services";
import { handleResolverError } from "../utils";

export const crawlJobResolver = {
  createCrawlJob: async ({ url }: { url: string }) => {
    return handleResolverError(() => createCrawlJob(url));
  },
  getCrawlJob: async ({ id }: { id: string }) => {
    return handleResolverError(() => getCrawlJob(id));
  },
};
