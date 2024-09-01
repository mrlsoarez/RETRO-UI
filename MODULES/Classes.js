export class Window {

    constructor(title, width, height, icon, iframe) {
        this.title = title
        this.width = width
        this.height = height
        this.icon = icon
        this.iframe = iframe
    }

    setPosition(X, Y) {
        this.left = X
        this.top = Y
    }

    getPosition() {
        return { left: this.left , top: this.top  }
    }

    moveX(left, right, X) {

        if (right <= 1) {
            return 0
        }

        if (left + X >= 8) {
            return left + X
        }
        return undefined
    }

    moveY(top, bottom, Y) {
        
        if (bottom <= 1) {
            return 0
        }

        if (top + Y >= 8) {
            return top + Y
        }
        return undefined
    }

    getOffsetRight(desktop, window, left) {
        return desktop - (window + left)
    }

    getOffsetBottom(desktop, window, top) {
        return desktop - (window + top)
    }


}

