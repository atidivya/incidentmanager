<template>
    <div id="new-incident">
        <h3>New Incident</h3>                
        <div class="row">
            <form @submit.prevent="saveIncident" class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                        <input disabled placeholder="" type="text" class="validate" v-model="size">
                        <label class="active">Incident ID#</label>
                    </div>
                </div>
                
                <div class="row">
                    <div class="input-field col s12">
                        <select v-model="incident_for" required>
                            <option value="" disabled selected>Choose your option</option>
                            <option value="IT">IT</option>
                            <option value="Business">Business</option>
                        </select>
                        <label>Choose Concerned Department</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="reporter" required>
                        <label>Reporter</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="description" required>
                        <label>Description</label>
                    </div>
                </div>
                <button class="btn" type="submit">Submit</button>
                <router-link to="/" class="btn grey">Cancel</router-link>
            </form>
        </div>
    </div>
</template>

<script>

$(document).ready(function(){
    $('select').formSelect();
});

import db from './firebaseInit'


db.collection('incidents').get().then(snap => {
            let size = snap.size;
})

export default {
    name: 'new-incident',
    data(){
        return {
            size: null,
            incident_id: null,
            incident_for: null,
            reporter: null,
            description: null
        }
    },
    created(){
        db.collection('incidents').get().then(snap => {
            this.size = snap.size + 1;
        })  
    },
    beforeMount(){
        this.loadJquery()
    },
    methods: {
        loadJquery(){
            $(document).ready(function(){
                $('select').formSelect();
            });
        },
        saveIncident(){
            db.collection('incidents').add({
                incident_id: this.size,
                incident_for: this.incident_for,
                reporter:this.reporter,
                description:this.description
            })
            .then(docRef => this.$router.push('/'))
            .catch( error => console.log(error))
        }
    }
}
</script>
