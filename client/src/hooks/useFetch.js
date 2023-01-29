import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url) => {
 const [data, setData] = useState(null);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(url);
                const data = await res.data;
                setData(data);
            } catch (err) {
                setError(err);
            }
            setLoading(false);
        };
        fetchData();
    }, [url]);
    const reFetchData = async () => {
        setLoading(false);
        try {
            const res = await axios.get(url);
            const data = await res.data;
            setData(data);
        } catch (err) {
            setError(err);
        }
        setLoading(false);
    };

    return { data, loading, error, reFetchData };
};

export default useFetch;


//  useEffect(() => {
//     const fetchData = async () => {
//       try {
//          const res = await fetch("http://localhost:8800/api/hotels");
//          const data = await res.json();
//          setData(data);
//          setLoading(false);
//       } catch (error) {
//          setError(error);
//          setLoading(false);
//       }
//     };
//     fetchData();
//  }, [url]);
