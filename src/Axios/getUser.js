import axios from "axios"

export async function getUser (token, API) {  
    return new Promise(res => {
        axios.get((API + '/user/profile'), 
            { headers: { 'auth-token': token } },          
        )
        .then(response => {
            res({ 
                user: response.data 
            })
        })
        .catch(error => {
            let message = error.response ? error.response.data : null
            res({ 
                error: error,
                message: message
            })       
        })
    })
}