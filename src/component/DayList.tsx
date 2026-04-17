import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

export interface IDay {
  id: number;
  day: number;
}

export default function DayList() {
  // nginxプロキシ経由でjson-serverにアクセス
  const days: IDay[] = useFetch("/api/days");

  if (days.length === 0) {
    return <span>Loading...</span>;
  }

  return (
    <ul className="list_day">
      {
        days
        .slice() // 元の配列を変更しないようにコピーを作成
        .sort((a, b) => a.day - b.day) // dayの値で昇順にソート
        .map(day => (
          <li key={day.id}>
            <Link to={`/day/${day.day}`}>Day {day.day}</Link>
          </li>
        ))
      }
    </ul>
  );
}
