import axios from "axios"
import { UserPath } from "../routes/Path";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProfile } from '../redux/slices/userSlice';


const useOtherUsers = (id) => {
    useEffect(() => {
        const fetchOtherUsers = async () => {
            try {
                const response = await axios.get(`${UserPath.otherUsers}/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                });

                const data = await response.data;
                console.log("other users data -> ", data);

            } catch (error) {
                console.log(error);
            }
        }

        fetchOtherUsers();
    }, [id]);
}

export default useOtherUsers