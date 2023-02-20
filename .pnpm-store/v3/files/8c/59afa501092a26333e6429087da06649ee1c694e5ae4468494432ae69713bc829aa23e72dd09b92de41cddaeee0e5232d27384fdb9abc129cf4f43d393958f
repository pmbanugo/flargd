import ora from "ora";
export declare class TaskError extends Error {
}
export declare const task: <Result>(start: string, callback: (spinner: ora.Ora) => Promise<Result>, succeed?: string | ((result: Result) => string)) => Promise<Result>;
