/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  TouchableOpacity,
} from 'react-native';
import moment from 'moment/moment';
import {
  Flex,
  Box,
  Heading,
  NativeBaseProvider,
  Text,
} from 'native-base';

function ChatItem({ chat, navigation }) {
  const { timestamp } = chat.last_message;
  const isToday = moment(timestamp).isSame(moment(new Date()), 'day');
  const formattedTimestamp = isToday
    ? `Today, ${moment(timestamp).format('h:mm a')}`
    : moment(timestamp).format('DD/MM/YYYY, h:mm a');

  return (
    <NativeBaseProvider>
      <TouchableOpacity onPress={() => navigation.navigate('Chat', { chatId: chat.chat_id })}>
        <Box w="100%" p="4" borderBottomWidth="1px" borderBottomColor="gray.300">
          <Heading size="md" mb="2">
            {chat.name}
          </Heading>
          {chat.last_message.message ? (
            <Flex direction="row" alignItems="center">
              <Box mr="3">
                <Text fontWeight="bold">
                  {chat.last_message.author.first_name}
                  {' '}
                  {chat.last_message.author.last_name}
                  :
                </Text>
              </Box>
              <Box mr="3" flex="1">
                <Text isTruncated maxW="100%" numberOfLines={1}>
                  {chat.last_message.message}
                </Text>
              </Box>
              <Text fontSize="sm">{formattedTimestamp}</Text>
            </Flex>
          ) : (
            <Text>No messages yet</Text>
          )}
        </Box>
      </TouchableOpacity>
    </NativeBaseProvider>
  );
}

export default ChatItem;
