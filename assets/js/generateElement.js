export function generateElement(tag, content, section, className) {
    let element = document.createElement(tag);
    element.innerText = content;
    if(className) element.classList.add(className);
    section.appendChild(element)
}

export function createDiv(section, className){
    let div = document.createElement("div")
    if(className) div.classList.add(className)
    section.appendChild(div)
}

export function resetHTML(tag) {
    let section = document.querySelector(tag);
    section.innerHTML="";
}

export function generateImg(src, alt, section, className) {
    let img = document.createElement("img")
    img.src = src
    img.setAttribute("alt", alt)
    if(className) img.classList.add(className)
    section.appendChild(img)
}