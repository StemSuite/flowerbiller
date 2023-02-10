import { Box, HStack, FormLabel, Text, NumberInput, NumberInputField } from "@chakra-ui/react";

function QuantityField({uom, label, name, value, setValue}) {
 

  function uomDisplay() {
    if (uom) return <Text id="prod-uom">{uom}</Text>
  }

  return (
    <Box id="quantity-field">
      <FormLabel htmlFor={name} textAlign="center">{label}</FormLabel>
      <HStack>
        <NumberInput 
          size="sm" 
          name={name} 
          placeholder="0"
          minW="70px"
          maxW="90px"
          value={value}
          onChange={(value) => setValue(value)}
        >
        <NumberInputField />
        </NumberInput>
        {uomDisplay()}
      </HStack>
    </Box>
  )
}

export default QuantityField;
