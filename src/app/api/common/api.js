const BASE_URL = "http://restapi.adequateshop.com/api/"
const ApiService = (method, path, payload) => {
    const url = BASE_URL+path
    return new Promise((resolve, reject)=>{
        fetch(url, {
                method,
                body: payload
            })
            .then((resp)=>{
                resolve(resp.json())
            })
            .catch((error)=>{reject(error)})
    })
}

export default ApiService