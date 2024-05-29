import axios from "axios"
import { useMutation } from "react-query"

const putUpdatePunch = (data:{userId?: string, punchInTime?: number, punchOutTime?: number, date?: number}) => {
    return axios.put("http://localhost:5000/updatePunch", data)
}

export const usePutUpdatePunch = () => {
    return useMutation(putUpdatePunch);
}
