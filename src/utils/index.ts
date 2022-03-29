import { useEffect, useState } from "react";

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

// 默认执行一次的 hook
export const useMount = (callBack: () => void) => {
  useEffect(() => {
    callBack();
  }, []);
};

// 防抖 hook
export const useDebounce = <V>(value: V, delay: number) => {
  const [resValue, setResValue] = useState(value);
  useEffect(() => {
    // 在每一次 value 变化的时候创建一个定时器，定时器里在 delay 后设置最终值
    const timer = setTimeout(() => setResValue(value), delay);
    // 每次在上一个 useEffect 处理完以后再运行
    return () => clearTimeout(timer);
  }, [value, delay]);
  return resValue;
};
