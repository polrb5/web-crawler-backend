import { ValidationError } from "yup";

import { STATUS } from "../../src/constants";
import { CrawlJobModel } from "../../src/models";
import {
  createCrawlJob,
  getCrawlJob,
  updateCrawlJob,
} from "../../src/services";
import { NotFoundError } from "../../src/utils";
import { mockCrawlJob } from "../mocks/crawlJobMock";
// import { ERROR_MESSAGES } from "../../src/constants";

jest.mock("../../src/models");

describe("CrawlJob Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should create a new crawl job", async () => {
    const mockSave = jest.fn().mockResolvedValue(mockCrawlJob);
    (CrawlJobModel as unknown as jest.Mock).mockImplementation(() => ({
      save: mockSave,
    }));

    const job = await createCrawlJob(mockCrawlJob.url);

    expect(CrawlJobModel).toHaveBeenCalledWith({ url: mockCrawlJob.url });
    expect(mockSave).toHaveBeenCalled();
    expect(job).toEqual(mockCrawlJob);
  });

  test("should get an existing crawl job", async () => {
    (CrawlJobModel.findById as jest.Mock).mockResolvedValue(mockCrawlJob);

    const job = await getCrawlJob(mockCrawlJob.id);

    expect(CrawlJobModel.findById).toHaveBeenCalledWith(mockCrawlJob.id);
    expect(job).toEqual(mockCrawlJob);
  });

  test("should throw a validation error when creating a crawl job with an invalid URL", async () => {
    const invalidUrl = "invalid-url";

    await expect(createCrawlJob(invalidUrl)).rejects.toThrow(ValidationError);
  });

  test("should update an existing crawl job", async () => {
    const updatedCrawlJob = {
      ...mockCrawlJob,
      foundUrls: ["https://example.com"],
      status: STATUS.COMPLETED,
    };

    (CrawlJobModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(
      updatedCrawlJob
    );

    const job = await updateCrawlJob(
      mockCrawlJob.id,
      updatedCrawlJob.foundUrls
    );

    expect(CrawlJobModel.findByIdAndUpdate).toHaveBeenCalledWith(
      mockCrawlJob.id,
      {
        foundUrls: updatedCrawlJob.foundUrls,
        status: STATUS.COMPLETED,
        updatedAt: expect.any(Date),
      },
      { new: true }
    );
    expect(job).toEqual(updatedCrawlJob);
  });

  test("should throw a NotFoundError when trying to get a non-existent crawl job", async () => {
    (CrawlJobModel.findById as jest.Mock).mockResolvedValue(null);

    await expect(getCrawlJob("non-existent-id")).rejects.toThrow(NotFoundError);
    expect(CrawlJobModel.findById).toHaveBeenCalledWith("non-existent-id");
  });

  test("should throw a NotFoundError when trying to update a non-existent crawl job", async () => {
    (CrawlJobModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

    await expect(
      updateCrawlJob("non-existent-id", ["https://example.com"])
    ).rejects.toThrow(NotFoundError);
    expect(CrawlJobModel.findByIdAndUpdate).toHaveBeenCalledWith(
      "non-existent-id",
      {
        foundUrls: ["https://example.com"],
        status: STATUS.COMPLETED,
        updatedAt: expect.any(Date),
      },
      { new: true }
    );
  });
});
