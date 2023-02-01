import { useState, useRef } from "react";
import { useMutation } from "urql";
import { ADD_VARIETY_MUTATION } from "../../../lib/Mutations";
import FormModal from "../../shared/modals/FormModal";
import ProductField from "../../shared/InputFields/ProductField";

function NewVarietyForm(closeModal) {
    const [ , addVariety] = useMutation(ADD_VARIETY_MUTATION)

    const [selectedProduct, setProduct] = useState(null)
    const inputProd = useRef(selectedProduct);

    function capitalizeWords(words) {
        return words.split(',').map(str => {
            str = str.toLowerCase().trim()
            str = str[0].toUpperCase() + str.slice(1)
            return str
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
    
        let newVariety = {
            product: selectedProduct.id,
            name: event.target.newVariety.value,
        } 

        if (event.target.colors.value) newVariety.colors = capitalizeWords(event.target.colors.value)
        if (event.target.tags.value) newVariety.tags = capitalizeWords(event.target.tags.value)

        addVariety({variety: newVariety});
        closeModal();
      }

    return (
        <div>
            <ul id="instructions">
                <li>Seperate Colors and Tags by a comma (,) if there are multiple</li>
            </ul>
            <form className="newProduct" onSubmit={handleSubmit}>
                <ProductField inputProd={inputProd} setProduct={setProduct}/>
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

function NewVarietyModal() {
    return (
        <div>
            <FormModal title={"New Variety"} form={NewVarietyForm}/>
        </div>
    )
};

export default NewVarietyModal;