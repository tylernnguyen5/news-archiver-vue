# Problems while working on the project

## Puppeteer and Chromium on Google Cloud Function

While working on the project, I encountered a problem where the Puppeteer cannot be correctly executed when running on Google Cloud Function due to **the incompatibility between the version of Puppeteer and Chromium on the Google Cloud Platform**.

After researching through multiple threads and package release notes, Google Team acknowlegdes this problem and apparently planned to fix this issue in the next few releases. 

```
Error with launching Puppeteer browser: TimeoutError: Timed out after 30000 ms while trying to connect to the browser! Only Chrome at revision r782078 is guaranteed to work.
```

**Solutions that I tried:** 
- *Downgrading Puppeteer to v2.1.1 / v3.1.1 and run with Nodejs 10 engine*
- *Installing separated Chromium dependency*
- *Upgrading Nodejs engine to v12*
- *Removing incognito context for Puppeteer browser*
- *Rewrite browser promise*
- *Running Puppeteer with v5.2.1 locally (successfully)*

**Progress:**

- *Testing Puppeteer locally with simple examples works (puppeteer@v5.2.1)*
- *Some people said Puppeteer worked with Cloud Function with v2.1.0 / v1.14.0 / v3.0.4 / v1.9.0*
- *Function worked with puppeteer@5.2.1 + Nodejs Engine 12 + No incognito context, but failed when handling screenshot*
- *Puppeteer can be launched from Cloud Function, but no page content was retrieved*
- **RESOLVED:** *Downgraded to Nodejs Engine 10 + puppeteer@5.2.1 + No incognito context + Removing `[--'no-sandbox', '--disable-setuid-sandbox']` from launch configuration*

## Saving screenshots

My initial approach was to create a `screenshots` directory in Google Cloud Functions runtime, but after a few deployments, I found out that the only one directory that is writable by my code is the `/tmp` directory. 

Therefore, I decided to create the `screenshots` in `/tmp` to store my screenshot(s). The `/tmp` would be emptied after the excecution is finalized.

## Implement calendar from scratch

This took a little bit of time, but I managed to complete it. However, since `Materialize CSS` has a **12-column Grid System** and I have *7 columns for 7 days in a week*, I have not been able to center the component. This is one of the downsides of `Materializee CSS` compared to `Bootstrap`, which addressed this problem in their recent package releases.

I might be able to fix this when I do the styling for the application.

## Using Firebase Admin SDK

My initial intention was being able to use `Firebase Admin SDK` in order to simplify the implementation process and package installation. However, the `Admin SDK` is only allowed in the privileged environment. Since the `Vue.js` web app environment is not privileged, I need to use a regular `Web SDK for Firebase`. Otherwise I might expose my credentials to all the users interacting with the application.

*![Source](https://stackoverflow.com/questions/51053504/firebase-admin-sdk-vue-webpack-typeerror-rtdb-initstandalone-is-not-a-funct)*

## Rendering flow of Materialize CSS and Vue.js

I had some problems while trying to rendering some interactive and animated components for the application such as screenshots sliders. As I researched, one needs to be initialized before another and when values change, re-initialization is required.

*Resolved:* So what I have found is that for a more optimized loading of Materialize, it should be inited at the end of the <body> tag instead of in the <head> tag, which is one of my early approach. Also for the Vue component file, a life cycle hook at *updated()* should be defined to re-initialize the Materialize CSS component when there is new data retrieved. This is essentially for when we are fetching data from a remote database.

## Access links to the news articles

Even though I do scrape the correct link from each headline on CNN website, it is inaccessible with the link from my web application. To examine this issue, I have carefully compare the link that I stored in the database and the link of the article which I access directly from CNN website. They are identical.

A therotical possibility is that CNN prevents this action in order to conserve their legitimacy and validity of their sources of infomation.

## Sidenav

As first, I wanted to have a sidebar to have a calendar in it. As I learned about the sidenav, it is very limited to what you can put in the sidenav, the size of it and how it is laid out on the page. Materialize is quite new, so I think they will probably update this in the future.