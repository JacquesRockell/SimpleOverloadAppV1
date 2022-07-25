import axios from "axios"

export async function deleteDay (token, API, planIdex, id) { 
    return new Promise(res => {
        axios.delete((`${API}/user/plans/${planIdex}/days/${id}`),
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