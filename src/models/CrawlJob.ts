import mongoose from "mongoose";

import { STATUS } from "../constants";
import { CrawlJob } from "../types";

const crawlJobSchema = new mongoose.Schema<CrawlJob>({
  url: { type: String, required: true },
  status: { type: String, default: STATUS.PENDING },
  foundUrls: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model<CrawlJob>("CrawlJob", crawlJobSchema);
