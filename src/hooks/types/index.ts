export interface TreeNodeCommon {
  children?: Array<TreeNodeCommon>;
  [field: string]: unknown;
}

export interface ProcessTreeOptions {
  key: string;
  root?: string;
  parentKey: string;
}

export interface TreeBranchValues<T> {
  values: Array<string>;
  nodes: Array<T>;
}
