export class Product {
    id: string;
    createdAt: Date;
    name: string;
    image: URL;
    price: number;
    type: string;
    publish_from: Date;
    publish_to: Date;
    constructor() { }
}