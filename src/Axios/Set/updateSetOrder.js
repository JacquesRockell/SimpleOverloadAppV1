import axios from "axios"

export async function updateSetOrder (token, API, planIndex, dayIndex, sourceIndex, destinationIndex) {  
    return new Promise(res => {
        axios.put((API + `/user/plans/${planIndex}/days/${dayIndex}/reorderSets`),
            {
                sourceIndex: sourceIndex,
                destinationIndex: destinationIndex
            },
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