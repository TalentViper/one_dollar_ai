import {
  SET_MESSAGES,
  ADD_SUB_MESSAGE,
  SET_INCREASE_CHAT_ID,
  SET_ACTIVECHAT_ID,
  DELETE_CHAT
} from 'src/actions/types';

const initialState = {
  messages: localStorage.getItem('chatHistory')
    ? JSON.parse(localStorage.getItem('chatHistory'))[0].messages
    : [],
  activeChatId: 0, // indicates the id of the selected chat from chat history,
  chatHistory: localStorage.getItem('chatHistory')
    ? JSON.parse(localStorage.getItem('chatHistory'))
    : []
};

const updateChatHistory = (
  chatHistory,
  activeChatId,
  newMessage,
  isSubMessage = false
) => {
  return chatHistory.map((chat) => {
    if (chat.id === activeChatId) {
      const messages = isSubMessage
        ? [...chat.messages.slice(0, -1), newMessage]
        : [...chat.messages, newMessage];
      return { ...chat, messages };
    }
    return chat;
  });
};

const saveToLocalStorage = (data) => {
  localStorage.setItem('chatHistory', JSON.stringify(data));
};

const chatReducer = (state = initialState, action) => {
  const chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];

  switch (action.type) {
    case SET_MESSAGES: {
      const { newMessage } = action.payload;

      const updatedMessages =
        chatHistory.length > 0
          ? updateChatHistory(chatHistory, state.activeChatId, newMessage)
          : [
              {
                id: state.activeChatId,
                date: Date.now(),
                messages: [newMessage]
              }
            ];

      saveToLocalStorage(updatedMessages);

      return {
        ...state,
        messages: [...state.messages, newMessage],
        chatHistory: updatedMessages
      };
    }

    case ADD_SUB_MESSAGE: {
      const { message } = action.payload;
      const lastMessage = state.messages[state.messages.length - 1];
      const updatedLastMessage = {
        ...lastMessage,
        text: lastMessage.text + message.text
      };

      const updatedMessages =
        chatHistory.length > 0
          ? updateChatHistory(
              chatHistory,
              state.activeChatId,
              updatedLastMessage,
              true
            )
          : [
              {
                id: state.activeChatId,
                date: Date.now(),
                messages: [updatedLastMessage]
              }
            ];

      saveToLocalStorage(updatedMessages);

      return {
        ...state,
        messages: [...state.messages.slice(0, -1), updatedLastMessage],
        chatHistory: updatedMessages
      };
    }

    case SET_INCREASE_CHAT_ID:
      const newChatId = chatHistory.length > 0 ? chatHistory.length : 0;

      // Create a new chat object with the new ID and an empty messages array
      const newChat = {
        id: newChatId,
        date: Date.now(),
        messages: []
      };

      // Add the new chat to the chat history
      const updatedChatHistory = [...chatHistory, newChat];

      // Save the updated chat history to local storage
      saveToLocalStorage(updatedChatHistory);

      return {
        ...state,
        activeChatId: newChatId,
        messages: [],
        chatHistory: updatedChatHistory
      };

    case SET_ACTIVECHAT_ID:
      const chatId = action.payload.chatId;

      return {
        ...state,
        activeChatId: action.payload.chatId,
        messages: chatHistory[chatId].messages
      };

    case DELETE_CHAT:
      const { chat_id } = action.payload;
      const updated_chatHistory = state.chatHistory.filter(
        (chat) => chat.id !== chat_id
      );

      return {
        ...state,
        chatHistory: updated_chatHistory
      };

    default:
      return state;
  }
};

export default chatReducer;
