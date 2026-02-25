import BasePage from "../base-page"

class TodoPage extends BasePage {
    constructor(page) {
        super(page)
        this.page = page
        this.inputField = page.getByPlaceholder("What needs to be done?")
        this.todoItems = page.getByTestId("todo-item")
        this.todoCount = page.locator(".todo-count")
        this.filterCompleted = page.getByRole("link", { name: "Completed" })
        this.filterActive = page.getByRole("link", { name: "Active" })
        this.filterAll = page.getByRole("link", { name: "All" })
        this.clearCompletedButton = page.getByRole("button", { name: "Clear completed" })
        this.toggleAllCheckbox = page.getByLabel("Mark all as complete")
    }

    async navigate() {
        await super.navigate("https://demo.playwright.dev/todomvc/")
    }

    async addTodo(text) {
        await this.inputField.fill(text)
        await this.inputField.press("Enter")
    }

    async getTodoTexts() {
        return await this.todoItems.allTextContents()
    }

    async toggleTodo(text) {
        await this.todoItems.filter({ hasText: text }).getByRole("checkbox").click()
    }

    async isTodoCompleted(text) {
        const todoItem = this.todoItems.filter({ hasText: text })
        return await todoItem.getByRole("checkbox").isChecked()
    }

    async getItemsLeftCount() {
        const text = await this.todoCount.textContent()
        return parseInt(text)
    }

    async filterByCompleted() {
        await this.filterCompleted.click()
    }

    async filterByActive() {
        await this.filterActive.click()
    }

    async filterByAll() {
        await this.filterAll.click()
    }

    async deleteTodo(text) {
        const todoItem = this.todoItems.filter({ hasText: text })
        await todoItem.hover()
        await todoItem.getByRole("button", { name: "Delete" }).click()
    }

    async editTodo(text, newText) {
        const todoItem = this.todoItems.filter({ hasText: text })
        await todoItem.dblclick()
        const editField = this.page.getByRole("textbox", { name: "Edit" })
        await editField.clear()
        await editField.fill(newText)
    }

    async confirmEdit() {
        const editField = this.page.getByRole("textbox", { name: "Edit" })
        await editField.press("Enter")
    }

    async cancelEdit() {
        const editField = this.page.getByRole("textbox", { name: "Edit" })
        await editField.press("Escape")
    }

    async clearCompleted() {
        await this.clearCompletedButton.click()
    }

    async isClearCompletedVisible() {
        return await this.clearCompletedButton.isVisible()
    }

    async toggleAll() {
        await this.toggleAllCheckbox.click()
    }

    async getCurrentUrl() {
        return this.page.url()
    }

    async getTodoCount() {
        return await this.todoItems.count()
    }

    async hasFooter() {
        return await this.page.locator(".footer").isVisible()
    }

    async hasToggleAll() {
        return await this.toggleAllCheckbox.isVisible()
    }

    async addEmptyTodo() {
        await this.inputField.press("Enter")
    }

    async isTodoVisible(text) {
        return await this.todoItems.filter({ hasText: text }).isVisible()
    }

    async hasClass(text, className) {
        const todoItem = this.todoItems.filter({ hasText: text })
        const classes = await todoItem.getAttribute("class")
        return classes && classes.includes(className)
    }
}

export default TodoPage
