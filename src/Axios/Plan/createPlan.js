import axios from "axios"

export async function createPlan (token, API, data) {  
    return new Promise(res => {
        axios.post((API + '/user/createPlan'), 
            data,
            {
                headers: {'auth-token': token}
            }
        )
        .then(function (response) {
            res(true)
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