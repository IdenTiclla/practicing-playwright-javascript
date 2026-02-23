import { describe, test, expect } from "@playwright/test"

describe("My test suite", () => {
    test("my first api test", async ({ request }) => {
        const response = await request.get("https://official-joke-api.appspot.com/random_joke")
        expect(response.ok()).toBeTruthy()
        const data = await response.json()
        console.log(data)
        expect(data).toHaveProperty('id')
        expect(data).toHaveProperty('type')
        expect(data).toHaveProperty('setup')
        expect(data).toHaveProperty('punchline')
    })

    test("test - checking that response is object", async ({ request }) => {
        const response = await request.get("https://official-joke-api.appspot.com/random_joke")
        const data = await response.json()
        expect(data).toEqual(expect.any(Object))
    })

    test("test - checking response attributes", async ({ request }) => {
        const response = await request.get("https://official-joke-api.appspot.com/random_joke")
        const data = await response.json()
        expect(data).toHaveProperty('id')
        expect(data).toHaveProperty('type')
        expect(data).toHaveProperty('setup')
        expect(data).toHaveProperty('punchline')
    })

    test("test - checking attributes data types", async ({ request }) => {
        const response = await request.get("https://official-joke-api.appspot.com/random_joke")
        const data = await response.json()
        const id = data.id
        const type = data.type
        const setup = data.setup
        const punchline = data.punchline

        expect(id).toEqual(expect.any(Number))
        expect(type).toEqual(expect.any(String))
        expect(setup).toEqual(expect.any(String))
        expect(punchline).toEqual(expect.any(String))
    })
})