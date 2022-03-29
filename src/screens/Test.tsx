import React from "react";
import { useArray } from "utils";

export default function Test() {
  const person: { name: string; age: number }[] = [
    { name: "jack", age: 25 },
    { name: "ma", age: 29 },
  ];
  const { value, clear, removeIndex, add } = useArray(person);
  return (
    <div>
      <button onClick={() => add({ name: "john", age: 18 })}>add jhon</button>
      <button onClick={() => removeIndex(0)}>delete jhon</button>
      <button style={{ marginBottom: 50 }} onClick={() => clear()}>
        clear
      </button>
      {value.map((item: { name: string; age: number }, index: number) => {
        return (
          <div key={index} style={{ marginBottom: 30 }}>
            <span style={{ color: "red" }}>{index}</span>
            <span>{item.name}</span>
            <span>{item.age}</span>
          </div>
        );
      })}
    </div>
  );
}
