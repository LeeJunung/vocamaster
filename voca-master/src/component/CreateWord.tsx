import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { IDay } from "./DayList";

export default function CreateWord() {
  const days: IDay[] = useFetch("/api/days");
  // react-router-dom v6: useHistoryからuseNavigateに変更
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // フォーム送信時に単語を新規登録する
  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!isLoading && dayRef.current && engRef.current && jpnRef.current) {
      setIsLoading(true);

      const day = dayRef.current.value;
      const eng = engRef.current.value;
      const jpn = jpnRef.current.value;

      // nginxプロキシ経由でjson-serverにPOSTリクエスト
      fetch(`/api/words/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          day: Number(day), // dayは数値として保存
          eng,
          jpn,
          isDone: false,
        }),
      }).then(res => {
        if (res.ok) {
          alert("作成が完了しました");
          // v6: history.pushからnavigateに変更
          navigate(`/day/${day}`);
          setIsLoading(false);
        }
      });
    }
  }

  const engRef = useRef<HTMLInputElement>(null);
  const jpnRef = useRef<HTMLInputElement>(null);
  const dayRef = useRef<HTMLSelectElement>(null);

  return (
    <form onSubmit={onSubmit}>
      <div className="input_area">
        <label>Eng</label>
        <input type="text" placeholder="computer" ref={engRef} />
      </div>
      <div className="input_area">
        {/* kor → jpnに変更 */}
        <label>Jpn</label>
        <input type="text" placeholder="コンピューター" ref={jpnRef} />
      </div>
      <div className="input_area">
        <label>Day</label>
        <select ref={dayRef}>
          {days.map(day => (
            <option key={day.id} value={day.day}>
              {day.day}
            </option>
          ))}
        </select>
      </div>
      <button
        style={{
          opacity: isLoading ? 0.3 : 1,
        }}
      >
        {isLoading ? "保存中..." : "保存"}
      </button>
    </form>
  );
}
