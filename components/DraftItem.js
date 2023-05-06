/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { NativeBaseProvider, Heading, Text } from 'native-base';
import styles from '../styles/globalTheme';

function DraftItem({ item, navigation }) {
  return (
    <NativeBaseProvider>
      <View style={styles.draftItem}>
        <TouchableOpacity onPress={() => navigation.navigate('DraftsDisplay', {
          draftId: item.draftId,
          chatId: item.chatId,
          chatName: item.chatName,
          message: item.message,
        })}
        >
          <Heading size="md">{item.chatName}</Heading>
          <Text isTruncated maxW="100%" numberOfLines={2} fontSize="xl">
            {item.message}
          </Text>
        </TouchableOpacity>
      </View>
    </NativeBaseProvider>
  );
}

export default DraftItem;
