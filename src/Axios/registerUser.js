import axios from "axios"

export async function registerUser(API, values){
    return new Promise(res => {
        axios.post((API + '/auth/register'), {
            "username": values.username,
            "password": values.password
        })
        .then(function (response) {
            res({ 
                user: response.data 
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