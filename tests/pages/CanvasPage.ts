import { Page } from '@playwright/test';

export class CanvasPage {
    constructor(private page: Page) { }

    // URL navigation
    async navigate() {
        await this.page.goto('http://htmlcanvasstudio.com/');
    }


    // Selecting the tool button
    async selectTool(tool: 'line' | 'rectangle' | 'eraser') {
        const toolButton = {
            line: 'Draw a line',
            rectangle: 'Draw a rectangle',
            eraser: 'Use eraser',
        };
        await this.page.getByRole('button', { name: toolButton[tool] }).click();
    }
    // locating and clicking the canvas
    async clickOnCanvas(position: { x: number; y: number }) {
        await this.page.locator('#imageTemp').click({ position });
    }
    // To draw an line
    async drawLine(start: { x: number; y: number }, end: { x: number; y: number }) {
        await this.selectTool('line');
        await this.clickOnCanvas(start);
        await this.clickOnCanvas(end);
    }
    // To Draw an Rectangle
    async drawRectangle(start: { x: number; y: number }, end: { x: number; y: number }) {
        await this.selectTool('rectangle');
        await this.clickOnCanvas(start);
        await this.clickOnCanvas(end);
    }


    //Erase Function // Click hold and drag
    async erase(start: { x: number; y: number }, end: { x: number; y: number }) {
        await this.selectTool('eraser');
        const canvasBox = await this.page.locator('#imageTemp').boundingBox();
        if (!canvasBox) throw new Error('Canvas not found');

        await this.page.locator('#imageTemp').click({ position: start });
        await this.page.mouse.down();
        await this.page.mouse.move(canvasBox.x + end.x, canvasBox.y + end.y, { steps: 10 });
        await this.page.mouse.up();
    }
}
