import AsyncStorage from "@react-native-async-storage/async-storage";


//PICS & CAMERA
export const sendPicToServer = async (data) => {
  const id = await AsyncStorage.getItem('id');
  const token = await AsyncStorage.getItem('whatsthat_session_token');

  let res = await fetch(data.base64);
  let blob = await res.blob();

  return fetch(`http://localhost:3333/api/1.0.0/user/${id}/photo`, {
    method: 'POST',
    headers: {
      "Content-Type": "image/png",
      "X-Authorization": token
    },
    body: blob
  })
    .then((response) => {
      console.log("Picture added", response);
    })
    .catch((err) => {
      console.log(err);
    })
}

export const getUserProfilePic = async () => {
  try {
    const id = await AsyncStorage.getItem('id');
    const token = await AsyncStorage.getItem('whatsthat_session_token');
    const response = await fetch(`http://localhost:3333/api/1.0.0/user/${id}/photo`, {
      method: 'GET',
      headers: {
        'X-Authorization': token
      }
    });
    const blob = await response.blob();
    const resBlob = URL.createObjectURL(blob);
    console.log("Get profile pic api success. Photo:" + resBlob);
    return resBlob;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}

export const getContactProfilePic = async (id) => {
  try {
    const token = await AsyncStorage.getItem('whatsthat_session_token');
    const response = await fetch(`http://localhost:3333/api/1.0.0/user/${id}/photo`, {
      method: 'GET',
      headers: {
        'X-Authorization': token
      }
    });
    const blob = await response.blob();
    const resBlob = URL.createObjectURL(blob);
    console.log("res blob:" + resBlob);
    return resBlob;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}


export const takePicture = async () => {
  if (this.camera) {
    const options = {
      quality: 0.5,
      base64: true,
      onPictureSaved: (data) => this.sendPicToServer(data)
    };
    await this.camera.takePictureAsync(options);
  }
}

export const getContactAccount = async (user_id) => {
  const token = await AsyncStorage.getItem(whatsthat_session_token);
  return fetch(`http://localhost:3333/api/1.0.0/user/${user_id}`, {
    method: 'GET',
    headers: {

      'X-Authorization': token
      // 'Content-Type': "application/json"
    }
  })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((err) => {
      console.log(err);
    });
}
