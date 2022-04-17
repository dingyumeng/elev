import { omit } from 'lodash';
import { DirectiveBinding } from 'vue/types/options';
import { DefaultRoot } from '@/common/constants';
import { ProcessTreeOptions, TreeBranchValues, TreeNodeCommon } from './types';

/**
 * @description v-permission 的核心逻辑
 * @param binding DirectiveBinding
 * @param permissions Array<string>
 * @returns
 */
export const usePermission = (binding: DirectiveBinding, permissions: Array<string>): boolean => {
  const { value } = binding;

  const process = (raw: Array<string>): boolean[] => {
    const expressions = raw.map(x => x.trim());
    const permissionPartial = expressions.filter(x => x);
    return permissionPartial.map(x => permissions.includes(x));
  };

  if (Array.isArray(value)) {
    return process(value).every(x => x);
  }

  const expression = value as string;

  if (expression && expression.includes('&&')) {
    const expressionRaw = expression.split('&&');
    return process(expressionRaw).every(x => x);
  }

  if (expression && expression.includes('||')) {
    const expressionRaw = expression.split('||');
    return process(expressionRaw).some(x => x);
  }

  return permissions.includes(expression);
};

/**
 * @description 把树状结构平铺开（父子级放入同一数组）
 * @param source T[]
 * @param childrenName string 子级名称，默认 children
 * @returns T[]
 */
export const useTreeToFlatten = <T extends TreeNodeCommon>(source: Array<T>, childrenName = 'children'): T[] => {
  const allTreeNode: T[] = [];

  const recursion = (children: T[]) => {
    children.forEach(item => {
      const { children } = item;

      allTreeNode.push(omit(item, childrenName) as T);

      if (children && children.length) {
        recursion((children as T[]) || []);
      }
    });
  };

  recursion(source);
  return allTreeNode;
};

/**
 * @description 把平铺的数据组装成树结构
 * @param source T[]
 * @param options ProcessTreeOptions
 * @returns T[]
 */
export const useFlattenToTree = <T extends TreeNodeCommon>(
  source: T[],
  options: ProcessTreeOptions = {
    key: 'id',
    root: DefaultRoot,
    parentKey: 'parentId',
  }
): T[] => {
  const { key, root, parentKey } = options;

  const recursion = (parents: T[]) => {
    parents.forEach(parent => {
      const children = source.filter(x => x[parentKey] === parent[key]);
      parent.children = children;

      if (children && children.length) {
        recursion(children);
      }
    });
  };

  const parents = source.filter(x => x[parentKey] === root);
  recursion(parents);

  return parents;
};

/**
 * @description 向上查找父级id
 * @param value string 子节点 id
 * @param source 树结构数据或已平铺的树数据
 * @param options ProcessTreeOptions
 * @returns TreeBranchValues
 */
export const useFindParentNodes = <T extends TreeNodeCommon>(
  value: string,
  source: T[],
  options: ProcessTreeOptions = {
    key: 'id',
    parentKey: 'parentId',
  }
): TreeBranchValues<T> => {
  const nodes: Array<T> = [];
  const values: Array<string> = [value];

  const { key, parentKey } = options;
  const flattenNodes = useTreeToFlatten(source);
  const currentNode = flattenNodes.find(x => x[key] === value);

  const recursion = (current: T) => {
    const parent = flattenNodes.find(x => x[key] === current[parentKey]);

    if (parent) {
      nodes.unshift(parent);
      values.unshift(parent[key] as string);
      recursion(parent);
    }
  };

  if (!currentNode) {
    throw Error(`未在提供的 source 中查找到当前 id: ${value}`);
  }

  nodes.push(currentNode);
  recursion(currentNode);
  return { values, nodes };
};
