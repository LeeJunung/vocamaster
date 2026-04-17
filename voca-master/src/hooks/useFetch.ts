import { useEffect, useState } from "react";

// React 18対応: 型定義を明示的に指定
export default function useFetch<T = any>(url: string): T[] {
  const [data, setData] = useState<T[]>([]);

  useEffect(() => {
    fetch(url)
      .then(res => {
        return res.json();
      })
      .then((data: T[]) => {
        setData(data);
      });
  }, [url]);

  return data;
}
