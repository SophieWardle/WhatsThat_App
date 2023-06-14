/* eslint-disable linebreak-style */
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Signs up a new user
 * @param {Object} to_send
 * @returns
 */
export const signupUser = async (to_send) => fetch('http://localhost:3333/api/1.0.0/user', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(to_send),
})
  .then((response) => {
    if (response.status === 201) {
      return response.json();
    } if (response.status === 400) {
      throw "Email exists or password isn't strong enough";
    } else {
      throw 'Something went wrong';
    }
  })
  .then((rJson) => {
    console.log(rJson);
  })
  .catch((error) => {
    console.log(error);
  });

export const loginUser = async (to_send) => fetch('http://localhost:3333/api/1.0.0/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(to_send),
})
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } if (response.status === 400) {
      throw 'Incorrect';
    } else {
      throw 'Something went wrong';
    }
  })
  .then((rJson) => {
    console.log(rJson);
    const { token, id } = rJson;
    AsyncStorage.setItem('whatsthat_session_token', token);
    AsyncStorage.setItem('id', id.toString());
  })
  .catch((error) => {
    console.log(error);
  });

export const logoutUser = async () => {
  const id = await AsyncStorage.getItem('id');
  const token = await AsyncStorage.getItem('whatsthat_session_token');
  return fetch('http://localhost:3333/api/1.0.0/logout', {
    method: 'POST',
    headers: {
      'X-Authorization': token,
    },
  })
    .then(async (response) => {
      if (response.status === 200) {
        await AsyncStorage.removeItem('whatsthat_session_token');
        await AsyncStorage.removeItem('id');
      } else if (response.status === 401) {
        console.log('Unauthorised');
        await AsyncStorage.removeItem('whatsthat_session_token');
        await AsyncStorage.removeItem('id');
        this.props.navigation.navigate('Login');
      } else {
        throw 'Something went wrong';
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getUserProfileData = async () => {
  const id = await AsyncStorage.getItem('id');
  const token = await AsyncStorage.getItem('whatsthat_session_token');
  const url = `http://localhost:3333/api/1.0.0/user/${id}`;
  return fetch(url, {
    method: 'GET',
    headers: {
      'X-Authorization': token,
    },
  })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log('Get user profile data api success!');
      return responseJson;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updateUserProfile = async (to_send) => {
  const id = await AsyncStorage.getItem('id');
  const token = await AsyncStorage.getItem('whatsthat_session_token');
  return fetch(`http://localhost:3333/api/1.0.0/user/${id}`, {
    method: 'PATCH',
    headers: {
      'X-Authorization': token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(to_send),
  })
    .then((response) => response.json())
    .then((responseJson) => responseJson)
    .catch((error) => {
      console.log(error);
    });
};

export const searchForUser = async (query) => {
  const url = `http://localhost:3333/api/1.0.0/search?${query}`;
  const token = await AsyncStorage.getItem('whatsthat_session_token');
  return fetch(url, {
    method: 'GET',
    headers: {
      'X-Authorization': token,
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((responseJson) => responseJson)
    .catch((error) => {
      console.log(error);
    });
};
