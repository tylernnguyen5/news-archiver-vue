<template>
  <div class='content container'>

    <!-- Screenshot -->
    <div class="slider">
        <ul class="slides">
            <li v-for="(link, index) in screenshots" :key="index">
                <img height="400" :src="link">
            </li>
        </ul>
    </div>

    <!-- Headlines -->
    <div class="section">
        <ul class="collection">
            <li class="collection-item left-align" v-for="headline in headlines" :key="headline.id">
                <a class="headline" :href="headline.url" target="_blank">
                    <b>{{ headline.headline }}</b>
                </a>
                <p class="timestamp">{{ headline.timestamp.toDate() }}</p>
            </li>
        </ul>
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
            screenshots: [],
            currTime: new Date(2020, 7, 7) // FIXME: Edit currTime
        }
    },
    methods: {
        getHeadlines(date) { 

            // Retrive data from Firestore
            db.collection('cnn')
            .get()
            .then(snapshot => snapshot.docs.forEach(doc => {
                let timestamp = doc.data().timestamp.toDate();
                timestamp.setHours(0, 0, 0, 0);

                // Filter data with the specified date
                let passed = timestamp.valueOf() === date.valueOf();   

                if (passed) {
                    let element = {
                        id: doc.id,
                        headline: doc.data().headline,
                        timestamp: doc.data().timestamp,
                        url: doc.data().url,
                    };

                    this.headlines.push(element);
                }
            }))
            .catch(err => console.log(err));

            console.log("Headlines: ", this.headlines); 
        },

        async getScreenshot(date) {

            // Reference to cloud storage
            let storageRef = storage.ref("screenshots/cnn");

            storageRef.listAll().then(res => {  // List all screenshots

                // Filter screenshots with the specified date
                res.items.forEach(async itemRef => {
                    let passed = await itemRef.getMetadata().then(metadata => {
                        let timeCreated = new Date(metadata.timeCreated);
                        timeCreated.setHours(0, 0, 0, 0)

                        return timeCreated.valueOf() === date.valueOf();
                    })

                    if (passed) {
                        let url = await itemRef.getDownloadURL();
                        this.screenshots.push(url);
                    }

                });
            }).catch(err => console.log(err));

            console.log("Screenshots: ", this.screenshots)
        },

        updateContent() {
            this.headlines = [];
            this.screenshots = [];

            this.getScreenshot(this.currTime);
            this.getHeadlines(this.currTime);
        },

        reinit() {
            var elems = document.querySelectorAll('.slider');
            var instances = M.Slider.init(elems, {indicators: true});
        }
    },
    // Hooks
    created() {
        console.log("created() Hook");
        this.updateContent();        
    },
    mounted() { // FIXME: might remove
        console.log("mounted() Hook");

        var elems = document.querySelectorAll('.slider');
        var instances = M.Slider.init(elems, {indicators: true});
    },
    updated() {
        console.log("udpated() Hook");

        var elems = document.querySelectorAll('.slider');
        var instances = M.Slider.init(elems, {indicators: true});
    }
}
</script>

<style scoped>
.headline{
    font-size: 1.25em;
}
.timestamp{
    font-size: 0.75em;
    font-style: italic;
}
</style>