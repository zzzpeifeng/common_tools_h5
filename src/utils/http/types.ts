export interface Response<T> {
    code: number | string;
    message: string;
    result: T;
}