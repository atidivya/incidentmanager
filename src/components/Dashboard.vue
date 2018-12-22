<template>
    <div id="dashboard">
        <ul class="collection with-header">
            <li class="collection-header">
                <h4>Incidents</h4>
            </li>
            <li v-for="incident in incidents" v-bind:key="incident.id" class="collection-item">
                <div class="chip">{{incident.incident_for}}</div>{{incident.incident_id}}:{{incident.reporter}}

                <router-link 
                class="secondary-content" 
                v-bind:to="{
                    name: 'view-incident', 
                    params: {incident_id: incident.incident_id}
                    }">
                    <i class="fa fa-eye"></i>
                </router-link>
            </li>
        </ul>
        <div class="fixed-action-btn">
            <router-link to="/new" class="btn-floating btn-large red">
                <i class="fa fa-plus"></i>
            </router-link>
        </div>
    </div>
</template>

<script>
import db from './firebaseInit'
export default {
    name: 'dashboard',
    data(){
        return {
            incidents: []
        }
    },
    created(){
        db.collection('incidents').orderBy('reporter').get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                const data = {
                    'id': doc.id,
                    'incident_id': doc.data().incident_id,
                    'incident_for': doc.data().incident_for,
                    'reporter': doc.data().reporter,
                    'description': doc.data().description
                }
                this.incidents.push(data)
            })
        })
    }
}
</script>
