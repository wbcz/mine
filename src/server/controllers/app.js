class App {
    success(data) {
        this.ctx.body = {
            success: true,
            data: data
        }
    }
    error(err) {
        this.ctx.body = {
            success: false,
            err: err
        }
    }
}

export default App