import { test, expect, Page, Browser, BrowserContext, chromium, APIRequestContext } from '@playwright/test';
import dotenv from "dotenv";

dotenv.config({path:'../../.env'});

test.describe('test for api response', () => {

    console.log('env',process.env.PROD);
    

    let page:Page;
    let browser:Browser;
    let browserContext:BrowserContext;
    let request:APIRequestContext;


    test.beforeAll(async ()=>{
        browser = await chromium.launch();
        browserContext = await browser.newContext();
        page = await browserContext.newPage();
        request = browserContext.request;
    });

    test('should give users as reponse',async () => {
        const res = await request.get(`/${process.env.DEV}`);
        console.log('res-dev',await res.status());
        
        expect(res.status()).toEqual(200);
    });

    test('should give post as reponse',async () => {
        const res = await request.get(`/${process.env.STAGE}`);
        console.log('res-stage', res.status());
        
        expect(res.status()).toEqual(200);
    });

    test('should give todos as reponse',async () => {
        const res = await request.get(`/${process.env.PROD}`);
        console.log('res-prod', res.status());
        
        expect(res.status()).toEqual(200);
    });

    test.afterAll(async ()=> {
        page.close();
        browserContext.close();
        browser.close();
    })


})