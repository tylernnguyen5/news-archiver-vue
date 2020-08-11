<template>
	<div class='content container'>
        <!-- Modal Trigger -->
        <div class="row">
            <div class="col s3 offset-s3">
                <a class="waves-effect waves-light btn modal-trigger" href="#modal1">Instruction</a>
            </div>
            <div class="col s3">
                <a class="waves-effect waves-light btn modal-trigger" href="#modal2">How it works</a>
            </div>
        </div>

        <!-- Modal Structure -->
        <div id="modal1" class="modal">
            <div class="modal-content">
                <h4>Instruction</h4>
                <hr>
                <p>
                    I have have archived the screenshots and headlines on CNN News website <b>from ___ to ___</b>
                    <br>
                    <br>
                    Please pick a date from the calendar below to view the archives on the selected date.
                </p>
            </div>
            <div class="modal-footer">
                <a class="modal-close waves-effect waves-green btn-flat">Dismiss</a>
            </div>
        </div>

        <div id="modal2" class="modal">
            <div class="modal-content">
                <h4>How it works</h4>
                <hr>
                <p>
                    This is an application that archives the news headlines, theirs URLs and a screenshot of the home page in a cloud storage, so that you can view them all at once when you are free in the day.
                    <br>
                    <br>
                    The application involves an underlying Scheduled Cloud Function that is executed <b>every 15 minutes</b> and uses <b>Puppeteer</b> to scrape data from CNN News website. In terms of data, the headlines and URLs are stored in Firestore, and the screenshots are stored in Cloud Storage  with <b>Firebase</b>.
                </p>
            </div>
            <div class="modal-footer">
                <a class="modal-close waves-effect waves-green btn-flat">Dismiss</a>
            </div>
        </div>

		<!-- Datepicker -->
		<div class="input-field inline red lighten-3 hoverable">
			<i class="material-icons prefix">calendar_today</i>
			<input type="text" class="datepicker centen-align white-text">
		</div>
		
		<!-- Screenshot -->
		<div class="slider" v-if="screenshots.length != 0">
			<ul class="slides">
				<li v-for="(link, index) in screenshots" :key="index">
					<img :src="link">
				</li>
			</ul>
		</div>
		<div class="feedback red-text card-panel center-align" v-else>
			Sorry, there is no archive for this date.
		</div>

		<!-- Headlines -->
		<div class="section">
			<ul class="collection">
				<li class="collection-item left-align hoverable" v-for="headline in headlines" :key="headline.id">
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
            currTime: new Date()
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

        logging() { // FIXME: delete
			console.log('Current Time: ', this.currTime);
			
			let instance = M.Datepicker.getInstance(document.querySelector('.datepicker'));
			console.log('Picker Date: ', instance.date);
			console.log('Picker Options: ', instance.options);
		},
	},
	watch: {
		'currTime': function() {
			this.updateContent()
		},
	},

    // Hooks
    created() {
        console.log("created() Hook");
        this.updateContent();        
	},
    mounted() {
        console.log("mounted() Hook");

		// Modals initialization
        let modal = document.querySelectorAll('.modal');
        let modalIntances = M.Modal.init(modal);

		// Slider initialization
        let slider = document.querySelectorAll('.slider');
        let sliderIntances = M.Slider.init(slider, {indicators: true, height: 600});

		// Datepicker initialization
        let datepicker = document.querySelectorAll('.datepicker');
        let datepickerInstances = M.Datepicker.init(datepicker, {
            format: 'dd mmmm, yyyy',
			showDaysInNextAndPreviousMonths: true,
			onClose: () => {
				let instance = M.Datepicker.getInstance(document.querySelector('.datepicker'));
				this.currTime = instance.date;
			},
			setDefaultDate: true,
			defaultDate: this.currTime,
		});
    },
    updated() {
        console.log("udpated() Hook");

		// Slider re-initialization
        let slider = document.querySelectorAll('.slider');
        let sliderIntances = M.Slider.init(slider, {indicators: true, height: 600});
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
.feedback{
	padding-top: 1.5em;
	font-size: 2em;
}
i{
  filter: invert(96%) sepia(96%) saturate(0%) hue-rotate(66deg) brightness(103%) contrast(107%);
}
.row{
    padding-top: 2em;
}
</style>