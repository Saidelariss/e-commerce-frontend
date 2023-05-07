export interface Product {
    id : number;
    name : string;
    price : number;
    promotion : boolean
}

export interface  PageProduct{
    products : Product[];
    page : number;
    size : number;
    totalPages : number;
}
