import type { AppData } from "./data";
import type { TypedDeferredData, TypedResponse } from "./responses";
declare type JsonPrimitive = string | number | boolean | String | Number | Boolean | null;
declare type NonJsonPrimitive = undefined | Function | symbol;
declare type IsAny<T> = 0 extends 1 & T ? true : false;
declare type Serialize<T> = IsAny<T> extends true ? any : T extends TypedDeferredData<infer U> ? SerializeDeferred<U> : T extends JsonPrimitive ? T : T extends NonJsonPrimitive ? never : T extends {
    toJSON(): infer U;
} ? U : T extends [] ? [] : T extends [unknown, ...unknown[]] ? SerializeTuple<T> : T extends ReadonlyArray<infer U> ? (U extends NonJsonPrimitive ? null : Serialize<U>)[] : T extends object ? SerializeObject<UndefinedToOptional<T>> : never;
/** JSON serialize [tuples](https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types) */
declare type SerializeTuple<T extends [unknown, ...unknown[]]> = {
    [k in keyof T]: T[k] extends NonJsonPrimitive ? null : Serialize<T[k]>;
};
/** JSON serialize objects (not including arrays) and classes */
declare type SerializeObject<T extends object> = {
    [k in keyof T as T[k] extends NonJsonPrimitive ? never : k]: Serialize<T[k]>;
};
declare type SerializeDeferred<T extends Record<string, unknown>> = {
    [k in keyof T as T[k] extends Promise<unknown> ? k : T[k] extends NonJsonPrimitive ? never : k]: T[k] extends Promise<infer U> ? Promise<Serialize<U>> extends never ? "wtf" : Promise<Serialize<U>> : Serialize<T[k]> extends never ? k : Serialize<T[k]>;
};
declare type UndefinedToOptional<T extends object> = {
    [k in keyof T as undefined extends T[k] ? never : k]: T[k];
} & {
    [k in keyof T as undefined extends T[k] ? k : never]?: Exclude<T[k], undefined>;
};
declare type ArbitraryFunction = (...args: any[]) => unknown;
/**
 * Infer JSON serialized data type returned by a loader or action.
 *
 * For example:
 * `type LoaderData = SerializeFrom<typeof loader>`
 */
export declare type SerializeFrom<T extends AppData | ArbitraryFunction> = Serialize<T extends (...args: any[]) => infer Output ? Awaited<Output> extends TypedResponse<infer U> ? U : Awaited<Output> : Awaited<T>>;
export {};
