import axios from "axios";
import { useEffect, useState } from "react";
import { getUsername } from "../Helper/helper";

axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_SERVER_DOMAIN; 


/** custom hook */
export default function useFetch(query){
    const [getData, setData] = useState({ isLoading : false, apiData: undefined, status: null, serverError: null })

    useEffect(() => {

        const fetchData = async () => {
            try {
                setData(prev => ({ ...prev, isLoading: true}));

                const { username } = !query ? await getUsername() : '';
                console.log('Username:', username); // Log the username value

                const url = !query ? `/api/user/${username}` : `/api/${query}`;
                
                if(status === 201){
                    setData(prev => ({ ...prev, isLoading: false}));
                    setData(prev => ({ ...prev, apiData : data, status: status }));
                }

                setData(prev => ({ ...prev, isLoading: false}));
            } catch (error) {
                setData(prev => ({ ...prev, isLoading: false, serverError: error }))
            }
        };
        fetchData()

    }, [query]);

    return [getData, setData];
}