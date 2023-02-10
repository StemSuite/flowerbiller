import { Box, FormLabel, Select } from "@chakra-ui/react";

function LengthField({validSizes, setSize}) {
  validSizes = validSizes || [];

  return (
    <Box minWidth="75px">
      <FormLabel textAlign="center">Size</FormLabel>
      <Select 
        size="sm" 
        name="sizeField"
        onChange={(e) => setSize(e.target.value)}
        >
        <option hidden> </option>
        {validSizes.map((len, i) => {
          return <option value={len} key={i}>{len}</option>;
        })}
      </Select>
    </Box>
  )
}

export default LengthField
