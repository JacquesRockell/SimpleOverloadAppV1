import axios from "axios"

export async function renamePlan (token, API, index, title) { 
    return new Promise(res => {
        axios.post((API + '/user/renamePlan/' + index),
            {title: title},
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