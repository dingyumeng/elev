export interface RouteConfigCommon {
  path: string;
  name: string;
  componentPath: string;
  params?: string;
  redirect?: string;
  children?: RouteConfigCommon[];
  id: string;
  parentId: string;
  type: 'Directory' | 'Menu' | 'Button';
  icon?: string;
  visible?: string;
  status?: string;
  order?: number;
  creator?: string;
  updater?: string;
  createTime?: string;
  updateTime?: string;
  premission?: string;
  outlink?: '1' | '0';
  target?: '1' | '0';
  [field: string]: unknown;
}
