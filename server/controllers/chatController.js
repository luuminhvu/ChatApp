const Chat = require("../models/Chat");

const createChat = async (req, res) => {
  const { firstId, secondId } = req.body;
  try {
    // Tạo một cuộc trò chuyện chỉ nếu chưa tồn tại
    const existingChat = await Chat.findOne({
      members: { $all: [firstId, secondId] },
    });

    if (existingChat) {
      res.status(200).json(existingChat);
    } else {
      const newChat = new Chat({
        members: [firstId, secondId],
      });
      const response = await newChat.save();
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const findUserChat = async (req, res) => {
  const userId = req.params.userId;
  try {
    const chat = await Chat.find({ members: { $in: [userId] } });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const findChat = async (req, res) => {
  const { firstId, secondId } = req.params;
  try {
    const chat = await Chat.find({
      members: { $all: [firstId, secondId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createChat, findUserChat, findChat };
