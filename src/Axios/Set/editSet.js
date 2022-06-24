import axios from "axios"

export async function editSet (token, API, planIndex, dayIndex, setId, data) {  
    return new Promise(res => {
        axios.put((`${API}/user/plans/${planIndex}/days/${dayIndex}/sets/${setId}`),
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