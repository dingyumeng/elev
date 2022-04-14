export interface TreeNodeCommon {
  children?: TreeNodeCommon[];
  [field: string]: unknown;
}

export interface FlattenToTreeOptions {
  key: string;
  root: string;
  parentKey: string;
}
