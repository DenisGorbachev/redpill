export class TestUser {
  constructor(opts, deps) {
    Object.assign(this, opts)
    Object.assign(this, deps)
  }

  async send(user, message) {

  }

  async open(url, options = {}) {

  }

  async reload() {

  }

  async wait(delay) {

  }

  async waitFor(selector) {

  }

  async install(extension) {

  }

  async notice(input) {
    switch (typeof input) {
      case 'string':
        return await this.noticeText(input)
      default:
        return await this.noticeElement(input)
    }
  }

  async noticeNot(text) {

  }

  async noticeText(text) {

  }

  async noticeElement(element) {

  }

  async find(selector) {

  }

  async type(selector, text) {

  }

  async click(selector) {

  }

  async submit(selector, fields) {

  }
}
