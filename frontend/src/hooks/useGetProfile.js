import axios from "axios"
import { UserPath } from "../routes/Path";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProfile } from '../redux/slices/userSlice';

const useGetProfile = (id) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/api/v1/users/profile/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                });
                console.log("response", response);
                const data = await response.data;
                console.log("PROFILE -> ", data);
                dispatch(getProfile(data?.user));

            } catch (error) {
                console.log(error);
            }
        }

        fetchUserProfile();
    }, [id]);
}

export default useGetProfile;
