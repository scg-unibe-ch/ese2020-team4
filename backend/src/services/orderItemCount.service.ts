import { Item } from '../models/useritem/item.model';
import { Order } from '../models/order.model';


export class OrderItemCount {

    public getOrderItemCount(oid: any): void {
        let count = 0;
        Item.findAll({where: {'orderId' : oid}})
        .then(found => {
            if (found != null) {
                found.forEach(element => {
                    count += 1;
                });
            } else {
                count = 0;
            }
            Order.findByPk(oid).then(found2 => {
                found2.update({count : count});
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));



    }


}
