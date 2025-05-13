import { test, expect } from '@playwright/test';

test('canvas ui automation', async ({ page }) => {

  // Step 1 Go to URL
  await page.goto('http://htmlcanvasstudio.com/');

  // Step 2 Click on Draw a line button
  await page.getByRole('button', { name: 'Draw a line' }).click();

  // Defining Starting and Ending Positions 
  const horizontalLineStart = { x: 175, y: 170 };
  const horizontalLineEnd = { x: 370, y: 170 };
  const verticalLineStart = { x: 270, y: 81 };
  const verticalLineEnd = { x: 270, y: 265 };

  const canvas = page.locator('#imageTemp');
  const canvasBox = await canvas.boundingBox();

  if (!canvasBox) throw new Error('Canvas not found');

  const startX = canvasBox.x + horizontalLineEnd.x;
  const startY = canvasBox.y + horizontalLineEnd.y;


  //Step 3 Drawing an Horizontal Line
  await page.locator('#imageTemp').click({
    position: horizontalLineStart
  });

  await page.locator('#imageTemp').click({
    position: horizontalLineEnd
  });


  // Step 4  Drawing an Vertical Line intercepting
  await page.locator('#imageTemp').click({
    position: verticalLineStart
  });

  await page.locator('#imageTemp').click({
    position: verticalLineEnd
  });

  // Step 5 Click an Draw a Rectangle
  await page.getByRole('button', { name: 'Draw a rectangle' }).click();

  //Step 6 Drawing a Rectangle // hardocoded positions just to differentiate
  await page.locator('#imageTemp').click({
    //starting position
    position: {
      x: 27,
      y: 228
    }
  });
  //ending position
  await page.locator('#imageTemp').click({
    position: {
      x: 197,
      y: 339
    }
  });
  // Step 7 Click on Erase button
  await page.getByRole('button', { name: 'Use eraser' }).click();

  // Erasing the Horizontal line //// Click hold and drag
  await page.locator('#imageTemp').click({ position: horizontalLineStart });

  await page.mouse.down();
  await page.mouse.move(startX, startY, { steps: 10 });
  await page.mouse.up();

  //await page.waitForTimeout(1000);
  await page.pause();
});