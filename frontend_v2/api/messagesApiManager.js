// Samuel's acc keys <- feel free to use but be kind and do not abuse
const X_MASTER_KEY = "$2a$10$74f1nJGQMLLYYXdQVprLIuoYnCy7wNGk8Gmr1QFV.b.MU0V4rIW9m";
const BASE_URL = "https://api.jsonbin.io/v3/b/";
// const X_ACCESS_KEY = "$2a$10$VEQQz5e38QXDa1J317sjueZtB53uWrqbrRSCmxVdy6rVx9Lfjux5m";
const BIN_ID = "65831e46dc74654018866a79"

function addMessage(newMessage) {
    readApi().then(apiJson => {
        if (apiJson && apiJson.record && apiJson.record.messages) {
            apiJson.record.messages.push(newMessage);
        }

        updateApi(apiJson.record);
        }
    );
}

async function readApi() {
    try {
        const url = BASE_URL + BIN_ID + '/latest';
        console.log(url);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-Master-Key': X_MASTER_KEY,
            },
        });

        if (response.ok) {
            return await response.json();
        } else {
            console.log('Code: ' + response.status);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function updateApi(jsonToUpdate) {
    fetch(BASE_URL + BIN_ID, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': X_MASTER_KEY
        },
        body: JSON.stringify(jsonToUpdate)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('An error occurred while trying to update API json');
            }
            return response.json();
        })
        .then(data => {
            console.log('Successfully updated API json to:', data);
        })
        .catch(error => {
            console.error('Error:', error.message);
        });
}

function resetChat() {
    const RESET_MESSAGES = {
        "messages": [
            {
                "id": 0,
                "author": "Friend Bot",
                "message": "Hello, welcome to your FriendGroup!",
                "datetime": "2000-01-01T12:00:00"
            }
        ]
    };

    updateApi(RESET_MESSAGES);
}

// -> not tested -> do not use
// async function removeMessage(messageId) {
//     readApi().then(apiJson => {
//             for (let i = 0; i < apiJson.record.messages.length; i++) {
//                 if (apiJson.record.messages[i].messageId === messageId) {
//                     apiJson.record.messages.splice(i, i);
//                 }
//             }
//
//             updateApi(apiJson.record);
//         }
//     );
// }

//sample json file
// const DEFAULT_MESSAGES = {
//     "messages": [
//         {
//             "id": 1,
//             "author": "John Doe",
//             "message": "Hello, how are you?",
//             "datetime": "2023-01-01T12:00:00"
//         },
//         {
//             "id": 2,
//             "author": "Alice Smith",
//             "message": "I'm doing well, thank you!",
//             "datetime": "2023-01-01T12:15:00"
//         },
//         {
//             "id": 3,
//             "author": "Bob Johnson",
//             "message": "What's the weather like today?",
//             "datetime": "2023-01-01T12:30:00"
//         }
//     ]
// };
//
// const sampleMessage = {
//     "id": 12,
//     "author": "Eve Anderson",
//     "message": "It's sunny and warm outside!",
//     "datetime": "2023-01-01T12:45:00"
// }