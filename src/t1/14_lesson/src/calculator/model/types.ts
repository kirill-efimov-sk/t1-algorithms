import type { Data } from "../dto/calculator.dto";

export interface Operation<T> {
    perform(data: Data<T>): T;
}