describe("AddItemForm", () => {
  it("123", async () => {
    await page.goto("http://localhost:6006/?path=/story/lesson-additemform--add-item-form-story")
    const image = await page.screenshot()

    expect(image).toMatchImageSnapshot()
  })
})