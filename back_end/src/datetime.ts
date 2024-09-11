export function getCurrentYear() {
    return new Date().getFullYear();
}

export function getStartOfTheYear(year:any) {
    return `${year}-01-01 00:00:00`;
}

export function getEndOfTheYear(year:any) {
    return `${year}-12-31 23:59:59`;
}