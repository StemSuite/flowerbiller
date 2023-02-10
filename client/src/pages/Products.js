import { Flex, Heading } from "@chakra-ui/react";
import { useState } from "react";
import NewProductModal from "../components/modals/NewProduct";
import NewVarietyModal from "../components/modals/NewVariety";
import VarietiesList from "../components/tables/VarietiesList";
import { pageHeaderStyle } from "../styles/styles";

function Products() {
    const [varieties, setVarieties] = useState([])
    return (
        <div>
            <Heading sx={pageHeaderStyle}>Products</Heading>
            <Flex>
                <NewProductModal/>
                <NewVarietyModal varieties={varieties} setVarieties={setVarieties}/>
            </Flex>
            <VarietiesList varieties={varieties} setVarieties={setVarieties}/>
        </div>
    )
}

export default Products