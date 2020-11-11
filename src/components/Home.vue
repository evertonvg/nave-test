<template>
    <section class="home">
        <transition name="slide" mode="out-in">
            <div class="alert alert-danger" v-show="message!=''">
                {{message}}
            </div>
        </transition>
        <menutop ref="menutop" />
        <div class="container">
            <div class="titles">
                <h1>Navers</h1>
                <router-link to="/add" title="home" class="default-button">Adicionar naver</router-link>
            </div>
            <div class="row">
                <transition-group name="slide" mode="out-in">
                    <div class="item" v-for="nav in navers " :key="nav.id" :class="`id${nav.id}`">
                        
                        <div class="photo" @click="loadnaver" :data-id="nav.id">
                            <img  :src="nav.url" :alt="nav.name" :data-id="nav.id">
                        </div>

                        <p class="name">{{nav.name}}</p>

                        <p class="function">{{nav.job_role}}</p>

                        <div class="buttons">

                            <button @click="showmodaldelete" :data-id="nav.id">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 21H18V7H6V21ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z" fill="#212121"/>
                                </svg>
                            </button>

                            <router-link :to="`/update/${nav.id}`">
                                <button>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM21.41 6.34L17.66 2.59L15.13 5.13L18.88 8.88L21.41 6.34Z" fill="#212121"/>
                                    </svg>
                                </button>
                            </router-link>
                        </div>
                    </div>
                </transition-group>
            </div>
            <div class="paginate" v-if="navers.length>4">
                <ul>
                    <li>
                        <button @click="prevpage" v-if="actualPage!=1" class="borderless">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.51 3.86998L15.73 2.09998L5.84 12L15.74 21.9L17.51 20.13L9.38 12L17.51 3.86998Z" fill="black"/>
                            </svg>
                        </button>
                    </li>
                    <li v-for="(item,index) in TotalPages" :key="item.id">
                        <button class="paginateitem" :class="{'active':actualPage==index+1}" @click="changepage">{{index+1}}</button>
                    </li>
                    <li>
                        <button @click="nextpage" v-if="actualPage!=TotalPages" class="borderless last">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.51 3.86998L15.73 2.09998L5.84 12L15.74 21.9L17.51 20.13L9.38 12L17.51 3.86998Z" fill="black"/>
                            </svg>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
        
        <modal :method="method" ref="modal" :dados="dados">
            <button class="excluir default-button" @click="deletenaver">Excluir</button>
        </modal>
        
    </section>
    
</template>
<script>

