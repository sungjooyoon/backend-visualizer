declare module 'vis-data' {
  export class DataSet<T = any> {
    constructor(data?: T[]);
    add(data: T | T[]): any;
    update(data: T | T[]): any;
    remove(id: string | number | Array<string | number>): any;
    get(id?: string | number | Array<string | number>): T | T[];
    forEach(callback: (item: T, id: string | number) => void): void;
    map<R>(callback: (item: T, id: string | number) => R): R[];
    length: number;
  }
} 