class ErrorHandler {
    
    description: string
    statusCode: number

    constructor(description: string, statusCode: number) {
        this.description = description
        this.statusCode = statusCode
    }
}

export { ErrorHandler }