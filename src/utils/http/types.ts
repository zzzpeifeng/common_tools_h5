export interface Response<T> {
    status: number | string;
    message: string;
    data: T;
}