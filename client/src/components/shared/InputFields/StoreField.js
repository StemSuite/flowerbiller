import { useEffect } from "react";
import { useQuery } from "urql";
import { STORES_QUERY } from "../../../lib/Queries";

function StoreField(props) {
    const name = props.name
    const htmlId = props.htmlId

    const [fetchedStores] = useQuery({
        query: STORES_QUERY
    });

    const { data, fetching, error } = fetchedStores;

    useEffect(() => {
        if (data === undefined) return 
    }, [data])

    if (fetching) return "Loading...";
    if (error) return <pre>{error.message}</pre>

    return (
        <div>
            <label htmlFor={name} id={htmlId}>Store</label>
            <select id={htmlId} name={name} className={htmlId}>
                <option hidden> </option>
                {data.stores.map(store => {
                    return <option key={store.id} value={store.id}>{store.name}</option>
                })}
            </select>
        </div>
    )
}

export default StoreField