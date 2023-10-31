export enum IpcResultsCode {
    "success" = "success",
    "error" = "error"
}

export type IpcResults<T, E> = IpcResultsSuccess<T> | IpcResultsError<E>

interface IpcResultsSuccess<T> {
    code: IpcResultsCode.success,
    data?: T;
}

interface IpcResultsError<E> {
    code: IpcResultsCode.error,
    errMsg: E;
}
