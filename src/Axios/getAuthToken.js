import axios from "axios"

export async function getAuthToken(API, values){
    return new Promise(res => {
        axios.post((API + '/auth/login'), {
            "username": values.username,
            "password": values.password
        })
        .then(function (response) {
            res({ 
                token: response.data 
            })
        })
        .catch(function (error) {
            if (error.response) {
                res({ 
                    error: error.response.data 
                })       
            }
        })
    })
}