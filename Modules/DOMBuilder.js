export function DOMBuilder() {

    const deleteAllChildren = (DIV) => {
        while (DIV.hasChildNodes()) {
            DIV.removeChild(DIV.firstChild)
        }
    }
    const buildElement = (type, class_name) => {
        const element = document.createElement(type)
        element.className = class_name
        return element
    }
    const buildElementInnerContent = (type, class_name, inner) => {
        const element = document.createElement(type)
        element.className = class_name
        element.innerHTML = inner
        return element
    }
    const buildElementAttribute = (type, class_name, attribute, info) => {
        const element = document.createElement(type)
        element.className = class_name
        element.setAttribute(attribute, info)
        return element
    }
  
    return { deleteAllChildren, buildElement , buildElementInnerContent, buildElementAttribute }
}