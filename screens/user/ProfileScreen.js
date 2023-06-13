/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import {
  ActivityIndicator,
  View,
  Text,
} from 'react-native';
// my components
import { NativeBaseProvider, Heading } from 'native-base';
import DisplayProfilePicture from '../../components/DisplayProfilePicture';
import Button from '../../components/Button';
// API
import { getUserProfileData } from '../../api/UserManagement';
import { getUserProfilePic } from '../../api/api';
// STYLES
import styles from '../../styles/globalTheme';
import buttonStyles from '../../styles/buttons';

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      profileData: [],
      photo: [],
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.unsubscribe = navigation.addListener('focus', () => {
      getUserProfileData()
        .then((responseJson) => {
          this.setState({
            profileData: responseJson,
          });
          console.log(responseJson);
          this.getProfilePic();
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getProfilePic = async () => {
    try {
      const photoBlob = await getUserProfilePic();
      this.setState({
        photo: photoBlob,
        isLoading: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { isLoading } = this.state;
    if (isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }
    const { profileData: { first_name, last_name, email } } = this.state;
    const { photo } = this.state;
    const navigation = this.props;
    return (
      <NativeBaseProvider>
        <View style={styles.backgroundContainer}>

          <Heading size="xl" textAlign="center">
            My Profile
          </Heading>

          <View style={styles.profileContainer}>
            <View style={styles.profileInformation}>
              <DisplayProfilePicture photo={photo} />
              <Text style={styles.name}>
                {first_name}
                {' '}
                {last_name}
              </Text>
              <Text style={styles.email}>{email}</Text>
            </View>
            <Button
              onPress={() => navigation.navigation.navigate('Camera', { navigation: navigation.navigation })}
              title="Edit My Profile Picture"
              buttonStyle={styles.profileButton}
              textStyle={buttonStyles.buttonText}
            />
            <Button
              onPress={() => navigation.navigation.navigate('ProfileUpdateScreen')}
              title="Edit My Profile Info"
              buttonStyle={styles.profileButton}
              textStyle={buttonStyles.buttonText}
            />
            <Button
              onPress={() => navigation.navigation.navigate('PassUpdateScreen')}
              title="Change My Password"
              buttonStyle={styles.profileButton}
              textStyle={buttonStyles.buttonText}
            />
            <Button
              onPress={() => navigation.navigation.navigate('ProfileLogoutScreen')}
              title="Logout"
              buttonStyle={styles.profileButton}
              textStyle={buttonStyles.buttonText}
            />
          </View>
        </View>
      </NativeBaseProvider>
    );
  }
}
