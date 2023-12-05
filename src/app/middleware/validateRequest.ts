import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

//middleware for zod validation 
const ValidateRequest = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        //zod validation check before send req.body data to controller from route
        await schema.parseAsync({
          body: req.body,
        });
        next();
      } catch (err) {
        next(err); // global error handle e pathai dibe kono error hole
      }
    };
  };

  export default ValidateRequest