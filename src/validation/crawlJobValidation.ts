import * as yup from "yup";

import { ERROR_MESSAGES } from "../constants";

export const crawlJobSchema = yup.object().shape({
  url: yup
    .string()
    .url(ERROR_MESSAGES.INVALID_URL)
    .required(ERROR_MESSAGES.URL_REQUIRED),
});
