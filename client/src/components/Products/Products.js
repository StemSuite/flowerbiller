import NewProductModal from "./modals/NewProduct";
import NewVarietyModal from "./modals/NewVariety";
import VarietiesList from "./VarietiesList";

function Products() {

    return (
        <div>
            <h2>Products</h2>
            <div className="modalButtons">
                <NewProductModal/>
                <NewVarietyModal/>
            </div>
            <VarietiesList />
        </div>
    )
}

export default Products