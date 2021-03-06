const admin = require("firebase-admin");
admin.initializeApp();

const functions = require("firebase-functions");
const db = admin.firestore();
const bucket = admin.storage().bucket();

const fs = require("fs");

// ======================================================================================

// Puppeteer (custom module)

const myPuppeteer = require("./modules/my-puppeteer.js");

// ======================================================================================

// Schedule Cloud Function (PubSub)
exports.scheduledFunction = functions
	.runWith({ 
		timeoutSeconds: 540,
		memory: '2GB' 
    }).pubsub.schedule("0 */2 * * *") 	// Crontab: every 2 hours
  	.onRun(async (context) => {
		console.log("This function will be run every 2 hours!");

		// Scrape with Puppeteer
		const data = await myPuppeteer.scrapeAndScreenshot();	

		const { headlines, filename } = data;

		// Adding data to Firestore
        console.log("Adding data to Firestore");
		headlines.forEach(value => addHeadlinesData(value));

		// Adding data to Cloud Storage
        console.log("Adding data to Cloud Storage");
        addScreenshotData(filename);

	});

// ======================================================================================

// Firestore Implementation

// Add data 
// This function is for adding new documents into 'cnn' collections in Firestore 
function addHeadlinesData(value) {
    const data = {
        headline: value.headline,
        url: value.url,
        timestamp: admin.firestore.Timestamp.fromDate(new Date())
    };

    db.collection("cnn")
		.add(data)
		.then(console.log("New data added"))
		.catch(err => console.log("Error adding documents from Firestore", err));
}

// ======================================================================================

// Cloud Storage Implementation

// Upload screenshot
async function addScreenshotData(filename) {
    await bucket.upload(`/tmp/screenshots/${filename}`, 
        { destination: `screenshots/cnn/${filename}`}, 
        (err, file) => {
            if (err) throw err;
            else {
                console.log(`New file uploaded: ${file.name}`);

                // Remove file
                fs.unlink(`/tmp/screenshots/${filename}`, () => console.log(`File removed: ${filename}`));
            }    
        });
}