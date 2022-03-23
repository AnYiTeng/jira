export const isFalse = (value: any) => (value === 0 ? true : !!value);

// 将 object 中为空的属性删除掉
export const cleanObject = (object: any) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (!isFalse(value)) {
      delete result[key];
    }
  });
  return result;
};
