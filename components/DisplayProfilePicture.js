/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
  pictureContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
});

function DisplayProfilePicture({ photo }) {
  return (
    <View style={styles.pictureContainer}>
      <Image
        source={{
          uri: photo,
        }}
        style={styles.profilePic}
      />
    </View>
  );
}

export default DisplayProfilePicture;
