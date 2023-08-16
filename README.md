<div align="center">
    <strong><h3>Flash</h3></strong>
    <p>An open source screenshot API built with Puppeteer and Express</p><hr />
</div>

## Configuration

Flash uses [dotenv](https://www.npmjs.com/package/dotenv) for configuration, which exists out of 2 keys:

-   `AUTH` — The value of the `authorization` header in requests
-   `PORT` — The port the Express server will be listening on

## Using Flash

`POST /`

```json
{
	"url": "https://google.com",
	"screenWidth": 1920, // The width of the Puppeteer page
	"screenHeight": 1920, // The height
	// The parameters above are required
	"clip": {
		"x": 0, // Clip zone horizontal offset
		"y": 0, // Clip zone vertical offset
		"width": 1920, // The width of the clip zone (screenshot)
		"height": 1080 // The height
	},
	"enableJavaScript": true, // Enable JavaScript on the page
	"wait": 0, // Bare time to wait on the page, in ms
	"waitForNetworkIdle": true, // If Puppeteer should wait until the page is network idling
	// (https://pptr.dev/api/puppeteer.page.waitfornetworkidle)
	"waitForSelector": false, // If Puppeteer should wait until the selector (CSS selector, string) is available on page
	"timeout": 1000, // The time Puppeteer will wait before returning nothing as response, in ms
	"scale": 1, // Like deviceScaleFactor
	// (https://pptr.dev/api/puppeteer.screenshotclip/#properties > scale)
	"full": false, // Take a screenshot of the entire page, not just the viewport
	// (https://pptr.dev/api/puppeteer.page.screenshot#remarks > fullPage)
	"type": "png", // png (default) / jpeg / webp
	"quality": 0 // Quality of image, 0 - 100, not applicable on png
}
```
