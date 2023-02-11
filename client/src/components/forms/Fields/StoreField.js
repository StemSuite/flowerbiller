import { Box, FormLabel, Select } from "@chakra-ui/react";
import { useEffect } from "react";
import { useQuery } from "urql";
import { STORES_QUERY } from "../../../lib/Queries";

function StoreField({setStore}) {

    const [fetchedStores] = useQuery({
        query: STORES_QUERY
    });

    const { data, fetching, error } = fetchedStores;

    useEffect(() => {
        if (data === undefined) return 
    }, [data])

    if (fetching) return "Loading...";
    if (error) return <pre>{error.message}</pre>

    function handleChange(event) {
        let store =  event.target.value
        setStore(store)
    }

    let stores = data.stores

    return (
        <Box>
            <FormLabel textAlign="center">Store</FormLabel>
            <Select
                size="sm" 
                name="productField"
                minWidth="150px"
                onChange={handleChange}
            >
                <option hidden> </option>
                {stores.map(store => {
                    return <option key={store.id} value={store.name}>{store.name}</option>
                })}
            </Select>
        </Box>
    )
}

export default StoreField