<template>
    <section class="login">
        <transition name="slide" mode="out-in">
            <div class="alert alert-danger" v-show="alert==true">
                Usuário ou senha inválidos
            </div>
        </transition>

        <div class="login-box">

            <logo class="logo"/>

            <label for="email">E-mail</label>

            <input type="email" placeholder="E-mail" id="email" v-model="email" required>

            <label for="senha">Senha</label>

            <input type="password" placeholder="Senha" id="senha" minlength="6" v-model="senha" required>

            <input type="submit" :value="submitbutton" @click="login" :disabled="email=='' || senha.length<6 || submitbutton=='Entrando'">

        </div>

    </section>
</template>

<script>
import logo from './logo/logo.vue'
import axios from 'axios'
export default {
    name:'login',
    metaInfo: {
        htmlAttrs: {
        lang: 'pt-BR',
        },
        title: 'Nave - Login',
        meta: [{ name: 'descrition', content: 'Tela de Login.' }],
    },
    components:{logo},
    data(){
        return{
            email:'',
            senha:'',
            submitbutton:'Entrar',
            alert:false
        }
    },
    methods:{
        login(){
            this.submitbutton = 'Entrando...'
            this.alert=false
            axios.post(`https://navedex-api.herokuapp.com/v1/users/login`,
            {
                email:this.email,
                password:this.senha
            },
            {
                headers:{
                    "key": "Content-Type",
                    "type": "text",
                    "value": "application/json",
                }
            })
            .then((res)=>{
                localStorage.setItem('login','true')
                localStorage.setItem('token',res.data.token ) 
                localStorage.setItem('welcome',true ) 
                this.$router.push('/home')
            }).catch(()=>{
                this.alert=true
                setInterval(()=>{
                    this.alert=false
                },5000)
                this.submitbutton = 'Entrar'
            })
            this.email = ''
            this.senha = ''
        }
    },
    mounted(){
        if(localStorage.getItem('login')=='true'){
            this.$router.push('/home')
        }else{
            localStorage.removeItem('login')
            localStorage.removeItem('token')
        }
    }
}
</script>


<style type="text/scss" scoped lang="scss">
    @import '../styles/variables.scss';
    .login{
        width: 100%;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color:#fff ;
        .login-box{
            width: 448px;
            height: auto;
            border: 1px solid $border1;
            padding: 32px;
            .logo{
                display: block;
                margin: 0 auto;
                margin-bottom:32px;
            }
            label,input{
                width: 100%;
                
            }
            label{
                font-weight: 600;
                font-size: 14px;
                line-height: 22px;
            }
            input[type=email],input[type=password]{
                height: 40px;
                border: 1px solid $border;
                padding-left: 8px;
                margin-bottom: 32px;
            }
            input[type=submit]{
                height: 40px;
                border: 1px solid $border;
                background-color: $border1;
                color: white;
                transition: 0.3s ease all;
                cursor: pointer;
                &:hover{
                    background-color: #fff;
                    color:$border1;
                }
                &:disabled{
                    background-color: gray;
                    color: black;
                    &:hover{
                        background-color: gray;
                        color: black;
                    }
                }
            }
        }
    }
</style>