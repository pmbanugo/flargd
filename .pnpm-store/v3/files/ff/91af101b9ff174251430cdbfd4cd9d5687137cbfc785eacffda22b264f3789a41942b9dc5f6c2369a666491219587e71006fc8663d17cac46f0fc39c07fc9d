import type { Router as RemixRouter } from "@remix-run/router";
import type { AppData } from "./data";
export interface ThrownResponse<Status extends number = number, Data = AppData> {
    status: Status;
    statusText: string;
    data: Data;
}
export declare function deserializeErrors(errors: RemixRouter["state"]["errors"]): RemixRouter["state"]["errors"];
