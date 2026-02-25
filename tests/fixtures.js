import { test as base, expect } from "@playwright/test"
import HomePage from "../pages/home-page"
import LoginPage from "../pages/login-page"
import RegisterPage from "../pages/register-page"
import TodoPage from "../pages/todo-page"

const pageFixture = (PageClass) => async ({ page }, use) => await use(new PageClass(page))

const test = base.extend({
    homePage: pageFixture(HomePage),
    loginPage: pageFixture(LoginPage),
    registerPage: pageFixture(RegisterPage),
    todoPage: pageFixture(TodoPage),
})

export { test, expect }
