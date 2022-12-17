export interface Book {
    id: string;
    title: string;
    author: string;
    genere: string;
    year: number | undefined;
    totalQuantity: number | undefined;
    availableQuantity: number | undefined;
    image: string;
}