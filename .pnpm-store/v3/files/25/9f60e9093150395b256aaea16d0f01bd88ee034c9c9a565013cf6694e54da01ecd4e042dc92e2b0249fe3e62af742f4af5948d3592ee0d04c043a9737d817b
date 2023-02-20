export declare type WriteChannel<T> = {
    write: (data: T) => void;
};
export declare type ReadChannel<T> = {
    read: () => Promise<T>;
};
export declare type Channel<T> = WriteChannel<T> & ReadChannel<T>;
export declare const createChannel: <T>() => Channel<T>;
