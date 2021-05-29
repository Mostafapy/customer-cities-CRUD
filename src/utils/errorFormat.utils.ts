type IErrorFormat = {
    name: string;
    message: string;
    stack?: string[];
}

const errorFormat = (error: Error, addStack: boolean = false): IErrorFormat => ({
    name: error.name,
    message: error.message,
    ...(addStack ? {
        stack: error?.stack?.split('\n').map((ele: string) => ele.trim()),
    } : {})
});


export { errorFormat, IErrorFormat };