import modal from './modals/modal.vue'
import menutop from './menu/menu.vue'
import axios from 'axios'
export default {
    name:'home',
    components:{modal,menutop},
    metaInfo: {
        htmlAttrs: {
        lang: 'pt-BR',
        },
        title: 'Nave - Home',
        meta: [{ name: 'descrition', content: 'Listagem dos Navers.' }],
    },
    data(){
        return{
            navers:'',
            idnaver:'',
            message:'',
            method:'',
            primaryPage:1,
            actualPage:'',
            TotalPages:'',
            dados:''
        }
    },

    methods:{
        element(el){
            let element = el.target.parentNode.parentNode
            this.elem = element 
        },
        showmodaldelete(el){
            this.method = 'delete'
            this.$refs.modal.openmodal()
            this.idnaver = el.target.dataset.id
        },
        showmodalinfo(){
            this.method = 'info'
            this.showmodal = true
        },
        deletenaver(el){
            this.message='Deletando naver...',
            axios.delete(`https://navedex-api.herokuapp.com/v1/navers/${this.idnaver}`,
            {
                headers:{
                    "key": "Content-Type",
                    "type": "text",
                    "value": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(()=>{
                this.message='',
                this.$refs.modal.closemodal()
                let elem = document.querySelector(`.id${this.idnaver}`)
                elem.classList.add('slide-leave-active')
                setTimeout(()=>{
                    elem.remove()
                },290)
                this.$refs.modal.openmodal()
                this.method = 'deleteresult'
            })
            .catch((error)=>{
                console.log(error)
                this.message='Houve um erro ao deletar...'
            })
        },
        loadnaver(el){
            this.message="carregando naver..."
            this.method="show"
            axios.get(`https://navedex-api.herokuapp.com/v1/navers/${el.target.dataset.id}`,
            {
                headers:{
                    "key": "Content-Type",
                    "type": "text",
                    "value": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((res)=>{
                this.message=""
                this.dados = res.data
                this.$refs.modal.openmodal()
            })
            .catch((error)=>{
                console.log(error)
                this.message = 'Houve um erro, tente novamente.'
            })
        },

        updatenaver(el){
            console.log(el)
        },
        changepage(el){
            this.actualPage = el.target.innerHTML
            window.scrollTo(0, this.$refs.menutop.offsetTop)
        },
        prevpage(){
            this.actualPage--
            window.scrollTo(0, this.$refs.menutop.offsetTop)
        },
        nextpage(){
            this.actualPage++
            window.scrollTo(0, this.$refs.menutop.offsetTop)
        }
    },
    created(){
        this.$root.$refs.A = this;
        if(localStorage.getItem('login')!='true'){
            this.$router.push('/login')
        }
    },
    mounted(){
        if(localStorage.getItem('welcome')=='true'){
            this.message = 'Bem vindo'
            localStorage.removeItem('welcome')
        }
        this.message = 'Carregando Navers...'

        

        axios.get(`https://navedex-api.herokuapp.com/v1/navers`,
        {
            headers:{
                "key": "Content-Type",
                "type": "text",
                "value": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((res)=>{
            this.navers = res.data.slice().reverse()
            // console.log(this.navers[0].birthdate)
            this.message = ''
            if(this.navers.length==0){
                 this.message = 'Não há navers cadastrados'
            }

            this.TotalPages = parseInt((this.navers.length-0.1)/4) +1
            this.actualPage = 1
        })
        .catch((error)=>{
            console.log(error)
            this.message = 'Houve um erro, tente novamente.'
        })
    }
}
</script>
<style  type="text/scss" lang="scss" scoped>
    @import '../styles/variables.scss';
    .home{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        
        
        .container{
            max-width: 1200px;
            width: 100%;
        }
        .titles{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 32px;
            margin-bottom: 20px;
            margin-top: 125px;
            h1{
                font-weight: 600;
                font-size: 40px;
                line-height: 48px;
                color: $border1;
            }
        }
        .row{
            padding: 0 16px;
            width: 100%;
            .item{
                width: 25%;
                padding: 0 16px;
                float: left;
                cursor: pointer;
                margin-bottom: 32px;
                .photo{
                    overflow: hidden;
                    margin:0 auto;
                    max-width: 280px;
                    height:260px;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    img{
                        width: 100%;
                        max-width: 280px;
                        filter: grayscale(100%);
                    }
                }
                .name{
                    font-weight: 600;
                    font-size: 16px;
                    line-height: 18px;
                    color: $border1;
                    max-width: 280px;
                    margin: 0 auto;
                    margin-top: 16px;
                }
                .function{
                    font-weight: normal;
                    font-size: 16px;
                    line-height: 24px;
                    color: $border1;
                    max-width: 280px;
                    margin: 0 auto;
                    margin-top: 8px;
                }
                .buttons{
                    max-width: 280px;
                    margin: 0 auto;
                    margin-top: 16px;
                    button{
                        border: none;
                        background-color: transparent;
                        cursor: pointer;
                        margin-right: 10px;
                        position: relative;
                        z-index: 2;
                        svg{
                            position: relative ;
                            z-index: -1;
                        }
                    }
                }
            }
        }
    }
    .paginate{
        float: left;
        width: 100%;
        padding: 0 32px;
        text-align: center;
        margin-bottom: 100px;
        cursor: pointer;
        ul{
            display: flex;
            align-items: center;
            justify-content: center;
            li{
                list-style: none;
                margin:0 4px;
                button{
                    width:30px;
                    height: 30px;
                    border: none;
                    font-weight: 600;
                    background-color: transparent;
                    cursor: pointer;
                }
                .borderless{
                    border: none;
                }
                .last{
                    svg{
                        transform: rotate(180deg);
                    }
                }
                .active{
                    background-color: $border1;
                    color: white;
                }
            }
        }
    }
</style>