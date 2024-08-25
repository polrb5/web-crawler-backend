import { ERROR_MESSAGES, STATUS } from "../constants";
import { CrawlJobModel } from "../models";
import { CrawlJob } from "../types";
import { NotFoundError } from "../utils";
import { crawlJobSchema } from "../validation";

export const createCrawlJob = async (url: string): Promise<CrawlJob> => {
  await crawlJobSchema.validate({ url }, { abortEarly: false });

  const job = new CrawlJobModel({ url });

  return job.save();
};

export const getCrawlJob = async (jobId: string): Promise<CrawlJob | null> => {
  const job = await CrawlJobModel.findById(jobId);

  if (!job) {
    throw new NotFoundError(ERROR_MESSAGES.CRAWL_JOB_NOT_FOUND(jobId));
  }

  return job;
};

export const updateCrawlJob = async (
  jobId: string,
  foundUrls: string[]
): Promise<CrawlJob | null> => {
  const job = await CrawlJobModel.findByIdAndUpdate(
    jobId,
    { foundUrls, status: STATUS.COMPLETED, updatedAt: new Date() },
    { new: true }
  );

  if (!job) {
    throw new NotFoundError(ERROR_MESSAGES.CRAWL_JOB_NOT_FOUND(jobId));
  }

  return job;
};
