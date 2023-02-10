import { useEffect } from "react";
import { useQuery } from "urql";
import { STORES_QUERY } from "../../../lib/Queries";

function StoreField(props) {
    const name = props.name
    const htmlId = props.htmlId
    let setStore = props.setStore

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
        let store = stores.find(store => store.id === event.target.value)
        setStore(store)
    }

    let stores = data.stores

    return (
        <div>
            <label htmlFor={name} id={htmlId}>Store</label>
            <select id={htmlId} name={name} className={htmlId} onChange={handleChange}>
                <option hidden> </option>
                {stores.map(store => {
                    return <option key={store.id} value={store.id}>{store.name}</option>
                })}
            </select>
        </div>
    )
}

export default StoreField