import { test, expect } from "./fixtures.js"

test.describe("TodoMVC", () => {
    test.beforeEach(async ({ todoPage }) => {
        await todoPage.navigate()
    })

    // TC-01: Crear un nuevo todo
    test("should add a new todo item", async ({ todoPage }) => {
        await todoPage.addTodo("Buy groceries")

        const todos = await todoPage.getTodoTexts()
        expect(todos).toHaveLength(1)
        expect(todos[0]).toContain("Buy groceries")
        expect(await todoPage.getItemsLeftCount()).toBe(1)
    })

    test("should add multiple todo items", async ({ todoPage }) => {
        await todoPage.addTodo("Buy groceries")
        await todoPage.addTodo("Walk the dog")
        await todoPage.addTodo("Do Homework")

        const todos = await todoPage.getTodoTexts()
        expect(todos).toHaveLength(3)
        expect(todos[0]).toContain("Buy groceries")
        expect(todos[1]).toContain("Walk the dog")
        expect(todos[2]).toContain("Do Homework")
        expect(await todoPage.getItemsLeftCount()).toBe(3)
    })

    test("should not add todo with empty text", async ({ todoPage }) => {
        await todoPage.addEmptyTodo()

        const todos = await todoPage.getTodoTexts()
        expect(todos).toHaveLength(0)
    })

    test("should display footer and toggle-all after adding first todo", async ({ todoPage }) => {
        const hasFooterBefore = await todoPage.hasFooter().catch(() => false)
        const hasToggleAllBefore = await todoPage.hasToggleAll().catch(() => false)

        await todoPage.addTodo("Comprar verduras")

        const hasFooterAfter = await todoPage.hasFooter()
        const hasToggleAllAfter = await todoPage.hasToggleAll()

        expect(hasFooterBefore).toBe(false)
        expect(hasToggleAllBefore).toBe(false)
        expect(hasFooterAfter).toBe(true)
        expect(hasToggleAllAfter).toBe(true)
    })

    // TC-02: Marcar y desmarcar un todo como completado
    test("should mark a todo item as completed", async ({ todoPage }) => {
        await todoPage.addTodo("Buy groceries")
        await todoPage.addTodo("Walk the dog")

        await todoPage.toggleTodo("Buy groceries")

        expect(await todoPage.isTodoCompleted("Buy groceries")).toBe(true)
        expect(await todoPage.isTodoCompleted("Walk the dog")).toBe(false)
        expect(await todoPage.getItemsLeftCount()).toBe(1)
    })

    test("should unmark a completed todo", async ({ todoPage }) => {
        await todoPage.addTodo("Buy groceries")
        await todoPage.toggleTodo("Buy groceries")

        expect(await todoPage.isTodoCompleted("Buy groceries")).toBe(true)
        expect(await todoPage.getItemsLeftCount()).toBe(0)

        await todoPage.toggleTodo("Buy groceries")

        expect(await todoPage.isTodoCompleted("Buy groceries")).toBe(false)
        expect(await todoPage.getItemsLeftCount()).toBe(1)
    })

    test("should display clear completed button when todo is completed", async ({ todoPage }) => {
        await todoPage.addTodo("Buy groceries")

        const visibleBefore = await todoPage.isClearCompletedVisible()
        expect(visibleBefore).toBe(false)

        await todoPage.toggleTodo("Buy groceries")

        const visibleAfter = await todoPage.isClearCompletedVisible()
        expect(visibleAfter).toBe(true)
    })

    test("should hide clear completed button when all todos are active", async ({ todoPage }) => {
        await todoPage.addTodo("Buy groceries")
        await todoPage.toggleTodo("Buy groceries")
        expect(await todoPage.isClearCompletedVisible()).toBe(true)

        await todoPage.toggleTodo("Buy groceries")
        const visible = await todoPage.isClearCompletedVisible()
        expect(visible).toBe(false)
    })

    test("should show correct singular/plural items count", async ({ todoPage }) => {
        await todoPage.addTodo("Task 1")
        expect(await todoPage.getItemsLeftCount()).toBe(1)

        await todoPage.addTodo("Task 2")
        expect(await todoPage.getItemsLeftCount()).toBe(2)

        await todoPage.toggleTodo("Task 1")
        expect(await todoPage.getItemsLeftCount()).toBe(1)
    })

    test("should apply completed class and strikethrough to completed todo", async ({ todoPage }) => {
        await todoPage.addTodo("Buy groceries")
        await todoPage.toggleTodo("Buy groceries")

        const hasCompletedClass = await todoPage.hasClass("Buy groceries", "completed")
        expect(hasCompletedClass).toBe(true)
    })

    // TC-03: Editar un todo existente
    test("should edit todo with Enter key", async ({ todoPage }) => {
        await todoPage.addTodo("Original task")
        await todoPage.editTodo("Original task", "Modified task")
        await todoPage.confirmEdit()

        const todos = await todoPage.getTodoTexts()
        expect(todos[0]).toContain("Modified task")
    })

    test("should cancel edit with Escape key", async ({ todoPage }) => {
        await todoPage.addTodo("Original task")
        await todoPage.editTodo("Original task", "Modified task")
        await todoPage.cancelEdit()

        const todos = await todoPage.getTodoTexts()
        expect(todos[0]).toContain("Original task")
    })

    test("should delete todo when edited to empty text", async ({ todoPage }) => {
        await todoPage.addTodo("Task to delete")
        await todoPage.editTodo("Task to delete", "")
        await todoPage.confirmEdit()

        const todos = await todoPage.getTodoTexts()
        expect(todos).toHaveLength(0)
    })

    // TC-04: Eliminar un todo
    test("should delete todo with delete button", async ({ todoPage }) => {
        await todoPage.addTodo("Todo A")
        await todoPage.addTodo("Todo B")
        await todoPage.addTodo("Todo C")

        expect(await todoPage.getTodoCount()).toBe(3)

        await todoPage.deleteTodo("Todo B")

        const todos = await todoPage.getTodoTexts()
        expect(todos).toHaveLength(2)
        expect(todos[0]).toContain("Todo A")
        expect(todos[1]).toContain("Todo C")
        expect(await todoPage.getItemsLeftCount()).toBe(2)
    })

    test("should clear all completed todos with clear completed button", async ({ todoPage }) => {
        await todoPage.addTodo("Todo A")
        await todoPage.addTodo("Todo B")
        await todoPage.addTodo("Todo C")

        await todoPage.toggleTodo("Todo A")
        await todoPage.toggleTodo("Todo C")

        expect(await todoPage.getItemsLeftCount()).toBe(1)
        expect(await todoPage.isClearCompletedVisible()).toBe(true)

        await todoPage.clearCompleted()

        const todos = await todoPage.getTodoTexts()
        expect(todos).toHaveLength(1)
        expect(todos[0]).toContain("Todo B")
    })

    test("should hide footer and toggle-all when list is empty after clear completed", async ({ todoPage }) => {
        await todoPage.addTodo("Todo A")
        await todoPage.toggleTodo("Todo A")

        expect(await todoPage.hasFooter()).toBe(true)
        expect(await todoPage.hasToggleAll()).toBe(true)

        await todoPage.clearCompleted()

        const hasFooter = await todoPage.hasFooter().catch(() => false)
        const hasToggleAll = await todoPage.hasToggleAll().catch(() => false)

        expect(hasFooter).toBe(false)
        expect(hasToggleAll).toBe(false)
    })

    // TC-05: Filtrar todos por estado
    test("should display all todos with All filter", async ({ todoPage }) => {
        await todoPage.addTodo("Active 1")
        await todoPage.addTodo("Completed 1")
        await todoPage.addTodo("Active 2")

        await todoPage.toggleTodo("Completed 1")
        await todoPage.filterByAll()

        const todos = await todoPage.getTodoTexts()
        expect(todos).toHaveLength(3)
    })

    test("should display only active todos with Active filter", async ({ todoPage }) => {
        await todoPage.addTodo("Active 1")
        await todoPage.addTodo("Completed 1")
        await todoPage.addTodo("Active 2")

        await todoPage.toggleTodo("Completed 1")
        await todoPage.filterByActive()

        const todos = await todoPage.getTodoTexts()
        expect(todos).toHaveLength(2)
        expect(await todoPage.isTodoVisible("Active 1")).toBe(true)
        expect(await todoPage.isTodoVisible("Active 2")).toBe(true)
        expect(await todoPage.isTodoVisible("Completed 1")).toBe(false)
    })

    test("should display only completed todos with Completed filter", async ({ todoPage }) => {
        await todoPage.addTodo("Active 1")
        await todoPage.addTodo("Completed 1")
        await todoPage.addTodo("Active 2")

        await todoPage.toggleTodo("Completed 1")
        await todoPage.filterByCompleted()

        const todos = await todoPage.getTodoTexts()
        expect(todos).toHaveLength(1)
        expect(todos[0]).toContain("Completed 1")
    })

    test("should update URL hash based on filter", async ({ todoPage }) => {
        await todoPage.addTodo("Task 1")

        await todoPage.filterByActive()
        let url = await todoPage.getCurrentUrl()
        expect(url).toContain("#/active")

        await todoPage.filterByCompleted()
        url = await todoPage.getCurrentUrl()
        expect(url).toContain("#/completed")

        await todoPage.filterByAll()
        url = await todoPage.getCurrentUrl()
        expect(url).toContain("#/")
    })

    test("should counter remain unchanged when changing filters", async ({ todoPage }) => {
        await todoPage.addTodo("Active 1")
        await todoPage.addTodo("Completed 1")
        await todoPage.toggleTodo("Completed 1")

        const countBeforeFilter = await todoPage.getItemsLeftCount()

        await todoPage.filterByActive()
        const countAfterActiveFilter = await todoPage.getItemsLeftCount()

        await todoPage.filterByCompleted()
        const countAfterCompletedFilter = await todoPage.getItemsLeftCount()

        await todoPage.filterByAll()
        const countAfterAllFilter = await todoPage.getItemsLeftCount()

        expect(countBeforeFilter).toBe(1)
        expect(countAfterActiveFilter).toBe(1)
        expect(countAfterCompletedFilter).toBe(1)
        expect(countAfterAllFilter).toBe(1)
    })
})
