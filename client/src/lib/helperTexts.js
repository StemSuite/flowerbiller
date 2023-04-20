
export const PER_BOX_CHARGE_HELPER = <div>*Adjusting the per box charge will adjust the per box charge for every item in this 
shipment and update the total shipping cost</div>;

export const SURCHARGE_HELPER = 
`*The Surcharge is calculated by CBF. It should be equal to all of the shipping charges not 
explicitly assigned by a Box Charge. Surcharge is distributed between boxes 
based on their CBF to calculate the shipping cost for each box. \n
(Total Shipping Cost - (Per Box Charge * Box Count) = Surcharge)`;
