import React, { Component } from "react";
import { View, StyleSheet, Image } from "react-native";


const DisplayContactPicture = ({ handleFetchPicture, user_id }) => {
    return (
        <View style={styles.pictureContainer}>
            <Image
                source={{
                    uri: handleFetchPicture(user_id),
                }}
                style={styles.profilePic}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    pictureContainer: {
      width: 80,
      height: 80,
      borderRadius: 40,
      marginLeft: 10,
    },
    profilePic: {
      width: 80,
      height: 80,
      borderRadius: 40,
    },
  });



export default DisplayContactPicture;