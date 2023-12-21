import { ZodError, ZodIssue } from "zod";
import {  TErrorSources, TGenericErrorResponse } from "../interface/error";

//zod error converter
const handleZodError = (err: ZodError) : TGenericErrorResponse=> {
  const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1], //path er last index nicce karon okhane error describe kora thake
      message: issue.message,
    };
  });
  const statusCode = 400;
  return {
    statusCode,
    message: 'validation error',
    errorSources,
  };
};

export default handleZodError;
