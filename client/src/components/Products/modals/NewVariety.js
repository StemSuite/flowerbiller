import { useState, useRef, useEffect } from "react";
import { useMutation } from "urql";
import { ADD_VARIETY_MUTATION } from "../../../lib/Mutations";
import FormModal from "../../shared/modals/FormModal";
import ProductField from "../../shared/InputFields/ProductField";
import { PRODUCTS_ONLY_QUERY } from "../../../lib/Queries";
import { useQuery } from "urql";

function NewVarietyModal({varieties, setVarieties}) {

    function NewVarietyForm(closeModal) {
        const [products, setProducts] = useState([])
        const [selectedProduct, setProduct] = useState(null)
        const inputProd = useRef(selectedProduct);
        
        const [ , addVariety] = useMutation(ADD_VARIETY_MUTATION)

        const [fetchedProds] = useQuery({
            query: PRODUCTS_ONLY_QUERY
        });

        const { data, fetching, error } = fetchedProds;       
        
        useEffect(() => {
            if (data === undefined) return
            setProducts(data.products)
        }, [data, setProducts])
        
        if (fetching) return "Loading...";
        if (error) return <pre>{error.message}</pre>
        

        function formatWords(words) {
            return words.split(',').map(str => {
                str = str.toLowerCase().trim()
                str = str[0].toUpperCase() + str.slice(1)
                return str
            })
        }

        function handleSubmit(event) {
            event.preventDefault()
        
            let newVariety = {
                name: event.target.newVariety.value,
            } 

            if (event.target.colors.value) newVariety.colors = formatWords(event.target.colors.value)
            if (event.target.tags.value) newVariety.tags = formatWords(event.target.tags.value)

            addVariety({productID: selectedProduct.id, variety: newVariety});
            setVarieties([...varieties].concat( {
                                               product: selectedProduct.name, 
                                               variety: newVariety.name,
                                               colors: newVariety.colors || [],
                                               tags: newVariety.tags || []
                                            }))
            closeModal();
        }

        return (
            <div>
                <ul id="instructions">
                    <li>Seperate Colors and Tags by a comma (,) if there are multiple</li>
                </ul>
                <form className="newProduct" onSubmit={handleSubmit}>
                    <ProductField inputProd={inputProd} products={products} setProduct={setProduct}/>
                    <div>
                        <label htmlFor="newVariety" className="new-variety">New Variety</label>
                        <input type="text" id="new-variety" name="newVariety"></input>
                    </div>
                    <div>
                        <label htmlFor="colors" className="colors-input">Color(s)</label>
                        <input type="text" id="colors-input" name="colors"></input>
                    </div>
                    <div>
                        <label htmlFor="tags" className="tags-input">Tag(s)</label>
                        <input type="text" id="tags-input" name="tags"></input>
                    </div>
                    <input id="submit" type="submit" value="Add" />
                </form>
            </div>
        )

    }


    return (
        <div>
            <FormModal title={"New Variety"} form={NewVarietyForm}/>
        </div>
    )
};

export default NewVarietyModal;