//using app error jate kore error msg er sathe valid status code dite pari client k
class AppError extends Error{
    public statusCode: number;
    constructor(statusCode: number, message: string, stack=""){ //stack use kora hoi kono error asle error ta kohta theke asteche seta track rakha path
        super(message);
        this.statusCode = statusCode;
        
        if(stack){
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor) //this.constructor specific error trace dei. 
        }
    }
}
export default AppError;