import { createContext, useContext } from "react";
import BookStore from "./bookStore";
import CommonStore from "./CommonStore";

interface Store {
    bookStore: BookStore;
    commonStore: CommonStore;
}

export const store: Store = {
    bookStore: new BookStore(),
    commonStore: new CommonStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}