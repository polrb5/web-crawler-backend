import { CRAWL_JOB_STATUS } from "../constants";

export type Status = (typeof CRAWL_JOB_STATUS)[keyof typeof CRAWL_JOB_STATUS];

export type CrawlJob = {
  id: string;
  url: string;
  status: Status;
  foundUrls: string[];
  createdAt: Date;
  updatedAt: Date;
};
