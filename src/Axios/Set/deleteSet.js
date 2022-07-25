import axios from "axios"

export async function deleteSet (token, API, planIndex, dayIndex, id) {  
    return new Promise(res => {
        axios.delete((API + `/user/plans/${planIndex}/days/${dayIndex}/sets/${id}`),
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