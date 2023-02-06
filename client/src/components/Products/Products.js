import { useState } from "react";
import NewProductModal from "./modals/NewProduct";
import NewVarietyModal from "./modals/NewVariety";
import VarietiesList from "./VarietiesList";

function Products() {
    const [varieties, setVarieties] = useState([])
    return (
        <div>
            <h2>Products</h2>
            <div className="modalButtons">
                <NewProductModal/>
                <NewVarietyModal varieties={varieties} setVarieties={setVarieties}/>
            </div>
            <VarietiesList varieties={varieties} setVarieties={setVarieties}/>
        </div>
    )
}

export default Products