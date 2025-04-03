export class ApiError extends Error{
    constructor(statusCode=500,message="Something went wrong",data=null,errors=[],stack="") {
        super(message);
        this.statusCode = statusCode
        this.success = false
        this._message = message
        this.data = data
        this.errors = errors
        if(stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}