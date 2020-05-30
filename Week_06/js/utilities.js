export default class TodoTask {
    constructor(id, content, status) {
        this.id = id;
        this.content = content;
        this.status = status;
    }

    getId() {
        return this.id;
    }

    getContent() {
        return this.content;
    }

    getStatus() {
        return this.status;
    }

    setStatus(status) {
        this.status = status;
    }
}