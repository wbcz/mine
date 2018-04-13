class JSONStringify {
    constructor(ctx, next) {
        this.ctx = ctx
        this.ctx.send = this.send.bind(ctx)
        return this.ctx.send
    }
    async send() {
        this.ctx.set("Content-Type", "application/json")
        this.ctx.body = JSON.stringify(json)
        await next()
    }
}

export default JSONStringify