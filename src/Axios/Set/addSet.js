import axios from "axios"

export async function addSet (token, API, planIndex, dayIndex, amount, data) {  
    return new Promise(res => {
        axios.post((`${API}/user/plans/${planIndex}/days/${dayIndex}/add/${amount}`), 
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