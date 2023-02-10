import { Box, FormLabel, Select } from "@chakra-ui/react";

function ProductField({inputProd, products, value, changeProduct}) {

  function handleChange(event) {
    let productName = event.target.value
    changeProduct(productName)
	}

  return (
    <Box>
      <FormLabel textAlign="center">Product</FormLabel>
      <Select 
        size="sm" 
        ref={inputProd} 
        name="productField"
        minWidth="150px"
        value={value}
        onChange={handleChange}>
      <option hidden> </option>
        {products.map(prod => {
          return <option value={prod.name} key={prod.id}>{prod.name}</option>;
        })}
      </Select>
    </Box>
  )
}

export default ProductField;
