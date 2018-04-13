class Common {

    constructor(app) {
        this.app = app
        console.log(this.app, 'ee')
        // this.model = service.upload
        this.init()
    }

    init() {
        this.routes()
    }

    routes() {

    }
}

export default Common