export const ERROR_MESSAGES = {
  AUTHENTICATION_FAILED: "Authentication failed",
  CRAWL_JOB_NOT_FOUND: (jobId: string) => `CrawlJob with ID ${jobId} not found`,
  RESOURCE_NOT_FOUND: "Resource not found",
  UNEXPECTED_ERROR: "An unexpected error occurred. Please try again later.",
  UNKNOWN_ERROR: "An unknown error occurred",
  URL_MUST_BE_PROVIDED: "URL must be provided",
  VALIDATION_ERROR: "Validation error",
} as const;
