import Vue from 'vue'
import Vuex, { Store } from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        showmodal:false,
    },
    getters:{
        modal(){
            return state.showmodal
        }
    },
    setters:{
        openmodal(){
            showmodal = true
        },
        closemodal(){
            showmodal = false
        }
    }
})