import { Box, FormLabel, Select } from "@chakra-ui/react";

function VarietyField({product, setVariety}) {
  
    let varieties = product.varieties || []

    if (varieties.length > 1) varieties = varieties.sort((a, b) => a.name.localeCompare(b.name))
 
    return (
    <Box minWidth="150px" >
        <FormLabel textAlign="center">Variety</FormLabel>
        <Select 
            size="sm" 
            name="varietyField"
            onChange={(e) => {setVariety(e.target.value)}}
            >
            <option hidden> </option>
            {varieties.map((variety, i) => {
                return <option key={i}>{variety.name}</option>;
            })}
        </Select>
    </Box>
    )
}

export default VarietyField;
