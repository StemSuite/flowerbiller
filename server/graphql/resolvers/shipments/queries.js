import StandingOrder from "../../../models/standing_order.js";
import ShippingMethod from "../../../models/shipping_method.js";
import moment from "moment";

async function standingOrdersByDates (startDate, endDate) {
    startDate = new Date(startDate)
    endDate = new Date(endDate)

    return StandingOrder.aggregate(
        [
            { $match: { startDate: {$lte: startDate }, endDate: { $gte: endDate } } },
            { $group: { "_id": {
                                "shippingDay": "$shippingDay",
                                "shippingMethod": "$shippingMethod"
                            }, 
                        "itemCount": {
                                "$sum": {"$size": "$items"}
                            }
                    }
            },
            { $lookup: {
                    "from": ShippingMethod.collection.name,
                    "localField": "_id.shippingMethod",
                    "foreignField": "_id",
                    "as": "shippingMethod"
                }
            },
            { $project: {
                "itemCount": "$itemCount",
                "shipSH": {$first: "$shippingMethod.shortHand"},
                "daysToArrive": {$first: "$shippingMethod.daysToArrive"},
                "shippingDay": "$_id.shippingDay"
            }}
        ])
        .then(results => {
            const shipments = []

            results.forEach(res => {
                let shipDate = moment(startDate)
                let lastShipDate = moment(endDate)
                
                while (shipDate.day() !== res.shippingDay) {
                    shipDate.add(1, 'days')
                }

                while (shipDate <= lastShipDate) {
                    shipments.push({
                        itemCount: res.itemCount,
                        shipSH: res.shipSH,
                        shippingDate: moment(shipDate).format("MM/DD/YY"),
                        arrivalDate: moment(shipDate).add(res.daysToArrive, 'days').format("MM/DD/YY"),
                    })
                    shipDate.add(7, 'days')
                }
            })

            return shipments
        })
}

const shipmentQueries = {

    shipmentsByDates: async (_, {startDate, endDate}) => {
        standingOrdersByDates(startDate, endDate)
    },
}

export default shipmentQueries