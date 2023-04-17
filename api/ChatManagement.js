import AsyncStorage from "@react-native-async-storage/async-storage";

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

export const getSingleChatData = async (chat_id) => {
    const token = await AsyncStorage.getItem('whatsthat_session_token');
    return fetch(`http://localhost:3333/api/1.0.0/chat/${chat_id}`, {
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

export const deleteChatMessage = async (chat_id, message_id) => {
    const token = await AsyncStorage.getItem('whatsthat_session_token');
    return fetch(`http://localhost:3333/api/1.0.0/chat/${chat_id}/message/${message_id}`, {
        method: 'DELETE',
        headers: {
            'X-Authorization': token,
        }
    })
        .then(async (response) => {
            if (response.status === 200) {
                return response;
            } else if (response.status === 401) {
                throw "Unauthorized"
            }
            else if (response.status === 403) {
                throw "Forbidden"
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

export const updateChatMessage = async (chat_id,message_id,to_send) => {
    const token = await AsyncStorage.getItem('whatsthat_session_token');
    return fetch(`http://localhost:3333/api/1.0.0/chat/${chat_id}/message/${message_id}`, {
        method: 'PATCH',
        headers: {
            'X-Authorization': token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(to_send),
    })
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            console.log(error);
        });
}

export const addUserToChat = async (chat_id, user_id) => {
    const token = await AsyncStorage.getItem('whatsthat_session_token');
    return fetch(`http://localhost:3333/api/1.0.0/chat/${chat_id}/user/${user_id}`, {
        method: 'POST',
        headers: {
            'X-Authorization': token
        },
    })
        .then(async (response) => {
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 400) {
                throw "Bad Request"
            } else if (response.status === 401) {
                throw "Unauthorized"
            } else if (response.status === 403) {
                throw "Forbidden"
            } else if (response.status === 404) {
                throw "Not found"
            } else if (response.status === 500) {
                throw "Server Error"
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

export const removeUserFromChat = async (chat_id, user_id) => {
    const token = await AsyncStorage.getItem('whatsthat_session_token');
    return fetch(`http://localhost:3333/api/1.0.0/chat/${chat_id}/user/${user_id}`, {
        method: 'DELETE',
        headers: {
            'X-Authorization': token,
        }
    })
        .then(async (response) => {
            if (response.status === 200) {
                return response;
            } else if (response.status === 401) {
                throw "Unauthorized"
            }
            else if (response.status === 403) {
                throw "Forbidden"
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

export const updateChatDetails = async (chat_id,to_send) => {
    const token = await AsyncStorage.getItem('whatsthat_session_token');
    return fetch(`http://localhost:3333/api/1.0.0/chat/${chat_id}`, {
        method: 'PATCH',
        headers: {
            'X-Authorization': token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(to_send),
    })
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            console.log(error);
        });
}
