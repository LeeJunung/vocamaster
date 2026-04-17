import { Link } from "react-router-dom";

// 存在しないページへのアクセス時に表示するコンポーネント
export default function EmptyPage() {
  return (
    <>
      <h2>不正なアクセスです。</h2>
      <Link to="/">戻る</Link>
    </>
  );
}
