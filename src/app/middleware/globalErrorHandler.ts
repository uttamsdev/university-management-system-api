/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError, ZodIssue } from "zod";
import {  TErrorSources } from "../interface/error";
import config from "../config";
import handleZodError from "../errors/handleZodError";
import handleValidationError from "../errors/handleValidationError";
import handleCastError from "../errors/handleCastError";
import handleDuplicateError from "../errors/hanldeDuplicateError";
import AppError from "../errors/AppError";

export const globalErrorHandler : ErrorRequestHandler = (err, req, res, next)=> {

  //setting default values
    let statusCode =  500; //statusCode ta AppError class teheke asbe
    let message = 'Something went wrong.';
    
    let errorSources : TErrorSources = [{ //default value
      path: '',
      message: 'Something went wrong'
    }]


   
    if(err instanceof ZodError){//error ta zodError er subclass kina check kore //ZodError ekta class check kortesi error ta zod error kina
      const simplifiedError = handleZodError(err);
      statusCode = simplifiedError?.statusCode,
      message = simplifiedError?.message,
      errorSources = simplifiedError?.errorSources
    } else if(err?.name === 'ValidationError'){
      const simplifiedError = handleValidationError(err);
      statusCode = simplifiedError.statusCode;
      message = simplifiedError.message;
      errorSources = simplifiedError.errorSources;
    } else if(err?.name === 'CastError'){
      const simplifiedError = handleCastError(err);
      statusCode = simplifiedError.statusCode;
      message = simplifiedError.message;
      errorSources = simplifiedError.errorSources;
    }else if(err?.code === 11000){
      const simplifiedError = handleDuplicateError(err);
      statusCode = simplifiedError.statusCode;
      message = simplifiedError.message;
      errorSources = simplifiedError.errorSources;
    }else if(err instanceof AppError){
   
      statusCode = err.statusCode;
      message = err.message;
      errorSources = [{
        path: '',
        message:  err?.message
      }]
    }else if(err instanceof Error){
   
      message = err.message;
      errorSources = [{
        path: '',
        message:  err?.message
      }]
    }


    return res.status(statusCode).json({
      success: false,
      message: message,
      errorSources,
      stack: config.NODE_ENV === 'development' ? err?.stack : null
      // error: err
    })
  }