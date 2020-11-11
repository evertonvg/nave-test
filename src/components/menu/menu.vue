<template>
    <nav>
        <div class="container">
            <logo class="logo"/>
            <button class="logout" @click="logout">Sair</button>
        </div>
    </nav>
</template>
<script>
import logo from '../logo/logo.vue'
export default {
    name:'menutop',
    components:{logo},
    methods:{
        logout(){
            localStorage.removeItem('login')
            this.$router.push('/login')
        }
    }
}
</script>
<style lang="scss" type="text/scss" scoped>
    nav{
        padding: 24px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        top: 0;
        right: 0;
        width: 100%;
        background-color: white;
        z-index: 1;
        .container{
            max-width: 1200px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            padding: 0 32px;
            .logo{
                width:145px;
            }
            .logout{
                color: #000000;
                font-weight: 600;
                font-size: 14px;
                line-height: 24px;
                background-color: transparent;
                border: none;
            }
        }
    }
</style>