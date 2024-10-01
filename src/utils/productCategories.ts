import { DispatcherStore } from "../context/reduxState";
import { resetCurrentModal } from "../context/sliceModalsState";

export enum AvailableCategories {
    "ALL" = "",
    "CLOTHES" = "clothes",
    "ELECTRONICS" = "electronics",
    "TOYS" = "toys",
    "SPORTS" = "sports",
    "BOOKS" = "books",
    "OTHERS" = "others",
    "FURNITURES" = "furnitures",
};

export type CategoriesKey = keyof typeof AvailableCategories;
export type CategoriesValue = `${AvailableCategories}`;

export function changeCategory(search: string = "", dispatcher: DispatcherStore) {
    if (location.href.split("/").at(-1) === search) {
        return;
    }
    if (typeof search === "string" && search !== "") {
        search = `?category=${search}`;
    } else {
        search = "";
    }
    location.href = `${location.origin}/${search}`;
    dispatcher(resetCurrentModal());
}