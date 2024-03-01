import { expect, test } from "@playwright/test";

/**
  The general shapes of tests in Playwright Test are:
    1. Navigate to a URL
    2. Interact with the page
    3. Assert something about the page against your expectations
  Look for this pattern in the tests below!
 */

// If you needed to do something before every test case...
test.beforeEach(() => {
  // ... you'd put it here.
  // TODO: Is there something we need to do before every test case to avoid repeating code?
});

/**
 * Don't worry about the "async" yet. We'll cover it in more detail
 * for the next sprint. For now, just think about "await" as something
 * you put before parts of your test that might take time to run,
 * like any interaction with the page.
 */
test("on page load, i see a login button", async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  await expect(page.getByLabel("Login")).toBeVisible();
});

test("on page load, i dont see the input box until login", async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  await expect(page.getByLabel("Sign Out")).not.toBeVisible();
  await expect(page.getByLabel("Command input")).not.toBeVisible();

  // click the login button
  await page.getByLabel("Login").click();
  await expect(page.getByLabel("Sign Out")).toBeVisible();
  await expect(page.getByLabel("Command input")).toBeVisible();
});

test("after I type into the input box, its text changes", async ({ page }) => {
  // Step 1: Navigate to a URL
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();

  // Step 2: Interact with the page
  // Locate the element you are looking for
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");

  // Step 3: Assert something about the page
  // Assertions are done by using the expect() function
  const mock_input = `mode`;
  await expect(page.getByLabel("Command input")).toHaveValue(mock_input);
});

test("on page load, i see a button", async ({ page }) => {
  // CHANGED
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await expect(
    page.getByRole("button", { name: "Submitted 0 times" })
  ).toBeVisible();
});

test("after I click the button, its label increments", async ({ page }) => {
  // CHANGED
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await expect(
    page.getByRole("button", { name: "Submitted 0 times" })
  ).toBeVisible();
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(
    page.getByRole("button", { name: "Submitted 1 times" })
  ).toBeVisible();
});

test("after I click the button, my command gets pushed", async ({ page }) => {
  // CHANGED
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();

  // you can use page.evaulate to grab variable content from the page for more complex assertions
  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual("Mode changed to: verbose");
});

test("after I click the button, my csv is loaded", async ({ page }) => {
  // CHANGED
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("load_csv mocked_data_1");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();

  // you can use page.evaulate to grab variable content from the page for more complex assertions
  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual(("mocked_data_1 successfully loaded"))
});

test("load back to back csvs", async ({ page }) => {
  // CHANGED
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("load_csv mocked_data_1");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();

  // you can use page.evaulate to grab variable content from the page for more complex assertions
  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });

  expect(firstChild).toEqual("mocked_data_1 successfully loaded");

    await page.getByLabel("Command input").fill("load_csv mocked_data_2");
    await page.getByRole("button", { name: "Submitted 1 times" }).click();

    const secondChild = await page.evaluate(() => {
      const history = document.querySelector(".repl-history");
      return history?.children[1]?.textContent;
    });


  expect(secondChild).toEqual("mocked_data_2 successfully loaded");
});

test("view csv without loading", async ({ page }) => {
  // CHANGED
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();

  // you can use page.evaulate to grab variable content from the page for more complex assertions
  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual("Error: No CSV loaded");
});

test("search csv without loading", async ({ page }) => {
  // CHANGED
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("search 0 1");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();

  // you can use page.evaulate to grab variable content from the page for more complex assertions
  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual("Error: No CSV loaded");
});


test("view csv without loading, then load the csv, then view", async ({ page }) => {
  // CHANGED
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();

  // you can use page.evaulate to grab variable content from the page for more complex assertions
  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual("Error: No CSV loaded");

await page.getByLabel("Command input").fill("load_csv mocked_data_4");
await page.getByRole("button", { name: "Submitted 1 times" }).click();

const secondChild = await page.evaluate(() => {
const history = document.querySelector(".repl-history");
return history?.children[1]?.textContent;
    });
expect(secondChild).toEqual("mocked_data_4 successfully loaded");

await page.getByLabel("Command input").fill("view");
await page.getByRole("button", { name: "Submitted 2 times" }).click();

const thirdChild = await page.evaluate(() => {
  const history = document.querySelector(".repl-history");
  return history?.children[2]?.textContent;
});
expect(thirdChild).toEqual("Viewing:RedOrangeYellowGreenOrangeRed");
});

test("search csv without loading, then load the csv, then search", async ({
  page,
}) => {
  // CHANGED
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("search Orange 1");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();

  // you can use page.evaulate to grab variable content from the page for more complex assertions
  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual("Error: No CSV loaded");

  await page.getByLabel("Command input").fill("load_csv mocked_data_4");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();

  const secondChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[1]?.textContent;
  });
  expect(secondChild).toEqual("mocked_data_4 successfully loaded");

  await page.getByLabel("Command input").fill("search Orange 1");
  await page.getByRole("button", { name: "Submitted 2 times" }).click();

  const thirdChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[2]?.textContent;
  });
  expect(thirdChild).toEqual("Search Results:RedOrangeYellowGreenOrangeRed");
});


test("search csv with no matches", async ({ page }) => {
  // CHANGED
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("load_csv mocked_data_2");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();

  // you can use page.evaulate to grab variable content from the page for more complex assertions
  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });

  expect(firstChild).toEqual("mocked_data_2 successfully loaded");

  await page.getByLabel("Command input").fill("search 4 Hi");
    await page.getByRole("button", { name: "Submitted 1 times" }).click();

    const secondChild = await page.evaluate(() => {
      const history = document.querySelector(".repl-history");
      return history?.children[1]?.textContent;
    });

    expect(secondChild).toEqual("Search Results:No matches");

});

test("load malformed csv", async ({ page }) => {
  // CHANGED
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("load_csv mocked_malformed");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();

  // you can use page.evaulate to grab variable content from the page for more complex assertions
  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });

  expect(firstChild).toEqual("Malformed csv. Try a different one.");

});


test("test mode change with same input", async ({ page }) => {
  // CHANGED
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("load_csv mocked_data_1");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();

  // you can use page.evaulate to grab variable content from the page for more complex assertions
  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });

  expect(firstChild).toEqual("mocked_data_1 successfully loaded");

  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();

  const secondChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[1]?.textContent;
  });

  expect(secondChild).toEqual("Mode changed to: verbose");

    await page.getByLabel("Command input").fill("load_csv mocked_data_1");
    await page.getByRole("button", { name: "Submitted 2 times" }).click();

    // you can use page.evaulate to grab variable content from the page for more complex assertions
    const thirdChild = await page.evaluate(() => {
      const history = document.querySelector(".repl-history");
      return history?.children[2]?.textContent;
    });

    expect(thirdChild).toEqual("Command: load_csv");

    const fourthChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[3]?.textContent;
    });

    expect(fourthChild).toEqual("Output: ");

    const fifthChild = await page.evaluate(() => {
      const history = document.querySelector(".repl-history");
      return history?.children[4]?.textContent;
      });

    expect(fifthChild).toEqual("mocked_data_1 successfully loaded");
});



