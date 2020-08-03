<template>
  <div class='content container'>
      <h1>Today Archive</h1>

      <div class="screenshot" v-for="(link, index) in screenshots" :key="index">
        <img :src="link">
      </div>

      <div class="headlines" v-for="(headline, index) in headlines" :key="index">
          <li>{{ headline.headline }}</li>
      </div>

  </div>
</template>

<script>
import { db, storage } from '@/firebase/init'

export default {
    name: 'Content',
    data() {
        return {
            headlines: [],
            screenshots: []
        }
    },
    methods: {
        getHeadlines() { // FIXME:
            db.collection('cnn')
                .get()
                .then((snapshot) => {
                    snapshot.docs.forEach( doc => {
                        console.log(doc.id); 
                        console.log(doc.data().headline);
                        console.log(doc.data().url);
                        console.log(doc.data().timestamp);
                    })
                })
                .catch(err => console.log('Error getting documents from Firestore', err));
        },
        async getScreenshot(date) {
            console.log("Getting screenshot");
            // console.log(date);

            // Reference to cloud storage
            let storageRef = storage.ref("screenshots/cnn");

            // List all screenshots
            storageRef.listAll().then(res => {
                // Filter the screenshots with the specified date (via 'timeCreated' metadata of the image)
                res.items.filter(itemRef => {
                    itemRef.getMetadata().then(metadata => {
                        let timeCreated = new Date(metadata.timeCreated);
                        timeCreated.setHours(0, 0, 0, 0)

                        // FIXME: delete logging
                        // console.log("timeCreated: ", timeCreated);
                        // console.log("date: ", date);
                        return timeCreated.valueOf() === date.valueOf();
                    })
                })

                // Obtain the Cloud Storage links to the screenshots
                res.items.forEach(async itemRef => {
                    let url = await itemRef.getDownloadURL();
                    this.screenshots.push(url);
                });
            }).catch(err => console.log(err));
        }
    },
    created() {
        // this.getScreenshot(new Date(2020, 6, 29));
        // this.getHeadlinesData();
    }
}
</script>

<style>

</style>