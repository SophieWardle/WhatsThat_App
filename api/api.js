import AsyncStorage from "@react-native-async-storage/async-storage";

/*
this.setState({ "error": "Signed in successfully" })
        this.setState({ "submitted": false })
        this.props.navigation.navigate("MainNav")
    */


//USER MANAGEMENT
export const loginUser = async (to_send) => {
    return fetch("http://localhost:3333/api/1.0.0/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(to_send)
    })
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 400) {
                throw "Incorrect"
            } else {
                throw "Something went wrong"
            }
        })
        .then((rJson) => {
            console.log(rJson)
            const { token, id } = rJson;
            AsyncStorage.setItem('whatsthat_session_token', token);
            AsyncStorage.setItem('id', id.toString());
        })
        .catch((error) => {
            console.log(error);
        })
}

export const signupUser = async (to_send) => {
    return fetch("http://localhost:3333/api/1.0.0/user", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(to_send)
    })
        .then((response) => {
            if (response.status === 201) {
                return response.json();
            } else if (response.status === 400) {
                throw "Email exists or password isn't strong enough"
            } else {
                throw "Something went wrong"
            }
        })
        .then((rJson) => {
            console.log(rJson)

        })
        .catch((error) => {
            console.log(error)
        })
}

export const logoutUser = async () => {
    const id = await AsyncStorage.getItem('id');
    const token = await AsyncStorage.getItem('whatsthat_session_token');
    return fetch("http://localhost:3333/api/1.0.0/logout", {
        method: 'POST',
        headers: {
            'X-Authorization': token
        }
    })
        .then(async (response) => {
            if (response.status === 200) {
                await AsyncStorage.removeItem('whatsthat_session_token')
                await AsyncStorage.removeItem('id')

            } else if (response.status === 401) {
                console.log("Unauthorised")
                await AsyncStorage.removeItem('whatsthat_session_token')
                await AsyncStorage.removeItem('id')
                this.props.navigation.navigate("Login")
            } else {
                throw "Something went wrong"
            }
        })
        .catch((error) => {
            console.log(error);
        })
}


export const getUserProfileData = async () => {
    const id = await AsyncStorage.getItem('id');
    const token = await AsyncStorage.getItem('whatsthat_session_token');
    const url = `http://localhost:3333/api/1.0.0/user/${id}`
    console.log(token);
    return fetch(url, {
        method: 'GET',
        headers: {
            'X-Authorization': token
        }
    })
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            console.log(error);
        });
}

export const updateUserProfile = async (to_send) => {
    const id = await AsyncStorage.getItem('id');
    const token = await AsyncStorage.getItem('whatsthat_session_token');
    return fetch(`http://localhost:3333/api/1.0.0/user/${id}`, {
        method: 'PATCH',
        headers: {
            'X-Authorization': token
        },
        body: JSON.stringify(to_send)
    })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                isLoading: false,
                contactData: responseJson
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

export const getUsersProfilePic = async () => {
    const id = await AsyncStorage.getItem('id');
    const token = await AsyncStorage.getItem('whatsthat_session_token');
    return fetch(`http://localhost:3333/api/1.0.0/user/${id}/photo`, {
        method: 'GET',
        headers: {
            'X-Authorization': token
        }
    })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                isLoading: false,
                contactData: responseJson
            })
        })
        .catch((error) => {
            console.log(error);
        });
}


//CONTACT MANAGEMENT
export const getContactData = async () => {
    const token = await AsyncStorage.getItem('whatsthat_session_token');
    return fetch("http://localhost:3333/api/1.0.0/contacts", {
        method: 'GET',
        headers: {
            'X-Authorization': token
        }
    })
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            console.log(error);
        });

}

export const addContact = async(queryId) => {
    const token = await AsyncStorage.getItem('whatsthat_session_token');
    return fetch(`http://localhost:3333/api/1.0.0/user/${queryId}/contact`, {
        method: 'POST',
        headers: {
            'X-Authorization': token,
            'Content-Type': 'application/json'
        }
    })
        .then(async (response) => {
            if (response.status === 200) {
               return response;
            } else if (response.status === 400) {
                throw "You can't add yourself"
            } else if (response.status === 304) {
                throw "Already a contact"
            }
            else if (response.status === 401) {
                throw "Unauthorized"
            }
            else if (response.status === 404) {
                throw "Not Found"
            } else {
                throw "Server error"
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

export const deleteContact = async (user_id) => {
    const deleteId = user_id;
    const token = await AsyncStorage.getItem('whatsthat_session_token');
    return fetch(`http://localhost:3333/api/1.0.0/user/${deleteId}/contact`, {
        method: 'DELETE',
        headers: {
            'X-Authorization': token,
            'Content-Type': 'application/json'
        }
    })
        .then(async (response) => {
            if (response.status === 200) {
                return response;
            } else if (response.status === 400) {
                throw "You can't remove yourself"
            }
            else if (response.status === 401) {
                throw "Unauthorized"
            }
            else if (response.status === 404) {
                throw "Not Found"
            } else {
                throw "Server error"
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

export const searchForUser = async (query) => {
    const url = `http://localhost:3333/api/1.0.0/search?${query}`;
    const token = await AsyncStorage.getItem('whatsthat_session_token');
    return fetch(url, {
        method: 'GET',
        headers: {
            'X-Authorization': token,
            'Content-Type': 'application/json'
        },
    })
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            console.log(error);
        });
}

//CHAT MANAGEMENT

export const getChatListData = async () => {
    const token = await AsyncStorage.getItem('whatsthat_session_token');
    const url = 'http://localhost:3333/api/1.0.0/chat'
    return fetch(url, {
        method: 'GET',
        headers: {
            'X-Authorization': token
        }
    })
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            console.log(error);
        });
}

export const createNewChat = async (to_send) => {
    const token = await AsyncStorage.getItem('whatsthat_session_token');
    return fetch("http://localhost:3333/api/1.0.0/chat", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        },
        body: JSON.stringify(to_send)
    })
        .then((response) => {
            if (response.status === 201) {
                return response.json();
            } else if (response.status === 400) {
                throw "Bad Request"
            } else {
                throw "Something went wrong"
            }
        })
        .then((rJson) => {
            console.log(rJson)
            AsyncStorage.setItem('chat_id', rJson.chat_id.toString());
            return rJson;
        })
        .catch((error) => {
            console.log(error);
        })
}

export const sendChatMessage = async (chat_id, to_send) => {
    const token = await AsyncStorage.getItem('whatsthat_session_token');
    return fetch(`http://localhost:3333/api/1.0.0/chat/${chat_id}/message`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        },
        body: JSON.stringify(to_send)
    })
        .then(async (response) => {
            if (response.status === 200) {
                await AsyncStorage.removeItem('chat_id')
                return response.json();
            } else if (response.status === 400) {
                throw "Bad Request"
            } else {
                throw "Something went wrong"
            }
        })
        .then((rJson) => {
            console.log(rJson)
        })
        .catch((error) => {
            console.log(error)
        })
}

export const sendPicToServer = async (data) => {
    const id = await AsyncStorage.getItem('id');
    const token = await AsyncStorage.getItem('whatsthat_session_token');

    let res = await fetch(data.base64);
    let blob = await res.blob;
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

export const getProfilePic = () => {

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

