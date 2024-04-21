import { useState, useEffect, useMemo } from "react";
import axios from "axios";

function useFetchData(url) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    const memoizedData = useMemo(() => data, [data]);

    return { data: memoizedData, loading, error };
}

export default useFetchData;
