export default function ChatBubble({ text, type }) {
  return (
    <div className={`bubble ${type}`}>
      {text}
    </div>
  );
}
