import AsyncStorage from '@react-native-async-storage/async-storage';


// Function to retrieve draft messages from AsyncStorage
export const getDraftMessages = async () => {
    try {
      const value = await AsyncStorage.getItem('draftMessages');
      if (value !== null) {
        // Return parsed JSON array of draft messages
        return JSON.parse(value);
      }
      return [];
    } catch (error) {
      console.error('Error getting draft messages from AsyncStorage: ', error);
      return [];
    }
  };

// Function to save draft messages to AsyncStorage
export const saveDraftMessages = async (draftMessages) => {
  try {
    // Convert draft messages to JSON string
    const jsonValue = JSON.stringify(draftMessages);
    await AsyncStorage.setItem('draftMessages', jsonValue);
  } catch (error) {
    console.error('Error saving draft messages to AsyncStorage: ', error);
  }
};

// Function to create a new draft message in a chat
export const createDraftMessageInChat = async (chatId, draftMessage) => {
    try {
      // Get current draft messages from AsyncStorage
      const draftMessages = await getDraftMessages();
  
      // Add chatId or other relevant identifier to the draft message object
      draftMessage.chatId = chatId;
  
      // Add the new draft message to the array
      draftMessages.push(draftMessage);
  
      // Save the updated draft messages to AsyncStorage
      await saveDraftMessages(draftMessages);
  
      // Return the updated draft messages
      return draftMessages;
    } catch (error) {
      console.error('Error creating draft message in chat: ', error);
    }
  };
