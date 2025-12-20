import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const ChatBubble = () => {
  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 3, type: "spring" }}
      className="fixed bottom-6 right-6 z-40 glass-strong w-14 h-14 rounded-full flex items-center justify-center 
                 hover:scale-110 transition-transform shadow-lg"
      aria-label="Open chat"
    >
      <MessageCircle size={24} />
    </motion.button>
  );
};

export default ChatBubble;
