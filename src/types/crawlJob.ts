import { STATUS } from "../constants/common";

export type Status = (typeof STATUS)[keyof typeof STATUS];

export type CrawlJob = {
  id: string;
  url: string;
  status: "pending" | "in-progress" | "completed";
  foundUrls: string[];
  createdAt: Date;
  updatedAt: Date;
};
