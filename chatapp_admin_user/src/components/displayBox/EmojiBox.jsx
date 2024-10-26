import EmojiPicker from "emoji-picker-react";

const EmojiBox = ({ setValue }) => {
  const handleEmoji = (emojiData) => {
    setValue((prev) => prev + emojiData.emoji);
  };
  return (
    <div className="">
      <EmojiPicker
        emojiStyle="apple"
        theme="light"
        lazyLoadEmojis={true}
        defaultSkinTone="1f3fb"
        onEmojiClick={handleEmoji}
      />
    </div>
  );
};

export default EmojiBox;
