const BASE_URL = "http://restapi.adequateshop.com/api/"
const ApiService = (method, path, payload) => {
    const url = BASE_URL+path
    return new Promise((reject, resolve)=>{
        const options = {
            method: method,
            headers:{'content-type': 'application/json', accept: 'application/json' },
            mode: 'no-cors'
        };
        console.log("options = ", options, payload)
    
        options.body = payload;

        fetch(url,options)
            .then(resp=>resp.json())
            .then((resp)=>{
                console.log("resp === ", resp)
                resolve(resp)
            })
            .catch((error)=>{reject(error)})
    })
}

export default ApiService