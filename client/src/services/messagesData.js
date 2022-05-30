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

export async function sendreport(id,reason,messageR,buyerid,sellerid) {
    return (await fetch(`${baseUrl}/messages/sendreport`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({id,messageR,reason,buyerid,sellerid})
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
export async function deleteOffer( id, owner,seller) {
    return (await fetch(`${baseUrl}/messages/deleteOffer/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({id, owner,seller})
    })).json();
}

export async function rejectOffer(chatId, id ) {
    return (await fetch(`${baseUrl}/messages/rejectOffer/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({id, chatId})
    })).json();
}

export async function offertransport(id) {
    return (await fetch(`${baseUrl}/messages/offertransport/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({id})
    })).json();
}

export async function confirmOffer(chatId, id ) {
    return (await fetch(`${baseUrl}/messages/confirmOffer/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({id, chatId})
    })).json();
}