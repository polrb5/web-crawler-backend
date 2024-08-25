import { CrawlJob } from "../../src/types";

export const mockCrawlJob: CrawlJob = {
  id: "1",
  url: "https://example.com",
  status: "pending",
  foundUrls: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};
