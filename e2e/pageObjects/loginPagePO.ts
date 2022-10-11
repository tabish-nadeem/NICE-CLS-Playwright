import { expect, Locator, Page } from "@playwright/test";



export default class LoginPagePO{

    public page:Page;
    public practiceLink:Locator;
    public usernameInput:Locator;
    public passwordInput:Locator;
    public error:Locator;
    public submitBtn:Locator;

    constructor(page:Page){
        this.page = page;
        this.practiceLink = this.page.getByRole('link', { name: 'Practice' });
        this.usernameInput = this.page.locator('#login #username');
        this.passwordInput = this.page.locator('#login #password');
        this.error = this.page.locator('#login #error');
        this.submitBtn = this.page.locator('#login #submit');
    }

    async navigateToLoginPage():Promise<void>{
        expect(await this.practiceLink.textContent()).toEqual('Practice');
        expect(await this.practiceLink.isEnabled({timeout:4000})).toBeTruthy();
        await this.practiceLink.click();
        await expect(this.page).toHaveURL('https://practicetestautomation.com/practice/');
        // await this.page.getByRole('link', { name: 'Practice' }).click();
        await this.page.getByRole('link', { name: 'Test Login Page' }).click();
        await expect(this.page).toHaveURL('https://practicetestautomation.com/practice-test-login/');
        // await this.page.waitForURL('https://practicetestautomation.com/practice/');
        // expect(this.page.url()).toEqual('https://practicetestautomation.com/practice/');
    }

    async performLogin(username:string, password:string):Promise<void>{
        // expect(this.usernameInput.isVisible()).toBeTruthy();
        
        await this.typeUsername(username);
        await this.typePassword(password);
        await this.submitBtn.click();

    }

    async isErrorVisible():Promise<boolean> {
        return await this.error.isVisible();
    }

    async typeUsername(text:string){
        await this.usernameInput.focus(); 
        await this.usernameInput.fill(''); 
        await this.usernameInput.type(text); 
    }
    async typePassword(text:string){
        await this.passwordInput.focus();
        await this.passwordInput.fill('');
        await this.passwordInput.type(text);
    }
}