import mongoose from "mongoose";
import {  TErrorSources, TGenericErrorResponse } from "../interface/error";

const handleValidationError = (err : mongoose.Error.ValidationError) : TGenericErrorResponse => {
    const statusCode = 400;
    const errorSources : TErrorSources = Object.values(err.errors).map((val : mongoose.Error.ValidatorError | mongoose.Error.CastError)=> { //Object.values => eta errors er moddhe joto gulo value dibe sob gulo nibe
        return {
            path: val?.path,
            message: val?.message
        }
    })
    return {
      statusCode,
      message: 'validation error',
      errorSources,
    };
}

export default handleValidationError;