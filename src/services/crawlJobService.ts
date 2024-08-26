import { JSDOM } from 'jsdom';

import { ERROR_MESSAGES, CRAWL_JOB_STATUS } from '../constants';
import { CrawlJobModel } from '../models';
import { CrawlJob } from '../types';
import { NotFoundError } from '../utils';
import { crawlJobSchema } from '../validation';

export const createCrawlJob = async (url: string): Promise<CrawlJob> => {
  await crawlJobSchema.validate({ url }, { abortEarly: false });

  const job = new CrawlJobModel({ url, status: CRAWL_JOB_STATUS.PENDING });
  await job.save();

  try {
    const foundUrls = await crawlWebsite(url);

    const updatedJob = await CrawlJobModel.findByIdAndUpdate(
      job.id,
      {
        foundUrls,
        status: CRAWL_JOB_STATUS.COMPLETED,
        updatedAt: new Date(),
      },
      { new: true },
    );

    return updatedJob!;
  } catch (error) {
    await CrawlJobModel.findByIdAndUpdate(
      job.id,
      {
        status: CRAWL_JOB_STATUS.FAILED,
        updatedAt: new Date(),
      },
      { new: true },
    );

    throw new Error(
      error instanceof Error
        ? error.message
        : ERROR_MESSAGES.FAILED_CRAWLING(url),
    );
  }
};

const crawlWebsite = async (rootUrl: string): Promise<string[]> => {
  try {
    const response = await fetch(rootUrl);
    const text = await response.text();
    const dom = new JSDOM(text);

    const foundUrls = Array.from(dom.window.document.querySelectorAll('a'))
      .map((link) => link.href)
      .filter((href) => href.startsWith(rootUrl) || href.startsWith('http'))
      .reduce<Set<string>>((acc, href) => acc.add(href), new Set());

    return Array.from(foundUrls);
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : ERROR_MESSAGES.FAILED_CRAWLING(rootUrl),
    );
  }
};

export const getCrawlJob = async (jobId: string): Promise<CrawlJob | null> => {
  const job = await CrawlJobModel.findById(jobId);

  if (!job) {
    throw new NotFoundError(ERROR_MESSAGES.CRAWL_JOB_NOT_FOUND(jobId));
  }

  return job;
};
