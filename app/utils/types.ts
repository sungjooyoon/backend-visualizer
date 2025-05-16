export interface Person {
  id: number;
  label: string;
  group?: string;
  title?: string;
}

export interface Relationship {
  from: number;
  to: number;
  value: number;
  title?: string;
}

export interface GraphData {
  nodes: Person[];
  edges: Relationship[];
} 