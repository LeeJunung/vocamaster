import { useState } from "react";

interface IProps {
  word: IWord;
}

export interface IWord {
  day: number;
  eng: string;
  // kor → jpnに変更（日本語対応）
  jpn: string;
  isDone: boolean;
  id: number;
}

export default function Word({ word: w }: IProps) {
  const [word, setWord] = useState(w);
  const [isShow, setIsShow] = useState(false);
  const [isDone, setIsDone] = useState(word.isDone);

  // 意味の表示・非表示を切り替える
  function toggleShow() {
    setIsShow(!isShow);
  }

  // 学習済みフラグを切り替えてサーバーに保存する
  function toggleDone() {
    // nginxプロキシ経由でjson-serverにPUTリクエスト
    fetch(`/api/words/${word.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...word,
        isDone: !isDone,
      }),
    }).then(res => {
      if (res.ok) {
        setIsDone(!isDone);
      }
    });
  }

  // 単語を削除する
  function del() {
    if (window.confirm("削除しますか？")) {
      // nginxプロキシ経由でjson-serverにDELETEリクエスト
      fetch(`/api/words/${word.id}`, {
        method: "DELETE",
      }).then(res => {
        if (res.ok) {
          setWord({
            ...word,
            id: 0,
          });
        }
      });
    }
  }

  if (word.id === 0) {
    return null;
  }

  return (
    <tr className={isDone ? "off" : ""}>
      <td>
        <input type="checkbox" checked={isDone} onChange={toggleDone} />
      </td>
      <td>{word.eng}</td>
      <td>{isShow && word.jpn}</td>
      <td>
        <button onClick={toggleShow}>意味を{isShow ? "隠す" : "見る"}</button>
        <button onClick={del} className="btn_del">
          削除
        </button>
      </td>
    </tr>
  );
}

// Create - POST
// Read - GET
// Update - PUT
// Delete - DELETE
