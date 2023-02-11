import { Flex, Heading } from "@chakra-ui/react";
import { useState } from "react";
import AddProductForm from "../components/forms/AddProductForm";
import AddVarietyForm from "../components/forms/AddVarietyForm";
import VarietiesList from "../components/tables/VarietiesList";
import { pageHeaderStyle } from "../styles/styles";

function Products() {
    const [varieties, setVarieties] = useState([])
    return (
        <div>
            <Heading sx={pageHeaderStyle}>Products</Heading>
            <Flex>
                <AddProductForm/>
                <AddVarietyForm/>
            </Flex>
            <VarietiesList varieties={varieties} setVarieties={setVarieties}/>
        </div>
    )
}

export default Products