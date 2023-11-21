const puppeteer = require('puppeteer');

describe('show or hide an event details', () => {
    let browser, page;
    beforeAll(async () => {
        browser = await puppeteer.launch({
            // headless: false,
            // slowMo: 250,
            timeout: 0,
        });
        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('.card');
    });

    afterAll(() => {
        browser.close();
    });
    test('An event element is collased by default', async () => {
        const eventDetails = await page.$('.card .details');
        expect(eventDetails).toBeNull();
    });
    test('User can expand an event to see its details', async () => {
        await page.click('.card .details-btn');
        const eventDetails = await page.$('.card .details');
        expect(eventDetails).toBeDefined();
    });
    test('User can collapse an event to hide details', async () => {
        await page.click('.card .details-btn');
        const eventDetails = await page.$('.card .details');
        expect(eventDetails).toBeNull();
    });
});
