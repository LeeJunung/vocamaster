import { Link } from "react-router-dom";

// ヘッダーコンポーネント
export default function Header() {
  return (
    <div className="header">
      <h1>
        <Link to="/">TOEIC 英単語（上級）</Link>
      </h1>
      <div className="menu">
        <Link to="/create_word" className="link">
          単語追加
        </Link>
        <Link to="/create_day" className="link">
          Day追加
        </Link>
      </div>
    </div>
  );
}
