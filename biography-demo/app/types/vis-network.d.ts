declare module 'vis-network' {
  export class Network {
    constructor(container: HTMLElement, data: any, options: any);
    on(event: string, callback: any): void;
    off(event: string, callback: any): void;
    setData(data: any): void;
    setOptions(options: any): void;
    destroy(): void;
    focus(nodeId: number, options?: any): void;
  }
} 