import { Box, FormLabel, Select } from "@chakra-ui/react";

function BoxTypeField({value, setBoxType}) {
  let boxes = ['QB', 'HB']
  
  return (
    <Box minWidth="fit-content">
      <FormLabel textAlign="block" >Box Type</FormLabel>
      <Select 
        size="sm" 
        name="boxField"
        value={value}
        onChange={(e) => setBoxType(e.target.value)}
      >
        <option hidden> </option>
        {boxes.map((box, i) => {
          return <option value={box} key={i}>{box}</option>;
        })}
      </Select>
    </Box>
  )
}

export default BoxTypeField;
