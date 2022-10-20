export function log(...content) {
    console.log(...content);
}
export function query(element, selectors) {
    return element.querySelector(selectors);
}
export function queryAll(element, selectors) {
    return element.querySelectorAll(selectors);
}
export function addClass(element, className) {
    return element.classList.add(className);
}
export function removeClass(element, className) {
    return element.classList.remove(className);
}
export function addEl(element, eventType, callBack, bubbleOrCap) {
    return element.addEventListener(eventType, callBack, bubbleOrCap);
}
export function removeEl(element, eventType, callBack, bubbleOrCap) {
    return element.removeEventListener(eventType, callBack, bubbleOrCap);
}
