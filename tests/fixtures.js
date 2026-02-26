import { test as base, expect } from "@playwright/test"
import HomePage from "../pages/homepage/home-page"
import LoginPage from "../pages/login/login-page"
import RegisterPage from "../pages/register/register-page"
import TodoPage from "../pages/todo/todo-page"
import SearchPage from "../pages/search/search-page"

const pageFixture = (PageClass) => async ({ page }, use) => await use(new PageClass(page))

const test = base.extend({
    homePage: pageFixture(HomePage),
    loginPage: pageFixture(LoginPage),
    registerPage: pageFixture(RegisterPage),
    todoPage: pageFixture(TodoPage),
    searchPage: pageFixture(SearchPage),
})

export { test, expect }
