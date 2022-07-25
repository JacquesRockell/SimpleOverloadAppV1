import axios from "axios"

export async function deletePlan (token, API, planIndex) { 
    return new Promise(res => {
        axios.delete((`${API}/user/plans/${planIndex}`),
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