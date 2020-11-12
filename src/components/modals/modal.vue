<template>
  <transition name="modal" mode="out-in">
    <div v-show="showmodal == true" class="modal" @click="closemodal">
      <div class="modal-center" @click.stop v-if="method != 'show'">
        <div class="close" @click="closemodal" v-if="method != 'delete'">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
              fill="#212121"
            />
          </svg>
        </div>

        <span v-if="method == 'delete'">
          <h1>Excluir Naver</h1>
          <p>Tem certeza que deseja excluir esse Naver?</p>
          <div class="buttons">
            <button class="cancelar default-button reverse" @click="closemodal">
              Cancelar
            </button>
            <slot></slot>
          </div>
        </span>

        <span v-if="method == 'add'">
          <h1>Naver criado</h1>
          <p>Naver criado com sucesso!</p>
        </span>

        <span v-if="method == 'deleteresult'">
          <h1>Naver excluído</h1>
          <p>Naver excluído com sucesso!</p>
        </span>

        <span v-if="method == 'update'">
          <h1>Naver atualizado</h1>
          <p>Naver atualizado com sucesso!</p>
        </span>
      </div>

      <div class="modal-center shownaver" @click.stop v-if="method == 'show'">
        <div class="close" @click="closemodal">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
              fill="#212121"
            />
          </svg>
        </div>

        <div class="left" v-if="dados.url">
          <img
            :src="dados.url.replaceAll('barramentosimb', '/')"
            :alt="dados.name"
          />
        </div>

        <div class="right">
          <h1>{{ dados.name }}</h1>
          <p>
            {{ dados.job_role }}
          </p>
          <p class="name_role">Idade</p>
          <p>{{ idade }} anos</p>
          <p class="name_role">Tempo de empresa</p>
          <p>
            {{ tempEmpresa }}
          </p>
          <p class="name_role">Projetos que participou</p>
          <p>
            {{ dados.project }}
          </p>

          <div class="buttons">
            <button :data-id="dados.id" @click="deleteelement">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 21H18V7H6V21ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z"
                  fill="#212121"
                />
              </svg>
            </button>

            <router-link
              :to="`/update/${dados.id}/${dados.name}/${dados.birthdate}/${dados.admission_date}/${dados.project}/${dados.job_role}/${dados.url}`"
            >
              <button :data-id="dados.id">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM21.41 6.34L17.66 2.59L15.13 5.13L18.88 8.88L21.41 6.34Z"
                    fill="#212121"
                  />
                </svg>
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

export default {
    name:'deletemodal',
    props:['method','dados'],
    data(){
        return{
            showmodal:false,
        }
    },
    methods:{
        openmodal(){
            this.showmodal = true
        },
        closemodal(el){
            this.showmodal = false
            if(this.method=='update'){
                this.$router.push('/home')
            }
            
        },
        deleteelement(el){
            this.closemodal()
        }
    },
    computed:{
        idade(){
            let dataAtual  = new Date()
            let dataNasc = new Date(this.dados.birthdate)
            let anoAtual = dataAtual.getFullYear();
            let diaNasc = dataNasc.getDate();
            let mesNasc = dataNasc.getMonth() +1;
            let anoNasc = dataNasc.getFullYear();
            let idade = anoAtual - anoNasc;
            let mesAtual = dataAtual.getMonth() + 1; 
            if(mesAtual < mesNasc){
                idade-- 
            } else {
                if(mesAtual == mesNasc){ 
                    if(new Date().getDate() < diaNasc ){ 
                        idade--; 
                    }
                }
            } 
            return idade; 
        },
        tempEmpresa(){
            let dataAtual  = new Date()
            let dataAdm = new Date(this.dados.admission_date)
            let anoAtual = dataAtual.getFullYear();
            let diaAdm = dataAdm.getDate();
            let mesAdm = dataAdm.getMonth() +1;
            let anoAdm = dataAdm.getFullYear();
            let anos = anoAtual - anoAdm;
            let mesAtual = dataAtual.getMonth() + 1; 
            if(mesAtual < mesAdm){
                anos-- 
            } else {
                if(mesAtual == mesAdm){ 
                    if(new Date().getDate() < diaAdm ){ 
                        anos--; 
                    }
                }
            } 
            if(anos!=0){
                return `${anos} anos`
            }else{
                if(mesAtual - mesAdm < 0){
                    return `${12 + (mesAtual - mesAdm)} meses` 
                }else{
                    return `${mesAtual - mesAdm} meses`
                }
            }       
        }
    }
}
</script>

<style lang="scss" type="text/scss" scoped>
     @import '../../styles/variables.scss';
    .modal{
        position: fixed;
        z-index: 5;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background-color: rgba(0,0,0,0.5);
        transition: 0.3s ease all;
        display: flex;
        align-items: center;
        justify-content: center;
        .modal-center{
            background-color: white;
            padding: 32px;
            width: 592px;
            position: relative;
            max-width: 90%;
            .close{
                position: absolute;
                top: 24px;
                right: 24px;
                cursor: pointer;
                z-index: 1;
            }
            h1{
                font-weight: 600;
                font-size: 24px;
                line-height: 36px;
                color:$border1;
                margin-bottom: 24px;
            }
            p{
                font-size: 16px;
                line-height: 36px;
                margin-bottom: 33px;
            }
            .buttons{
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                .cancelar{
                    margin-right: 24px;
                }
            }
        }
        .shownaver{
            width: 1000px;
            max-width: 90%;
            padding: 0;
            display: flex;
            .left{
                width: 50%;
                float: left;
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;
                img{
                    width: 110%;
                    filter: grayscale(100%);
                }
            }
            .right{
                width: 50%;
                float: left;
                padding: 32px;
                position: relative;
                .name_role{
                    font-weight: 600;
                    font-size: 16px;
                    line-height: 24px;
                    margin-bottom: 0px;
                }
                .buttons{
                    display: flex;
                    align-items: flex-start;
                    justify-content: flex-start;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    padding-bottom: 32px;
                    padding-left: 32px;
                    button{
                        float: left;
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
    @media(max-width:600px){
        .modal {
            .shownaver{
                display: block;
                
                .left{
                    width:100%;
                    max-height: 230px;
                }
                .right{
                    width:100%;
                    padding: 10px;
                    overflow-Y: scroll;
                    // max-height: 330px;
                    h1{
                        font-size: 18px;
                        margin-bottom: 0px;
                    }
                    p{
                        margin-bottom: 10px;
                    }
                    .buttons{
                        position: initial;
                        padding-left: 0;
                        padding-bottom: 0px;
                    }
                }
            }
        }
    }
</style>