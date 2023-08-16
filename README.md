<div align="center">
    <strong><h3>Flash</h3></strong>
    <p>An open source screenshot API built with Puppeteer and Express</p><hr />
</div>

## Configuration

Flash uses [dotenv](https://www.npmjs.com/package/dotenv) for configuration, which exists out of 2 keys:

- `AUTH` — The value of the `authorization` header in requests
- `PORT` — The port the Express server will be listening on

## Using Flash

`POST /`

```json
{
	"url": "https://google.com", // The url of the website to screenshot
	"screenWidth": 1920, // The width of the Puppeteer page
	"screenHeight": 1080, // The height
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

## Examples

`POST /`

```json
{
	"url": "https://www.google.com/?hl=en",
	"screenWidth": 1920,
	"screenHeight": 1080,
	"enableJavaScript": true
}
```

Response returned in 383ms
![example](https://github.com/RobertsSpaceIndustries/Flash/assets/49074962/cb963bec-339a-4956-9abf-ff56adfdecc2)

---

`POST /`
```json
{
	"url": "https://www.youtube.com/?hl=en",
    	"screenWidth": 1920,
    	"screenHeight": 1080,
    	"enableJavaScript": true,
    	"wait": 1000
}
```

Response returned in 2.78s
![example-2](https://github.com/RobertsSpaceIndustries/Flash/assets/49074962/fe0b8769-a419-4ca4-a12c-1ae9c9e37d48)
