import { CrawlJobModel } from "../models";
import { CrawlJob } from "../types";

export const createCrawlJob = async (url: string): Promise<CrawlJob> => {
  const job = new CrawlJobModel({ url });
  return job.save();
};

export const getCrawlJob = async (jobId: string): Promise<CrawlJob | null> => {
  return CrawlJobModel.findById(jobId);
};

export const updateCrawlJob = async (
  jobId: string,
  foundUrls: string[]
): Promise<CrawlJob | null> => {
  return CrawlJobModel.findByIdAndUpdate(
    jobId,
    { foundUrls, status: "completed", updatedAt: new Date() },
    { new: true }
  );
};
