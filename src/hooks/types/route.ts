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
  visible?: boolean;
  status?: boolean;
  order?: number;
  creator?: string;
  updater?: string;
  createTime?: string;
  updateTime?: string;
  premission?: string;
  outlink?: boolean;
  target?: string;
  [field: string]: unknown;
}
