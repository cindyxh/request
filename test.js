const request = require("./request");

describe("test request", () => {
    test("test get url", async () => {
        const options = {
          url: "https://www.google.com/",
          resolveWithFullResponse: true,
        };

        const {response} = await request(options);
        expect(response).toBeTruthy()
    })
})