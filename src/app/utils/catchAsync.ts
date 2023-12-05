import { NextFunction, Request, RequestHandler, Response } from "express";

//higher order function
const catchAsync = (fn: RequestHandler) => {
    //higher order functon , ..fin etkta function ekhane.
    return (req: Request, res: Response, next: NextFunction) => {
      Promise.resolve(fn(req, res, next)).catch((err) => next(err)); //promise ta resolve na hole next diye global error handler er kache pahai dibe.
    };
  };

  export default catchAsync;