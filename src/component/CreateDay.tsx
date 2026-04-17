import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { IDay } from "./DayList";

// react-router-dom v6: useHistoryからuseNavigateに変更
export default function CreateDay() {
  const days = useFetch("/api/days");
  const navigate = useNavigate();

  // Dayを新規追加してトップページへ戻る
  function addDay() {
    fetch(`/api/days/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // day: days.length + 1,
        day: getNextDay(days),
      }),
    }).then(res => {
      if (res.ok) {
        alert("作成が完了しました");
        // v6: history.pushからnavigateに変更
        navigate(`/`);
      }
    });
  }

  function getNextDay(days: IDay[]) {
    // daysからdayの値だけを抜き取る
    const dayValues = days.map(d => d.day);
  
    // dayの値を昇順にソート
    dayValues.sort((a, b) => a - b);
  
    // 1から順番にdayの値と比較して、最初に違う値があればそれが次のday
    for (let i = 1; i <= dayValues.length; i++) {
      if (dayValues[i - 1] !== i) {
        return i; // dayの値がiと違う場合はiが次のday
      }
    }
  
    // すべてのdayの値が1から順番に揃っている場合は、最後のdayの値に1を足したものが次のday
    return dayValues.length + 1;
  }

  function delDay(id: number) {
    if (window.confirm("削除しますか？")) {
      fetch(`/api/days/${id}`, {
        method: "DELETE",
      }).then(res => {
        if (res.ok) {
          alert("削除が完了しました");
          navigate(`/`);
        }
      });
    }
  }

  return (
    <div>
      <h3>現在の日数：{days.length}日</h3>
      <div>
        <h4>追加</h4>
        <div className="list_day">
          <button onClick={addDay}>Day追加</button>
        </div>
      </div>

      <div>
        <h4>削除</h4>
        <div className="list_day">
          {
            days
              .slice() // 元の配列を変更しないようにコピーを作成
              .sort((a, b) => a.day - b.day) // dayの値で昇順にソート
              .map(day => (
              <button key={day.id} onClick={() => delDay(day.id)}>
                Day {day.day}
              </button>
            ))
          }
        </div>
      </div>
    </div>
  );
}
