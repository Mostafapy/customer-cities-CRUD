import { EMessages } from '../enums/messages.enum';

export class ResponseBodyDto<T> {
    public message: EMessages;
    public error?: string;
    public validationErrors?: any[];
    public success: boolean;
    public data: T | any;
}
