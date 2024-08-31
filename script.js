/// CLASSES

class Window {

    FUNCTIONAL = {'Paint': Paint, 'Calculator': Calculator}

    constructor(title, width, height, icon, iframe) {
        this.title = title
        this.width = width 
        this.height = height
        this.icon = icon
        this.iframe = iframe
    }

    setPosition(X, Y) {
        this.scaleX = X 
        this.scaleY = Y
    }

    getPosition() {
        return {X: this.scaleX, Y : this.scaleY}
    }

    moveX(left, X) {
        return left + X + 'px'
    }

    moveY(top, Y) {
        return top + Y + 'px'
    }
}

class Paint extends Window {
    constructor(title, width, height, icon, iframe) {
        super(title, width, height, icon, iframe)
    }
}

class Calculator extends Window {
    constructor(title, width, height, icon, iframe) {
        super(title, width, height, icon, iframe)
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
            'icon': '#',
            'iframe': 'pages/paint/paint.html'
        }
    },
    {
        'Calculator': {
            'width': '500px',
            'height': '500px',
            'icon': '#',
            'iframe': 'pages/calculator/calculator.html'
        }
    }
]

for (let i = 0; i < MENU_BUTTONS.length; i++) {
    MENU_BUTTONS[i].addEventListener('click', () => {
        
        if (MENU_BUTTONS[i].className.includes('Open')) {
            return
        }

        const window = new Window()
        for (key_name in window.FUNCTIONAL) {
            for (obj in WINDOW_RELATION[i]) {
                if (key_name == MENU_BUTTONS[i].id && key_name == obj) {
                   const NEW_OPEN_WINDOW = new window.FUNCTIONAL[key_name](obj, WINDOW_RELATION[i][obj].width, WINDOW_RELATION[i][obj].height, WINDOW_RELATION[i][obj].icon, WINDOW_RELATION[i][obj].iframe)
                   console.log(NEW_OPEN_WINDOW, 'obj')
                   OPEN_WINDOWS.push(NEW_OPEN_WINDOW)
                   renderOpenWindows(OPEN_WINDOWS)
                   MENU_BUTTONS[i].classList.add('Open')
                }
            }
        }
    })
}

function appendWindow(APP_REFERENCE) { 
    if (!APP_REFERENCE.className.includes('Open')) {
        APP_REFERENCE.classList.add('Open')
    }
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
                btn.innerHTML = '-'
            }
            if (i == 1) {
                btn.id = 'full'
                btn.innerHTML = 'O'
            }
            if (i == 2) {
                btn.id == 'minimize'
                btn.innerHTML = 'x'
            }
            button_container.append(btn)
        }
        header.append(title_container, button_container)
        return header
    }

    function Content(iframe_link) {
        const content = document.createElement('div')
        const iframe = document.createElement('object')
        iframe.setAttribute('data', iframe_link)
        console.log(iframe_link)
        content.append(iframe)
        content.className = 'Content'
        return content
    }



    function Container(title, width, height, icon, iframe) {
        const container = document.createElement('div')
        const header = Header(title, icon)
        const content = Content(iframe)
        container.className = 'Window'
        container.style.width = width
        container.style.height = height
        container.append(header, content)
        return container
    }

    const DESKTOP = document.querySelector('.Desktop')

    while (DESKTOP.hasChildNodes()) {
        DESKTOP.removeChild(DESKTOP.firstChild)
    }

    for (index in windows) {
        container = Container(windows[index].title, windows[index].width, windows[index].height, windows[index].icon, windows[index].iframe)
        container.style.left = windows[index].getPosition().X + 'px'
        container.style.top = windows[index].getPosition().Y + 'px'
        console.log(windows[index].getPosition().X)
        DESKTOP.append(container)
    }

    moveWindow()


}

function moveWindow() {
    
    const DESKTOP = document.querySelector('main')
    const HEADERS = document.querySelectorAll('.Header') 
    const WINDOWS = document.querySelectorAll('.Window')
    
    const POSITIONS = {X: '', Y: ''}
    
    for (let i = 0; i < HEADERS.length; i++) {

        HEADERS[i].addEventListener('mousedown', (e) => {

            const left = WINDOWS[i].offsetLeft
            const top = WINDOWS[i].offsetTop
            POSITIONS.X = e.clientX
            POSITIONS.Y = e.clientY

            function startMoving(e) {
                WINDOWS[i].style.cursor = 'move'
                WINDOWS[i].style.left = OPEN_WINDOWS[i].moveX(left, e.clientX - POSITIONS.X) 
                WINDOWS[i].style.top = OPEN_WINDOWS[i].moveY(top, e.clientY - POSITIONS.Y)
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
}/*



            

            DESKTOP.addEventListener('mousemove', startMoving)
            DESKTOP.addEventListener('mouseup', stopMoving)
        })
        console.log(HEADERS[i], WINDOWS[i], OPEN_WINDOWS[i])
    }
}
*/
