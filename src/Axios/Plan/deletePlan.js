import axios from "axios"

export async function deletePlan (token, API, index) { 
    return new Promise(res => {
        axios.post((API + '/user/deletePlan/' + index),
            {},
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