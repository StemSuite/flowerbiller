import { Box, FormLabel, Select } from "@chakra-ui/react";

function VendorField({vendors, selectedVen, changeVen}) {

  function handleChange(event) {
    let venSH = event.target.value
    changeVen(venSH)
  }

  return (
    <Box>
      <FormLabel textAlign="center">Vendor</FormLabel>
      <Select
        size="sm" 
        name="productField"
        minWidth="150px"
        value={selectedVen.shortHand}
        onChange={handleChange}
      >
        <option hidden> </option>
        {vendors.map(vendor => {
          return <option value={vendor.shortHand} key={vendor.id}>{vendor.shortHand}</option>;
        })}

      </Select>
    </Box>
  )
}

export default VendorField
