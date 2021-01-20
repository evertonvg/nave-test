<template>
  <section>
    <transition name="slide" mode="out-in">
      <div class="alert alert-warning" v-show="message != ''">
        {{ message }}
      </div>
    </transition>

    <menutop />

    <div class="addnaver">
      <div class="return">
        <h2>
          <router-link to="/home" title="home">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.51 3.86998L15.73 2.09998L5.84 12L15.74 21.9L17.51 20.13L9.38 12L17.51 3.86998Z"
                fill="black"
              />
            </svg>
          </router-link>
          <span v-if="this.$route.path == '/add'"> Adicionar Naver </span>
          <span v-else> Atualizar Naver </span>
        </h2>
      </div>

      <div class="fields">
        <div class="item">
          <label for="nome">Nome</label>
          <input type="text" placeholder="Nome" v-model="name" id="nome" />
        </div>

        <div class="item">
          <label for="cargo">Cargo</label>
          <input
            type="text"
            placeholder="Cargo"
            v-model="job_role"
            id="cargo"
          />
        </div>

        <div class="item">
          <label for="idade">Data de nascimento</label>
          <input
            type="date"
            placeholder="Data de nascimento"
            v-model="birthdate"
            id="idade"
            min="1970-01-01"
            :max="actualDate"
          />
        </div>

        <div class="item">
          <label for="tempo">Data de admissão</label>
          <input
            type="date"
            placeholder="Data de admissão"
            v-model="admission_date"
            id="tempo"
            min="1970-01-01"
            :max="actualDate"
          />
        </div>
        <div class="item">
          <label for="projetos">Projetos que participou</label>
          <input
            type="text"
            placeholder="Projetos que participou"
            v-model="project"
            id="projetos"
          />
        </div>
        <div class="item">
          <label for="url">URL da foto do Naver</label>
          <input
            type="text"
            placeholder="URL da foto do naver"
            v-model="url"
            id="url"
          />
        </div>
        <div class="submit">
          <button
            class="default-button"
            @click="submitnaver"
            v-if="this.$route.path == '/add'"
            :disabled="
              name.length < 3 ||
              job_role.length < 3 ||
              birthdate.length < 10 ||
              admission_date.length < 10 ||
              project.length < 3 ||
              url.length < 5
            "
          >
            Salvar
          </button>
          <button
            class="default-button"
            @click="updatenaver"
            v-else
            :disabled="
              name.length < 3 ||
              job_role.length < 3 ||
              birthdate.length < 10 ||
              admission_date.length < 10 ||
              project.length < 3 ||
              url.length < 5
            "
          >
            Atualizar
          </button>
        </div>
      </div>
    </div>

    <modal :method="method" ref="modal"> </modal>
  </section>
</template>

<script>
import menutop from './menu/menu.vue'
import modal from './modals/modal.vue'
import axios from 'axios'

