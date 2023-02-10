import { useState } from "react";
import { useMutation } from "urql";
import { ADD_PRODUCT_MUTATION } from "../../lib/Mutations";
import FormModal from "./StandardModal";
import ProductTypesField from "../forms/Fields/ProductTypeField";
import UOMsField from "../forms/Fields/UOMsField";
import DaysToExpField from "../forms/Fields/DaysToExpField";

function NewProductForm(closeModal) {
    const [ , addProduct] = useMutation(ADD_PRODUCT_MUTATION)

    const [selectedType, setType] = useState(null)
    const [UOMs, setUOMs] = useState([])
    const [expDays, setExpDays] = useState(null)

    function formatSizes(sizes) {
        return sizes.split(',').map(size => size.trim())
    }


    function handleSubmit(event) {
        event.preventDefault()
    
        let newProduct = {
            type: selectedType.id,
            name: event.target.newProduct.value,
            uom: event.target.uomField.value,
            daysToExp: Number(event.target.expField.value)
        }

        if (event.target.sizesField.value) newProduct.sizes = formatSizes(event.target.sizesField.value)

        addProduct({product: newProduct});
        closeModal();
      }

    return (
        <div>
            <ul id="instructions">
                <li>Seperate Sizes by a comma (,) if there are multiple</li>
                <li>Products will automatically be removed from inentory the # of days after thier arrival specified by 'Days to Expiration'</li>
                <li>For the product to never expire delete any number in 'Days to Expiration' and leave it blank</li>
            </ul>
            <form className="newProduct" onSubmit={handleSubmit}>
                <ProductTypesField setType={setType} setUOMs={setUOMs} setExpDays={setExpDays}/>
                <div>
                    <label htmlFor="newProduct" className="new-product">New Product</label>
                    <input type="text" id="new-product" name="newProduct"></input>
                </div>
                <UOMsField UOMs={UOMs}/>
                <div>
                    <label htmlFor="sizesField" className="sizes-input">Size(s)</label>
                    <input type="text" id="sizes-input" name="sizesField"></input>
                </div>
                <DaysToExpField label={"Days to Expiration"} defaultDays={expDays}/>
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