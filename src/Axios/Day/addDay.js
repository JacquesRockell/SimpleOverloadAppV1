import axios from "axios"

export async function addDay (token, API, index, data) {  
    return new Promise(res => {
        axios.post((API + `/user/plan/${index}/addDay`), 
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