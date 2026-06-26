const ChatBotButton = ({ setIsOpen }) => {
  return (
    <button
      className="fixed bottom-6 right-8 text-4xl z-50 bg-violet-500 text-white p-4 rounded-full shadow-lg hover:scale-125 duration-100 cursor-pointer"
      onClick={() => setIsOpen(true)}
    >
      🤖
    </button>
  );
};

export default ChatBotButton;