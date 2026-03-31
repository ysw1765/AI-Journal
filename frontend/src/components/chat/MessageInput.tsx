export function MessageInput() {
  return (
    <form className="stack">
      <textarea rows={4} placeholder="输入你想补充的内容..." />
      <button type="submit">发送</button>
    </form>
  );
}
