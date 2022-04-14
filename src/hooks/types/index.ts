export interface TreeNodeCommon {
  children?: TreeNodeCommon[];
  [field: string]: unknown;
}

export interface FlattenToTreeAttr {
  key: string;
  root: string;
  parentKey: string;
}
