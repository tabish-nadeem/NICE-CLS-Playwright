import { test, expect, Page, Browser, chromium, BrowserContext } from "@playwright/test";
import LoginPagePO from "./pageObjects/loginPagePO";




test.describe('test to demonstrate simple login', () => {
    
    let loginPagePO:LoginPagePO;
    let page: Page;
    let browser: Browser;
    let context: BrowserContext;
    
    test.beforeAll(async () => {
      console.log("inside beforeAll...");
      browser = await chromium.launch({ headless: false });
      context = await browser.newContext();
      page = await context.newPage();
    
      loginPagePO = new LoginPagePO(page);
    });

    test("should navigate to main page", async () => {
      await page.goto("https://www.google.com/", { waitUntil: "domcontentloaded" });
      await page.goto("https://practicetestautomation.com/");
      await page.waitForLoadState("domcontentloaded");
      console.log(await page.locator("div>h1").innerHTML());
      console.log(await page.getByText("Hello").innerHTML());
    
      expect(await page.locator("div>h1").innerText()).toEqual("Hello");
      // await page.locator('input[role="combobox"]').type('hello');
    });
    
    test('should navigate to login page',async () => {
        // loginPagePO = new LoginPagePO(page);
        await loginPagePO.navigateToLoginPage();
    })

    test('should check error message on invalid emailID',async () => {
        // loginPagePO = new LoginPagePO(page);
        await loginPagePO.performLogin('randomUser','Password123');
        await page.screenshot({path:'./screenshots/s1.png',fullPage:true});
        expect(await loginPagePO.isErrorVisible()).toBeTruthy();
    });
    test('should check error message on invalid password',async () => {
        await loginPagePO.performLogin('student','randomPassword');
        await page.screenshot({path:'./screenshots/s2.png',fullPage:true});

        expect(await loginPagePO.isErrorVisible()).toBeTruthy();
    });
    test('should enter correct credential and navigate to other page',async () => {
        await loginPagePO.performLogin('student','Password123');
        await page.screenshot({path:'./screenshots/s3.png',fullPage:true});

        
    });

    test.afterAll(async () => {
        console.log("inside afterAll...");
        await page.close();
        await context.close();
        await browser.close();
      });

})

