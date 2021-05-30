import { ResponseBodyDto } from './response-body.dto';

export class ResponseDto<T> {
    public body: ResponseBodyDto<T>;
    public statusCode: number;
}
