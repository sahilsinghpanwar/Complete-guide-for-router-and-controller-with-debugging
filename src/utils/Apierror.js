class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = "",
    ){
        // for overwrite use super keyword
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors;
    
    
        if (stack) {
            this.stack = stack;
        }
        else{
            // humne stackTrace kai under uske instance pass kr diya 
            Error.captureStackTrace(this, this.constructor);
        }
    
    }     
    }
    
    export { ApiError };