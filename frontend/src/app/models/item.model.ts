
export interface Item {
    itemId: number;
    orderId: number;
    soldToId: number;
    productType: string;
    title: string;
    transactionType: string;
    description: string;
    pictureId: number;
    location: string;
    status: string;
    delivery: boolean;
    userReviews: number;
    price: number;
    priceModel: string;
    approvedFlag: boolean;
}