export default {
    name:'addNaver',
    props:['idp','namep','birthdatep','admission_datep','projectp','job_rolep'],
    components:{menutop,modal},
    data(){
        return{
            id:'',
            name:'',
            job_role:'',
            birthdate:'',
            admission_date:'',
            project:'',
            url:'',
            message:'',
            method:'',
            actualDate:''
        }
    },
     metaInfo: {
        htmlAttrs: {
        lang: 'pt-BR',
        },
        title: 'Nave - Adicionar Navers',
        meta: [{ name: 'descrition', content: 'Adição de Navers.' }],
    },
    computed:{
        dataact(){
            let datab = new Date().toLocaleDateString("pt-BR").split('/').reverse().join('-')
            return datab
        }
    },
    methods:{
        submitnaver(){
            this.message = 'Adicionando naver...'
            axios.post(`https://navedex-api.herokuapp.com/v1/navers`,
            {
                name:this.name,
                url:this.url.replaceAll('/','barramentosimb'),
                job_role:this.job_role,
                admission_date: this.admission_date.split('-').reverse().join('/'),
                birthdate:this.birthdate.split('-').reverse().join('/'),
                project:this.project,
            },
            {
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                    "key": "Content-Type",
                    "type": "text",
                    "value": "application/json",
                }
            })
            .then(()=>{
                this.message = ''
                this.$refs.modal.openmodal()
                this.method = 'add'
                this.name = ''
                this.url = ''
                this.job_role = ''
                this.admission_date = ''
                this.birthdate = ''
                this.project = ''

            })
            .catch((error)=>{
                console.log(error)
                this.message = 'Erro ao adicionar naver'
            })
        },
        updatenaver(){
            this.message = 'Atualizando naver...'
            axios.put(`https://navedex-api.herokuapp.com/v1/navers/${this.$route.params.id}`,
            {
                name:this.name,
                url:this.url.replaceAll('/','barramentosimb'),
                job_role:this.job_role,
                admission_date: this.admission_date.split('-').reverse().join('/'),
                birthdate:this.birthdate.split('-').reverse().join('/'),
                project:this.project,

            },
            {
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                    "key": "Content-Type",
                    "type": "text",
                    "value": "application/json",
                }
            })
            .then(()=>{
                this.message = ''
                this.$refs.modal.openmodal()
                this.method = 'update'
                this.name = ''
                this.url = ''
                this.job_role = ''
                this.admission_date = ''
                this.birthdate = ''
                this.project = ''
                
            })
            .catch((error)=>{
                console.log(error)
                this.message = 'Erro ao adicionar naver'
            })
        }
    },
    mounted(){
        this.actualDate = this.dataact
        console.log(this.$route)
        console.log(this.idp)
        if(this.$route.params.idp){
            // this.job_role = this.$route.params.job_role
            // this.name = this.$route.params.name
            // this.project = this.$route.params.project
            // this.url = this.$route.params.url.replaceAll('barramentosimb','/')
            // let day = new Date(this.$route.params.birthdate).getUTCDate()
            // let month = new Date(this.$route.params.birthdate).getUTCMonth()
            if(String(day).length==1){
                day = `0${day}`
            }
            if(String(month).length==1){
                month = `0${month}`
            }
            this.birthdate = `${new Date(this.$route.params.birthdate).getUTCFullYear()}-${month}-${day}`
            day = new Date(this.$route.params.admission_date).getUTCDate()
            month = new Date(this.$route.params.admission_date).getUTCMonth()
            if(String(day).length==1){
                day = `0${day}`
            }
            if(String(month).length==1){
                month = `0${month}`
            }
            this.admission_date = `${new Date(this.$route.params.admission_date).getUTCFullYear()}-${month}-${day}`

        }
    }
}
</script>

<style lang="scss" type="text/scss" scoped>
    @import '../styles/variables.scss';
    section{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-bottom: 32px;
        .addnaver{
            max-width: 600px;
            width: 100%;
            margin: 0 auto;
            margin-top: 125px;
            .return{
                h2{
                    font-weight: 600;
                    font-size: 24px;
                    line-height: 20px;
                    color:$border1;
                    padding: 0 16px;
                    a{
                        margin-right: 32px;
                    }
                }
            }
            .fields{
                width: 100%;
                margin-top: 32px;

                .item{
                    width: 50%;
                    float: left;
                    padding: 0 16px;
                    margin-bottom: 32px;
                    label{
                        width: 100%;
                        font-weight: 600;
                        font-size: 14px;
                        line-height: 18px;
                        color: $border1;
                        
                    }
                    input{
                        margin-top: 4px;
                        width: 100%;
                        border: 1px solid #424242;
                        height: 40px;
                        padding-left: 4px;
                    }
                }
                .submit{
                    width: 100%;
                    float: left;
                    padding: 0 16px;
                    button{
                        float: right;
                    }
                }
            }
            
        }
    }
    @media(max-width:900px){
        section{
            .addnaver{
                .fields{
                    .item{
                        width: 100%;
                    }
                }
            }
        }
    }
</style>