import ApiService from "@/app/api/common/api"

const AuthService = {
    login: (payload) => {
        return ApiService("POST", "authaccount/login", payload)
    },
    signup: (payload) => {
        return ApiService("POST", "authaccount/registration", payload)
    },
}

export default AuthService