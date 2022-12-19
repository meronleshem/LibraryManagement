import { createContext, useContext } from "react";
import BookStore from "./bookStore";
import CommonStore from "./CommonStore";
import ModalStore from "./modalStore";
import UserStore from "./userStore";

interface Store {
    bookStore: BookStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
}

export const store: Store = {
    bookStore: new BookStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}