import { test } from '@playwright/test';
import { CanvasPage } from './pages/canvasPage';

test('canvas UI automation with simplified POM', async ({ page }) => {
    const canvasPage = new CanvasPage(page);

    // Going to the URL
    await canvasPage.navigate();

    // Defining the Positions of Line and Rectangle
    const horizontalLineStart = { x: 175, y: 170 };
    const horizontalLineEnd = { x: 370, y: 170 };

    const verticalLineStart = { x: 270, y: 81 };
    const verticalLineEnd = { x: 270, y: 265 };

    const rectangleStart = { x: 27, y: 228 };
    const rectangleEnd = { x: 197, y: 339 };

    // Drawing an Horizontal Line
    await canvasPage.drawLine(horizontalLineStart, horizontalLineEnd);

    // Drawing an Vertical Line
    await canvasPage.drawLine(verticalLineStart, verticalLineEnd);

    // Drawing an Rectangle
    await canvasPage.drawRectangle(rectangleStart, rectangleEnd);

    // Erasing the Horizontal line
    await canvasPage.erase(horizontalLineStart, horizontalLineEnd);

    //await page.waitForTimeout(1000);
    await page.pause();
});
