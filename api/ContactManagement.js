import AsyncStorage from "@react-native-async-storage/async-storage";

//CONTACT MANAGEMENT
export const getContactList = async () => {
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

export const getContactProfile = async (contact_id) => {
    const token = await AsyncStorage.getItem('whatsthat_session_token');
    const url = `http://localhost:3333/api/1.0.0/user/${contact_id}`
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




export const addContact = async (queryId) => {
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

export const getBlockedUsers = async () => {
    const token = await AsyncStorage.getItem('whatsthat_session_token');
    const url = `http://localhost:3333/api/1.0.0/blocked`
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

export const blockContact = async (contact_id) => {
    const token = await AsyncStorage.getItem('whatsthat_session_token');
    const url = `http://localhost:3333/api/1.0.0/user/${contact_id}/block`
    return fetch(url, {
        method: 'POST',
        headers: {
            'X-Authorization': token
        }
    })
        .then(async (response) => {
            if (response.status === 200) {
                return response;
            } else if (response.status === 400) {
                throw "You can't block yourself"
            } else if (response.status === 401) {
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

export const unblockContact = async (contact_id) => {
    const contactId = contact_id;
    const token = await AsyncStorage.getItem('whatsthat_session_token');
    return fetch(`http://localhost:3333/api/1.0.0/user/${contactId}/block`, {
        method: 'DELETE',
        headers: {
            'X-Authorization': token,
        }
    })
        .then(async (response) => {
            if (response.status === 200) {
                return response;
            } else if (response.status === 400) {
                throw "You can't unblock yourself"
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

