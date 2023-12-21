/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSources, TGenericErrorResponse } from "../interface/error";

const handleDuplicateError = (err : any) : TGenericErrorResponse => {

    //extract value within duble qutes using regex from error message
    const match = err.message.match(/"([^"]*)"/);
    const extractedMessage = match && match[1];

    const errorSources : TErrorSources = [{
        path: "",
        message: `${extractedMessage} is already exist`
    }]
    const statusCode = 400;
    return {
        statusCode,
        message: "Duplicate Key error",
        errorSources,
    }
}

export default handleDuplicateError;