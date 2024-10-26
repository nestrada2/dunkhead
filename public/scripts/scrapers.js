// Puppeteer API - Web Scraping
const puppeteer = require("puppeteer");

// Scrape Product (2)
async function scrapeProduct(type) {
  // Launch the Browser
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  // Create Page
  const page = await browser.newPage();

  // Go to Website (1)
  await page.goto(
    "https://www.kicksonfire.com/tag/nike-sb-dunk?sort=" + type
  );

  // Call Helper Function: Keep Scrolling Till Resolution
  await autoScroll(page);

  // Select Shoe's Images, Names, & Details by xPath & Stored them in Separate Arrays
  const imgArr = await page.$x(
    '//*[@class="release-item-image"]/img'
  );
  const shoeNameArr = await page.$x(
    '//*[@class="release-item-title"]'
  );
  const shoeDetailArr = await page.$x(
    '//*[@class="release-price-from"]'
  );

  // Array to Store ONLY Nike Dunk SB
  let shoes = [];

  // Loop Through the Names of All the Upcoming Shoes
  for (let i = 0; i < shoeNameArr.length; i += 1) {
    // Current Shoe
    const el = shoeNameArr[i];
    const txt = await el.getProperty("textContent");
    const shoe = await txt.jsonValue();

    // Check if Current Shoe is a Nike Dunk SB
    if (shoe.includes("SB")) {
      // Retrieve Shoe's Image
      const el2 = imgArr[i];
      const src = await el2.getProperty("src");
      const imgURL = await src.jsonValue();

      // Retrieve Shoe's Details
      const el3 = shoeDetailArr[i];
      const txt2 = await el3.getProperty("textContent");
      let detail = await txt2.jsonValue();

      // Add the Current Nike Dunk SB in the Shoes Array
      shoes.push({ shoe: shoe, imgURL: imgURL, detail: detail });
    }
  }

  // Closes the Browser
  browser.close();

  // Return Shoes to use for Dunkhead Server
  return shoes;
}

// Helper Function: Scroll Page
async function autoScroll(page) {
  // Wait till the Page Loads (4)
  await page.evaluate(async function () {
    // Promise return something when done loading
    await new Promise(function (resolve) {
      // Keep Track of the Amount We've Scrolled
      let amountScrolled = 0;

      // How Far Down to Scroll
      let distance = window.innerHeight * 0.3;

      // Scroll the Page Every 20 milliseconds (3)
      let timer = setInterval(function () {
        // Total Height of the Webpage
        let totalPageHeight = document.body.scrollHeight;

        // Height of the Current View of the Page
        let viewportHeight = window.innerHeight;

        // scrolling by 30% of the Viewport each Time
        window.scrollBy(0, distance);

        // Update Height - Keeping Track how Much Total we Scrolled by
        amountScrolled += distance;

        // Checking if We Already Scrolled to the Bottom
        if (amountScrolled >= totalPageHeight - viewportHeight) {
          // Stop Scrolling
          clearInterval(timer);

          // Terminate Thread
          resolve();
        }
      }, 20);
    });
  });
}

module.exports = scrapeProduct;

/*
-------------------- Footnotes --------------------
    1. Type can be either upcoming, popular, or past. All have the same URL except for last part after '='. 
    https://www.kicksonfire.com/tag/nike-sb-dunk?sort=upcoming
    https://www.kicksonfire.com/tag/nike-sb-dunk?sort=popular
    https://www.kicksonfire.com/tag/nike-sb-dunk?sort=past

    2. 'async' creates a new thread anytime you call it therefore you have to tell javascript please wait for it to finish 
    before trying to store the information it returns. 'await' blocks the current thread until it is finished running.

    3. Here are storing 'setInterval()' in a variable so that we are able to stop it when we reach the bottom of the page
    otherwise, we can't stop scrolling the page. And nest it in a promise becaue it allows us to wait for the 'setInterval()' 
    to finish. 

    4. page.evaluate() allows us to font-end javascript code that can reference the dom elements. in this instance the body 
    because we are reference the body so we can scrolled through it.


-------------------- References --------------------
    Pupeteer - https://pptr.dev/
    Page.evaluate() - https://pptr.dev/api/puppeteer.page.evaluate
    Async/Await - https://www.w3schools.com/js/js_async.asp
    scrollBy - https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollBy
    resolve() - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve
    Auto Scrolling to Force Lazy Loading - https://stackoverflow.com/questions/51529332/puppeteer-scroll-down-until-you-cant-anymore
*/
