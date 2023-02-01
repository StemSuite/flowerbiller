import { useEffect } from "react";
import { useQuery } from "urql"
import { VARIETIES_QUERY } from "../../lib/Queries"

function VarietiesList() {

    let headers = ['Type', 'Product', 'Variety', 'Colors', 'Tags']

    const [fetchedVarieties] = useQuery({
        query: VARIETIES_QUERY
    })

    const { data, fetching, error } = fetchedVarieties;

    useEffect(() => {
        if (data === undefined) return 
    }, [data])

    if (fetching) return "Loading...";
    if (error) return <pre>{error.message}</pre>

    function Headers() {
        return <tr>
            {headers.map((header, i) => {
                return <th className="sort-header" key={i} >{header}</th>
            })}
        </tr>
    }

    function Varieties() {
        return data.varieties.map(variety =>  {
            return <tr key={variety.id}>
                <td>{variety.product.type.name}</td>
                <td>{variety.product.name}</td>
                <td>{variety.name}</td>
                <td>{variety.colors.map((color, i) => {
                    return <span key={i}>{variety.colors[i+1] ? `${color}, ` : color}</span>
                })}</td>
                <td>{variety.tags.map((tag, i) => {
                    return <span key={i}>{variety.tags[i+1] ? `${tag}, ` : tag}</span>
                })}</td>
            </tr>
        })
    }

    return (
        <table id="product-table">
            <thead>
                <Headers/>
            </thead>
            <tbody>
                <Varieties/>
            </tbody>
        </table>
    )
}

export default VarietiesList