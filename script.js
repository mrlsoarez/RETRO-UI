/// CLASSES

import { DOMBuilder } from "./MODULES/DOMBuilder.js"
import { getPageRelation } from './MODULES/PageRelation.js'
import { Window } from './MODULES/Classes.js'
/// ********************************************

// SEGUNDA RELAÇÃO COM AS INFO DE CADA WINDOW
const OPEN_WINDOWS = []
const WINDOW_RELATION = getPageRelation()

function DOMInteraction() {

    const MENU_BUTTONS = document.querySelectorAll('.Functional')
    
    OpenNewWindow(MENU_BUTTONS)
}

function OpenNewWindow(Buttons) {
    for (let i = 0; i < Buttons.length; i++) {
        Buttons[i].addEventListener('click', () => {
            if (Buttons[i].className.includes('Open')) {
                return
            }
            const window = new Window()
            for (let key_name in window.FUNCTIONAL) {
                for (let obj in WINDOW_RELATION[i]) {
                    if (key_name == Buttons[i].id && key_name == obj) {
                        const NEW_OPEN_WINDOW = new window.FUNCTIONAL[key_name](obj, WINDOW_RELATION[i][obj].width, WINDOW_RELATION[i][obj].height, WINDOW_RELATION[i][obj].icon, WINDOW_RELATION[i][obj].iframe)
                        OPEN_WINDOWS.push(NEW_OPEN_WINDOW)
                        renderOpenWindows(OPEN_WINDOWS)
                        Buttons[i].classList.add('Open')
                    }
                }
            }
        })
    }
}

function renderOpenWindows(windows) {

    const DOM = DOMBuilder()

    function Header(title, icon_url) {

        const HEADER = DOM.buildElement('div', 'Header')

        function buildTitle() {
            const TITLE_CONTAINER = DOM.buildElement('div', 'Title')
            const text = DOM.buildElementInnerContent('span', 'Title-Inner', title)
            const icon = DOM.buildElementAttribute('img', 'App-Icon', 'src', icon_url)
            TITLE_CONTAINER.append(icon, text)   
            return TITLE_CONTAINER 
        }

        function buildButtons() {

            const BUTTON_CONTAINER = DOM.buildElement('div', 'Buttons')

            for (let i = 0; i < 3; i++) {
                if (i == 0) { var btn = DOM.buildElementInnerContent('button', 'Less', '-')}
                if (i == 1) { var btn = DOM.buildElementInnerContent('button', 'Full', 'O')}
                if (i == 2) { var btn = DOM.buildElementInnerContent('button', 'Close', 'X')}
                BUTTON_CONTAINER.append(btn)
            }

            return BUTTON_CONTAINER
        }

        HEADER.append(buildTitle(), buildButtons())
        return HEADER
    }

    function Content(iframe_link) {
        const CONTENT = DOM.buildElement('div', 'Content') 

        function buildInnerContent() {
            const iframe = DOM.buildElementAttribute('object', 'Inner', 'data', iframe_link)
            return iframe
        }

        CONTENT.append(buildInnerContent())
        return CONTENT
    }

    function TaskBar(Window) {

        const APP = DOM.buildElement('div', 'App')
        const img = DOM.buildElementAttribute('img', 'Taskbar-Image', 'img', Window.icon)
        const span = DOM.buildElementInnerContent('span', 'Taskbar-Title', Window.title)

        APP.append(img, span)
        return APP
    }

    function Container(Window) {

        const CONTAINER = DOM.buildElement('div', 'Window')

        function DefineWindowStyle() {
            CONTAINER.style.width = Window.width 
            CONTAINER.style.height = Window.height 
            CONTAINER.style.left = Window.getPosition().X
            CONTAINER.style.top = Window.getPosition().Y 
        }

        const header = Header(Window.title, Window.icon)
        const content = Content(Window.iframe)

        DefineWindowStyle()

        CONTAINER.append(header, content)
        return CONTAINER
    }


    const DESKTOP = document.querySelector('.Desktop')
    const TASKBAR = document.querySelector('.Taskbar')

    DOM.deleteAllChildren(DESKTOP)
    DOM.deleteAllChildren(TASKBAR)

    for (let index in windows) {
        let container = Container(windows[index])
        let task = TaskBar(windows[index])
        DESKTOP.append(container)
        TASKBAR.append(task)
    }

    moveWindow()


}

function moveWindow() {

    function getOffsetRight(desktop, window, left) {
        return desktop - (window + left)
    }

    function getOffsetTop(desktop, window, top) {
        console.log(desktop, window, top)
        return desktop - (window + top)
    }

    const DESKTOP = document.querySelector('main')
    const HEADERS = document.querySelectorAll('.Header')
    const WINDOWS = document.querySelectorAll('.Window')

    const POSITIONS = { X: '', Y: '' }

    for (let i = 0; i < HEADERS.length; i++) {
        HEADERS[i].addEventListener('mousedown', (e) => {

            const left = WINDOWS[i].offsetLeft
            const top = WINDOWS[i].offsetTop

            POSITIONS.X = e.clientX
            POSITIONS.Y = e.clientY

            function startMoving(e) {
                const right = getOffsetRight(DESKTOP.offsetWidth, WINDOWS[i].offsetWidth, WINDOWS[i].offsetLeft)
                const bottom = getOffsetTop(DESKTOP.offsetHeight, WINDOWS[i].offsetHeight, WINDOWS[i].offsetTop)
                WINDOWS[i].style.cursor = 'move'
                WINDOWS[i].style.left = OPEN_WINDOWS[i].moveX(left, right, e.clientX - POSITIONS.X)
                WINDOWS[i].style.top = OPEN_WINDOWS[i].moveY(top, bottom, e.clientY - POSITIONS.Y)

            }

            function stopMoving() {
                document.removeEventListener('mousemove', startMoving)
                WINDOWS[i].style.cursor = 'default'
                OPEN_WINDOWS[i].setPosition(WINDOWS[i].offsetLeft, WINDOWS[i].offsetTop)
            }

            document.addEventListener('mousemove', startMoving)
            document.addEventListener('mouseup', stopMoving)
        })
    }
}

document.addEventListener('DOMContentLoaded', DOMInteraction)