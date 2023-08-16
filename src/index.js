require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const puppeteer = require("puppeteer");
const app = express();

// Authorization header check middleman
app.use((req, res, next) => {
	if (req.headers.authorization !== process.env.AUTH) return res.writeHead(401), res.end();
	next();
});
// Use the body-parser Json
app.use(bodyParser.json());

(async () => {
	const browser = await puppeteer.launch({
		headless: "new",
		args: ["--no-sandbox"],
		protocolTimeout: 180_000 * 2, // Timeout setting for individual protocol (CDP) calls. (https://pptr.dev/api/puppeteer.browserconnectoptions#properties)
	});

	app.post("/", async (req, res) => {
		// Bring variable outside the try-catch scope so it can be closed at the end
		let page;
		try {
			if (req.headers["content-type"] !== "application/json") return res.writeHead(415);
			// Required parameters
			if (!req.body.url || !req.body.screenWidth || !req.body.screenHeight) return req.writeHead(400);

			page = await browser.newPage();
			await page.setJavaScriptEnabled(req.body.enableJavaScript || false);
			await page.setViewport({ width: req.body.screenWidth, height: req.body.screenHeight, deviceScaleFactor: req.body.scale || 1 });
			await page.goto(req.body.url);

			// Timeout parameter, end the process early and don't return the image because it's 'taking too long'
			let operationsComplete = false;
			if (req.body.timeout) {
				setTimeout(async () => {
					if (!operationsComplete) {
						await page.close();
						page = null;

						if (res.writable) {
							res.writeHead(408);
						}
						if (!res.closed) {
							res.end();
						}
					}
				}, req.body.timeout);
			}

			if (req.body.waitForNetworkIdle && page) {
				await page.waitForNetworkIdle();
			}
			if (req.body.waitForSelector && page) {
				await page.waitForSelector(req.body.waitForSelector);
			}
			if (req.body.wait && page) {
				await new Promise((r) => setTimeout(r, req.body.wait));
			}

			operationsComplete = true;

			if (!page) return;

			let options = {
				type: req.body.type || "png",
				fullPage: req.body.full || false,
				clip: req.body.clip,
			};
			if (req.body.quality && req.body.type !== "png") {
				options.quality = req.body.quality;
			}
			const screenshot = await page.screenshot(options);
			if (res.writable) {
				res.write(screenshot);
			}
		} catch (err) {
			console.error(err);
			if (res.writable) {
				res.writeHead(500);
			}
		} finally {
			res.end();

			if (page) {
				// Close the page as it won't be used anymore, catch the error and do nothing with it
				page.close().catch(() => {});
			}
		}
	});
})();

app.listen(process.env.PORT);
