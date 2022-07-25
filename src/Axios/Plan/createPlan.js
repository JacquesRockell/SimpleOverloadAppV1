import axios from "axios"

export async function createPlan (token, API, data) {  
    return new Promise(res => {
        axios.post((`${API}/user/plans`), 
            data,
            {
                headers: {'auth-token': token}
            }
        )
        .then(function (response) {
            res(response)
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