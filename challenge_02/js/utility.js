// Add to localStorage Manager
export function addToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Get Data from localStorage Manager
export function getDataFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

// Select one element
export function getElementId(elementId) {
    return document.querySelector(elementId);
}

// Select multiple elements
export function getElementAllIds(elementId) {
    return document.querySelectorAll(elementId);
}

// Add click and touchend events
export function bindEvent(elementId, callEvent) {
    const elemId = getElementId(elementId);
    elemId.addEventListener("touchend", e => {
        e.preventDefault();
        callEvent();
    });
    
    elemId.addEventListener("click", e => {
        e.preventDefault();
        callEvent();
    });
}

// Add change events
export function bindChangeEvent(elementId, callEvent) {
    const elemId = getElementId(elementId);
    elemId.addEventListener('change', () => {
        callEvent();
    });
}