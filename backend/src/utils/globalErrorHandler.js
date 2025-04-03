import { ApiError } from "./ApiError.js";
import { ApiRes } from "./ApiRes.js";
import fs from "fs";

export function globalErrorHandler(err, req, res,next) {
  let error = { ...err };
  // console.log(res)
  if (!(err instanceof ApiError)) {
    error = new ApiError(
      500,
      err._message ?? err.message ?? "Internal server error"
    );
  }

  if (req.file) {
    fs.unlinkSync(req.file.path);
  }

  res
    .status(error.statusCode)
    .json(
      new ApiRes(error.statusCode, error.data, error._message ?? error.message)
    );
}
