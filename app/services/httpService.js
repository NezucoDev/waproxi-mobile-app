
async function httpRequest(url, method='GET', data={}) {
    const response = await fetch(url, {
        method: method,
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    response.headers = response.headers.map

    return response
}

async function get(url) {
    const response = await httpRequest(url)
    return response
}

async function post(url, data) {
    const response = await httpRequest(url, 'POST', data)
    return response
}

export default {
    get,
    post
}