export type DictionaryItem<ValueType> = {
  label?: string;
  value: ValueType;
  [key: string]: unknown;
};

export type ArrayDictionary<ValueType> = DictionaryItem<ValueType>[];

export type ObjectDictionary<ValueType> = Record<string | number | symbol, DictionaryItem<ValueType>>;

export type Dictionary<ValueType> = ArrayDictionary<ValueType> | ObjectDictionary<ValueType>;
