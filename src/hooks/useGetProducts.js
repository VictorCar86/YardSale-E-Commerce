import { useEffect, useState } from "react";
import axios from "axios";

function useGetProducts(API){

    const [products, setProducts] = useState([])

    useEffect(() => {
        const callApi = async () => {
            const response = await axios(API)
            setProducts(response.data)
        }
        callApi()
    },[])

    return products
}

export default useGetProducts