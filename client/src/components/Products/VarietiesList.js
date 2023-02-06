import { useEffect } from "react";
import { useQuery } from "urql"
import { VARIETIES_QUERY } from "../../lib/Queries"

function VarietiesList({varieties, setVarieties}) {

    let headers = ['Product', 'Variety', 'Colors', 'Tags']

    const [fetchedVarieties] = useQuery({
        query: VARIETIES_QUERY
    })

    const { data, fetching, error } = fetchedVarieties;

    useEffect(() => {
        if (data === undefined) return
        setVarieties(data.varieties)
    }, [data, setVarieties])

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
        return varieties.map((variety, i) =>  {
            return <tr key={i}>
                <td>{variety.product}</td>
                <td>{variety.variety}</td>
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