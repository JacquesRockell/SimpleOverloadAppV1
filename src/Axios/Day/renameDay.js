import axios from "axios"

export async function renameDay (token, API, PI, DI, name) { 
    return new Promise(res => {
        axios.post((API + `/user/plan/${PI}/renameDay/${DI}`),
            {name: name},
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