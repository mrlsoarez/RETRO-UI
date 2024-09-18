/// CLASSES

import { DOMBuilder } from "./modules/DOMBuilder.js"
import { getPageRelation } from './modules/PageRelation.js'
import { Window } from './modules/Classes.js'
/// ********************************************

// SEGUNDA RELAÇÃO COM AS INFO DE CADA WINDOW
const OPEN_WINDOWS = []
var OPEN_APPS = -1
const WINDOW_RELATION = getPageRelation()
const DESKTOP = document.querySelector('main')

function DOMInteraction() {

    const MENU_BUTTONS = document.querySelectorAll('.Functional')
    const WINDOW_BUTTON = document.querySelector('.Windows-Button')

    OpenNewWindow(MENU_BUTTONS)
    OpenMenu(WINDOW_BUTTON)
}

function OpenMenu(WINDOW_BUTTON) {

    const MENU = document.querySelector('.Menu')
    var is_open = false 

    WINDOW_BUTTON.addEventListener('click', () => {

        if (!(is_open)) {
            MENU.classList.add('Open')
            is_open = true
            return 
        }

        MENU.classList.remove('Open')
        is_open = false
    })

}
function OpenNewWindow(Buttons) {

    for (let i = 0; i < Buttons.length; i++) {
        Buttons[i].addEventListener('click', () => {
            if (Buttons[i].className.includes('Open')) {
                return
            }

            for (let obj in WINDOW_RELATION[i]) {
                if (Buttons[i].id == obj) {
                    const NEW_OPEN_WINDOW = new Window(obj, WINDOW_RELATION[i][obj].width, WINDOW_RELATION[i][obj].height, WINDOW_RELATION[i][obj].icon, WINDOW_RELATION[i][obj].iframe)
                    NEW_OPEN_WINDOW.setPosition(0, 0)
                    OPEN_WINDOWS.push(NEW_OPEN_WINDOW)
                    OPEN_APPS += 1
                    renderOpenWindows(OPEN_WINDOWS, OPEN_APPS)
                    Buttons[i].classList.add('Open')
                }
            }

        })
    }
}

function renderOpenWindows(windows, index) {
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

                if (i == 0) { 
                    var btn = DOM.buildElementInnerContent('button', 'Header-Button Less', '-') 
                    btn.innerHTML = "<img src = 'assets/images/window/minimize-window.png'></img>"
                }

                if (i == 1) { 
                    var btn = DOM.buildElementInnerContent('button', 'Header-Button Full', 'O') 
                    btn.innerHTML = "<img src = 'assets/images/window/full-window.jpg'></img>"
                }

                if (i == 2) { 
                    var btn = DOM.buildElementInnerContent('button', 'Header-Button Close', 'X') 
                    btn.innerHTML = "<img src = 'assets/images/window/close-window.png'></img>"
                }

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
            const iframe = DOM.buildElementAttribute('embed', 'Inner', 'src', iframe_link)
            return iframe
        }

        CONTENT.append(buildInnerContent())
        return CONTENT
    }

    function TaskBar(Window) {

        const APP = DOM.buildElement('div', `App ${Window.title}`)
        const img = DOM.buildElementAttribute('img', 'Taskbar-Image', 'img', Window.icon)
        const span = DOM.buildElementInnerContent('span', 'Taskbar-Title', Window.title)

        APP.append(img, span)
        return APP
    }

    function Borders(title) {

        const _1 = DOM.buildElement('div', `Border ${title}`)
        const _2 = DOM.buildElement('div', `Border ${title}`)
        const _3 = DOM.buildElement('div', `Border ${title}`)
        const _4 = DOM.buildElement('div', `Border ${title}`)

        _1.id = 'border-1'
        _2.id = 'border-2'
        _3.id = 'border-3'
        _4.id = 'border-4'
        return { _1, _2, _3, _4 }

    }

    function Container(Window) {

        const CONTAINER = DOM.buildElement('div', `Window ${Window.title} #${index}`)

        function DefineWindowStyle() {
            console.log(Window.getPosition())
            CONTAINER.style.width = Window.width + 'px'
            CONTAINER.style.height = Window.height + 'px'
            CONTAINER.style.left = Window.getPosition().left + 'px'
            CONTAINER.style.top = Window.getPosition().top + 'px'
        }

        const header = Header(Window.title, Window.icon)
        const content = Content(Window.iframe)
        const border = Borders(Window.title)

        DefineWindowStyle()

        CONTAINER.append(header, content, border._1, border._2, border._3, border._4)


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

        resizeWindow(windows[index].title)
        interactButton(container, windows[index].title)

    }

    moveWindow()


}

