import axios from "axios"

export async function deleteSet (token, API, PI, DI, id) {  
    return new Promise(res => {
        axios.post((API + `/user/plan/${PI}/day/${DI}/deleteSet/${id}`),{},
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