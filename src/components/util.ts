export function getPrefixCls(cls: string, customizePrefixCls?: string) {
  return customizePrefixCls ?? `ev-${cls}`;
}
