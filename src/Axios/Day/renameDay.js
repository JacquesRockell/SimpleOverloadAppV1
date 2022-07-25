import axios from "axios"

export async function renameDay (token, API, planIndex, id, name) { 
    return new Promise(res => {
        axios.put((`${API}/user/plans/${planIndex}/days/${id}`),
            { name: name },
            { headers: { 'auth-token': token } }
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