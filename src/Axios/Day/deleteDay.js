import axios from "axios"

export async function deleteDay (token, API, PI, DI) { 
    return new Promise(res => {
        axios.post((API + `/user/plan/${PI}/deleteDay/${DI}`),
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