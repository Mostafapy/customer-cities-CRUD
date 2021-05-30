import { IErrorFormat } from '../utils/errorFormat.utils';
import { EMessages } from '../enums/messages.enum';

export class ResponseBodyDto<T> {
    public message: EMessages;
    public error?: IErrorFormat;
    public validationError?: string;
    public success: boolean;
    public data: T | any;
}
