/* eslint-disable linebreak-style */
import { getUserProfileData, updateUserProfile } from '../api/UserManagement';
import { getUserProfilePic } from '../api/api';

export const fetchProfileData = async () => {
  try {
    const responseJson = await getUserProfileData();
    return responseJson;
  } catch (error) {
    throw new Error('Failed to fetch profile data');
  }
};

export const fetchProfilePic = async () => {
  try {
    const photoBlob = await getUserProfilePic();
    return photoBlob;
  } catch (error) {
    throw new Error('Failed to fetch profile picture');
  }
};

export const updateUserProfileData = async (data) => {
  try {
    const photoBlob = await updateUserProfile(data);
    return photoBlob;
  } catch (error) {
    throw new Error('Failed to fetch profile picture');
  }
};

export const updateUserPassword = async (toSend) => {
  try {
    await updateUserProfile(toSend);
    return 'Profile updated!';
  } catch (error) {
    throw new Error('Failed to update profile');
  }
};
