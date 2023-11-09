import { FindOptionsWhere } from "typeorm";

export type FindFilterOption<T> = FindOptionsWhere<T>[] | FindOptionsWhere<T>;