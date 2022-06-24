import axios from "axios"

export async function addSet (token, API, PI, DI, amount, data) {  
    return new Promise(res => {
        axios.post((API + `/user/plan/${PI}/day/${DI}/addSet/${amount}`), 
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