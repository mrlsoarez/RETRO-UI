export class Window {

    FUNCTIONAL = { 'Paint': Paint, 'Calculator': Calculator }

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
        return { X: this.scaleX + 'px', Y: this.scaleY + 'px' }
    }

    moveX(left, right, X) {

        if (right <= 1) {
            return '0px'
        }

        if (left + X >= 8) {
            return left + X + 'px'
        }
        return undefined
    }

    moveY(top, bottom, Y) {
        
        if (bottom <= 1) {
            return '0px'
        }

        if (top + Y >= 8) {
            return top + Y + 'px'
        }
        return undefined
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
