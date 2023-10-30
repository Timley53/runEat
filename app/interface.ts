

export interface AppContextType {
    expand: string;
    // setExpand:
}

export interface Cartprops{
    showCart: boolean;
    setShowCart:React.Dispatch<React.SetStateAction<boolean>>;
}

export interface InitialStateType {
    cart: CartType[] | [];
    productQuantity: number,
    favorite: favoriteType[] | []
}

export interface favoriteType {
    title: string,
    img: string,
    price: number,
    id: string,

}

export interface CartType {
    id: string,
    quantity: number;
    img:string,
    price: number,
    title: string;
}
export interface newCartType {
    id: string,
    quantity: number,
    img:string,
    price: number,
    title:string

}
export interface uiInitialState {
    pizza: boolean;
    burger: boolean;
    desert: boolean;
}

export interface pizzaType {
    description: string;
    id: number,
    img: string,
    name: string,
    price: number,
    quantity: 1,
    veg: boolean,
    sizeandcrust?: any
}

export interface pizzaRecipeType {
    id: string,
    image_url: string,
    pubisher: string,
    title: string
}

export interface pricedDataType {
    id: string,
    image_url: string,
    pubisher: string,
    title: string,
    price: number,
    quantity: number,
    favorite: boolean
}