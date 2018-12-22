<template>
    <div class="update-incident">   
        <h3>Update Incident Status</h3>
        <div class="row">
            <form @submit.prevent="updateIncident" class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="reporter" required>
                        <label class="active">Reporter</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="description" required>
                        <label class="active">Description</label>
                    </div>
                </div>
                <button class="btn" type="submit">Submit</button>
                <router-link to="/" class="btn grey">Cancel</router-link>
            </form>
        </div>
    </div>

</template>

<script>
import db from './firebaseInit'


export default {
    name: 'update-incident',
    data(){
        return {
            incident_id: null,
            reporter: null,
            description: null
        }
    },
    beforeRouteEnter(to, from, next){
        db.collection('incidents').where('incident_id',
        '==', to.params.incident_id).get()
        .then(QuerySnapshot => {
            QuerySnapshot.forEach(doc => {
                next(vi => {
                    vi.incident_id = doc.data().incident_id,
                    vi.reporter = doc.data().reporter,
                    vi.description = doc.data().description
                })
            })
        })
    },
    watch: {
        '$route': 'fetchData'
    },
    methods: {
        fetchData(){
            db.collection('incidents').where('incident_id', '==', this.$route.params.incident_id).get()
            .then(QuerySnapshot => {
                QuerySnapshot.forEach(doc => {
                    this.incident_id = doc.data().incident_id
                    this.reporter = doc.data().reporter,
                    this.description = doc.data().description
                })
            })
        },
        updateIncident(){
            db.collection('incidents').where('incident_id', '==', this.$route.params.incident_id).get()
            .then(QuerySnapshot => {
                QuerySnapshot.forEach(doc => {
                    doc.ref.update({
                        reporter: this.reporter,
                        description: this.description
                    })
                    .then(()=> {
                        this.$router.push({name: 'view-incident', params: {incident_id: this.incident_id}})
                    })
                })
            })
        }
    }
}
</script>
