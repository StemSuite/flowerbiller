import { useState } from "react";
import { useMutation } from "urql";
import { ADD_PRODUCT_MUTATION } from "../../../lib/Mutations";
import FormModal from "../../shared/modals/FormModal";
import ProductTypesField from "../../shared/InputFields/ProductTypeField";
import UOMsField from "../../shared/InputFields/UOMsField";

function NewProductForm(closeModal) {
    const [ , addProduct] = useMutation(ADD_PRODUCT_MUTATION)

    const [selectedType, setType] = useState(null)
    const [UOMs, setUOMs] = useState([])

    function formatSizes(sizes) {
        return sizes.split(',').map(size => size.trim())
    }


    function handleSubmit(event) {
        event.preventDefault()
    
        let newProduct = {
            type: selectedType.id,
            name: event.target.newProduct.value,
            uom: event.target.uomField.value,
        }

        if (event.target.sizesField.value) newProduct.sizes = formatSizes(event.target.sizesField.value)

        addProduct({product: newProduct});
        closeModal();
      }

    return (
        <div>
            <ul id="instructions">
                <li>Seperate Sizes by a comma (,) if there are multiple</li>
            </ul>
            <form className="newProduct" onSubmit={handleSubmit}>
                <ProductTypesField setType={setType} setUOMs={setUOMs}/>
                <div>
                    <label htmlFor="newProduct" className="new-product">New Product</label>
                    <input type="text" id="new-product" name="newProduct"></input>
                </div>
                <UOMsField UOMs={UOMs}/>
                <div>
                    <label htmlFor="sizesField" className="sizes-input">Size(s)</label>
                    <input type="text" id="sizes-input" name="sizesField"></input>
                </div>
                <input id="submit" type="submit" value="Add" />
            </form>
        </div>
      )

}

function NewProductModal() {
    return (
        <div>
            <FormModal title={"New Product"} form={NewProductForm}/>
        </div>
    )
};

export default NewProductModal;