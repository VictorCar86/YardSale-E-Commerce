/**
 * Returns the number of items to display per page.
 * @return {number} the number of items per page (20 for wide screens, 10 for narrow screens)
 */
export function itemsPerPage(): 20 | 10 {
    return window.innerWidth > 768 ? 20 : 10;
}