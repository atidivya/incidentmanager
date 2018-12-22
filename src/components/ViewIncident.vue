<template>
    <div id="view-incident">
        <ul class="collection with-header">
            <li class="collection-header">
                <h4>{{reporter}}</h4>
            </li>
            <li class="collection-item">Incident ID#: {{incident_id}}</li>
            <li class="collection-item">Department: {{incident_for}}</li>
            <li class="collection-item">Description: {{description}}</li>
        </ul>
        <router-link to="/" class="btn grey">Back</router-link>
        <button @click="deleteEmployee" to="/" class="btn red">Delete</button>
        <div class="fixed-action-btn">
            <router-link v-bind:to="{name: 'update-incident', params: {incident_id: this.$route.params.incident_id}}" class="btn-floating btn-large red">
                <i class="fa fa-pencil"></i>
            </router-link>
        </div>
    </div>
</template>

<script>
import db from './firebaseInit'
export default {
    name: 'view-incident',
    data(){
        return {
            incident_id: null,
            incident_for: null,
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
                    vi.incident_for = doc.data().incident_for,
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
                    this.incident_id = doc.data().incident_id,
                    this.incident_for = doc.data().incident_for,
                    this.reporter = doc.data().reporter,
                    this.description = doc.data().description
                })
            })
        },
        deleteEmployee(){
            if(confirm('Are you sure?')){
                db.collection('incidents').where('incident_id', '==', this.$route.params.incident_id).get()
                .then(QuerySnapshot => {
                QuerySnapshot.forEach(doc => {
                    doc.ref.delete()
                    this.$router.push('/')
                })
              })
            }
        }
    }
}
</script>
