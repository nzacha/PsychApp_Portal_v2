export const ERROR = 'error'
export const SUCCESS = 'success'

export interface IResponse{
    status: typeof ERROR | typeof SUCCESS;
    message: string;
    data: {
        request: {
            params: any;
            body: any;
        };
        response: any;
    };
}

