const baseUrl = 'http://localhost:5000';

export async function getBlogs() {
    return (await fetch(`${baseUrl}/blog`, { credentials: 'include' })).json();
}

export async function getBlogById(id) {
    return (await fetch(`${baseUrl}/blog/getBlogById/${id}`, { credentials: 'include' })).json();
}

export async function getArticles() {
    return (await fetch(`${baseUrl}/article`, { credentials: 'include' })).json();
}

export async function createArticle(article) {
    return (await fetch(`${baseUrl}/article/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(article)
    })).json();
}
export async function getSpecificArt(id) {
    return (await fetch(`${baseUrl}/article/specificart/${id}`, { credentials: 'include' })).json();
}
