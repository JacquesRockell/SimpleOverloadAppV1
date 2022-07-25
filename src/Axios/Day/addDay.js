import axios from "axios"

export async function addDay (token, API, planIndex, data) {  
    return new Promise(res => {
        axios.post((`${API}/user/plans/${planIndex}/days`), 
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