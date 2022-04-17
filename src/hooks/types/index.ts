/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export interface TreeNodeCommon extends Record<string | number | symbol, any> {
  children?: Array<TreeNodeCommon>;
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
