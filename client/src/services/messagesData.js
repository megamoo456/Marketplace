const baseUrl = 'http://localhost:5000';

export async function createChatRoom(receiver,message,offer) {
    return (await fetch(`${baseUrl}/messages/createChatRoom`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({message: message,offer:offer, receiver: receiver})
    })).json();
}

export async function createOffer(offre) {
    return (await fetch(`${baseUrl}/offer/createOffer`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({...offre})
    })).json();
}

export async function getUserConversations() {
    return (await fetch(`${baseUrl}/messages/getUserConversations`, { credentials: 'include' })).json();
}

export async function getOfferConversations() {
    return (await fetch(`${baseUrl}/messages/getOfferConversations`, { credentials: 'include' })).json();
}

export async function sendMessage(chatId, message) {
    return (await fetch(`${baseUrl}/messages/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({chatId, message})
    })).json();
}
export async function deleteOffer(chatId, id, owner) {
    return (await fetch(`${baseUrl}/messages/deleteOffer/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({id, chatId, owner})
    })).json();
}
