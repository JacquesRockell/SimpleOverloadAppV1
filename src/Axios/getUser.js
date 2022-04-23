import axios from "axios"

export async function getUser (token, API) {  
    return new Promise(res => {
        axios.get((API + '/user/profile'), {
            headers: {
                'auth-token': token
            }
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