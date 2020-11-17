import { User } from './../models/user.model';
import { Item } from './../models/useritem/item.model';

import {Op, where} from 'sequelize';


export class TransactionHandler {
    public processTransactions(): void {
        Item.findAll({where: {'processed' : 0}})
        .then(found => {
            if (found != null) {
                found.map(value => {
                    User.findByPk(value.userId)
                    .then(ufound => {
                        ufound.update({wallet: +ufound.wallet + (+value.price * +0.00010219254 * +1.2)});
                        value.update({processed: 1});
                    })
                    .catch(err => console.log(err));

                });
            } else {
                console.log(found);
            }
        })
        .catch(err => console.log(err));

    }


}