function interactButton(window, title) {
    
    const buttons = document.querySelectorAll('.Header-Button') 
    const window_index =  window.className.split('#')[1]
    const taskbar_app = document.querySelector('.App.' + title)

    const MENU_BUTTONS = document.querySelectorAll('.Functional')

    var is_minimized = false 

    buttons.forEach((button) => {
        button.addEventListener('click', () => {

            if (button.className.includes('Close')) {
                OPEN_WINDOWS.splice(window_index, 1)

                MENU_BUTTONS.forEach((button) => {
                    if (button.id == title) {
                        button.classList.remove('Open')
                    }
                })

                OPEN_APPS -= 1
                renderOpenWindows(OPEN_WINDOWS)
            }
            
            else if (button.className.includes('Less')) {
                window.style.display = 'none'
                is_minimized = true
            }

            else if (button.className.includes('Full')) {
                window.style.top = '0px'
                window.style.left = '0px'
                window.style.width = '100%'
                window.style.height = '95%'
            }
        })
    })


    taskbar_app.addEventListener('click', () => {
        if (is_minimized) {
            window.style.display = 'block'
            is_minimized = false
        }
    })

    taskbar_app.addEventListener('mouseenter', () => {
        taskbar_app.style.cursor = 'pointer'
    })
    
}

function moveWindow() {

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

                const right = OPEN_WINDOWS[i].getOffsetRight(DESKTOP.offsetWidth, WINDOWS[i].offsetWidth, WINDOWS[i].offsetLeft)
                const bottom = OPEN_WINDOWS[i].getOffsetBottom(DESKTOP.offsetHeight, WINDOWS[i].offsetHeight, WINDOWS[i].offsetTop)
                
                
                const NEW_LEFT = OPEN_WINDOWS[i].moveX(left, right, e.clientX - POSITIONS.X)
                const NEW_TOP = OPEN_WINDOWS[i].moveY(top, bottom, e.clientY - POSITIONS.Y)
                
                WINDOWS[i].style.left = NEW_LEFT + 'px'
                WINDOWS[i].style.top = NEW_TOP + 'px'
                WINDOWS[i].style.cursor = 'move'

                if (NEW_LEFT == 0 || NEW_TOP == 0) {
                    stopMoving()
                }

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

function resizeWindow(title) {

    const BORDERS = document.querySelectorAll('.Border.' + title)
    const CONTAINER = document.querySelector('.Window.' + title)

    function getWindowInRelation() {
        for (let i = 0; i < OPEN_WINDOWS.length; i++) {
            if (OPEN_WINDOWS[i].title == title) {
                return i
            }
        }

    }

    const index = getWindowInRelation()
    const WINDOW = OPEN_WINDOWS[index]

    const POSITIONS = { X: '', Y: '' }

    for (let i = 0; i < BORDERS.length; i++) {
        BORDERS[i].addEventListener('mousedown', (e) => {

            POSITIONS.X = e.clientX
            POSITIONS.Y = e.clientY

            const LEFT = WINDOW.getPosition().left
            const TOP = WINDOW.getPosition().top
            const RIGHT = WINDOW.getOffsetRight(DESKTOP.offsetWidth, CONTAINER.offsetWidth, LEFT)
            const BOTTOM = WINDOW.getOffsetBottom(DESKTOP.offsetHeight, CONTAINER.offsetHeight, TOP)

            function startResize(e) {

                let NEW_HEIGHT
                let NEW_TOP
                let NEW_LEFT
                let NEW_WIDTH

                if (BORDERS[i].id == 'border-1' || BORDERS[i].id == 'border-4') {
                    CONTAINER.style.cursor = 'n-resize'
                }
                else {
                    CONTAINER.style.cursor = 'w-resize'
                }

                if (BORDERS[i].id == 'border-1') {
                    NEW_HEIGHT = eval(parseInt(WINDOW.height) - (e.clientY - POSITIONS.Y))
                    NEW_TOP = WINDOW.moveY(TOP, BOTTOM, e.clientY - POSITIONS.Y)
                }

                else if (BORDERS[i].id == 'border-2') {
                    NEW_WIDTH = eval(parseInt(WINDOW.width) - (e.clientX - POSITIONS.X))
                    NEW_LEFT = WINDOW.moveX(LEFT, RIGHT, e.clientX - POSITIONS.X)
                }

                else if (BORDERS[i].id == 'border-3') {
                    NEW_WIDTH = eval(parseInt(WINDOW.width) + (e.clientX - POSITIONS.X))
                }

                else if (BORDERS[i].id == 'border-4') {
                    NEW_HEIGHT = eval(parseInt(WINDOW.height) + (e.clientY - POSITIONS.Y))
                }

                CONTAINER.style.height = NEW_HEIGHT + 'px'
                CONTAINER.style.top = NEW_TOP + 'px'
                CONTAINER.style.left = NEW_LEFT + 'px'
                CONTAINER.style.width = NEW_WIDTH + 'px'
            }
         
            function stopResize() {
                document.removeEventListener('mousemove', startResize)
                WINDOW.height = CONTAINER.offsetHeight
                WINDOW.width = CONTAINER.offsetWidth
            }

            document.addEventListener('mousemove', startResize)
            document.addEventListener('mouseup', stopResize)


        })
    }

}

document.addEventListener('DOMContentLoaded', DOMInteraction)