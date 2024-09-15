export function getPageRelation() {
    const WINDOW_RELATION = [ 
        {
            'Internet-Explorer': {
                'width': '500',
                'height': '500',
                'icon': 'assets/images/internet-explorer.ico',
                'iframe': 'NULL'
            }
        },
        {
            'Email': {
                'width': '500',
                'height': '500',
                'icon': 'assets/images/email.ico',
                'iframe': 'NULL'
            }
        },
        {
            'Paint': {
                'width': '500',
                'height': '500',
                'icon': 'assets/images/Paint.ico',
                'iframe': 'pages/paint/paint.html'
            }
        },
        {
            'Calculator': {
                'width': '500',
                'height': '500',
                'icon': 'assets/images/Calculator.ico',
                'iframe': 'pages/calculator/calculator.html'
            }
        }
    ]
    return WINDOW_RELATION
}