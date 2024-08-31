/// CLASSES

class Window {

    FUNCTIONAL = {'Paint': Paint, 'Calculator': Calculator}

    constructor(title, width, height, icon) {
        this.title = title
        this.width = width 
        this.height = height
        this.icon = icon
    }

    moveX(element, X) {
        element.style.left = element.offsetLeft + X + 'px'
    }

    moveY(element, Y) {
        element.style.top = element.offsetTop + Y + 'px'
    }
}

class Paint extends Window {
    constructor(title, width, height, icon, left, top) {
        super(title, width, height, icon)
        this.left = left
        this.top = top
    }
}

class Calculator extends Window {
    constructor(title, width, height, icon, left, top) {
        super(title, width, height, icon)
        this.left = left 
        this.top = top
    }
}

/// ********************************************

// SEGUNDA RELAÇÃO COM AS INFO DE CADA WINDOW

const OPEN_WINDOWS = []
const MENU_BUTTONS = document.querySelectorAll('.Functional')

const WINDOW_RELATION = [
    {
        'Paint': {
            'width': '500px',
            'height': '500px',
            'icon': '#'
        }
    },
    {
        'Calculator': {
            'width': '500px',
            'height': '500px',
            'icon': '#'
        }
    }
]

for (let i = 0; i < MENU_BUTTONS.length; i++) {
    MENU_BUTTONS[i].addEventListener('click', () => {
        const window = new Window()
        for (key in window.FUNCTIONAL) {
            for (obj in WINDOW_RELATION[i]) {
                if (key == MENU_BUTTONS[i].id && key == obj) {
                   const NEW_OPEN_WINDOW = new window.FUNCTIONAL[key](obj, WINDOW_RELATION[i][obj].width, WINDOW_RELATION[i][obj].height, WINDOW_RELATION[i][obj].icon, '0px', '0px')
                   OPEN_WINDOWS.push(NEW_OPEN_WINDOW)
                   renderOpenWindows(OPEN_WINDOWS)
                }
            }
        }
    })
}

function renderOpenWindows(windows) {

    function Header(title, icon_url) {
        const header = document.createElement('div')
        header.className = 'Header' 

        // title
        const title_container = document.createElement('div')
        title_container.className = 'Title'
        const span = document.createElement('span')
        span.textContent = title
        const icon = document.createElement('img')
        icon.setAttribute('src', icon_url)
        title_container.append(icon, span)

        // botoes
        const button_container = document.createElement('div')
        button_container.className = 'Buttons'
        for (let i = 0; i < 3; i++) {
            const btn = document.createElement('button')
            if (i == 0) {
                btn.id = 'close'
                btn.value = 'X'
            }
            if (i == 2) {
                btn.id = 'full'
                btn.value = 'O'
            }
            if (i == 3) {
                btn.id == 'minimize'
                btn.value = '-'
            }
            button_container.append(btn)
        }
        header.append(title_container, button_container)
        return header
    }



    function Container(title, width, height, icon) {
        const container = document.createElement('div')
        const header = Header(title, icon)
        container.className = 'Window'
        container.style.width = width
        container.style.height = height
        container.append(header)
        return container
    }

    const DESKTOP = document.querySelector('.Desktop')

    while (DESKTOP.hasChildNodes()) {
        DESKTOP.removeChild(DESKTOP.firstChild)
    }

    for (index in windows) {
        container = Container(windows[index].title, windows[index].width, windows[index].height, windows[index].icon)
        DESKTOP.append(container)
    }

    moveWindow()


}

/*
function moveWindow() {

    const DESKTOP = document.querySelector('main')
    const HEADERS = document.querySelectorAll('.Header') 
    const WINDOWS = document.querySelectorAll('.Window')

    const POSITIONS = {X: '', Y: ''}
    
    for (let i = 0; i < HEADERS.length; i++) {

        HEADERS[i].addEventListener('mousedown', (e) => {

            POSITIONS.X = e.clientX
            POSITIONS.Y = e.clientY

            function startMoving(e) {
                OPEN_WINDOWS[i].moveX(e.clientX - POSITIONS.X)
                OPEN_WINDOWS[i].moveY(e.clientY - POSITIONS.Y)
            }

            function stopMoving() {
                DESKTOP.removeEventListener('mousemove', startMoving)
                OPEN_WINDOWS[i].left = WINDOWS[i].offsetLeft 
                OPEN_WINDOWS[i].top = WINDOWS[i].offsetTop
            }

            DESKTOP.addEventListener('mousemove', startMoving)
            DESKTOP.addEventListener('mouseup', stopMoving)
        })
        console.log(HEADERS[i], WINDOWS[i], OPEN_WINDOWS[i])
    }
}
*/
