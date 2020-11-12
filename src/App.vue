<template>
  <transition name="slide" mode="out-in" id="app">
    <router-view></router-view>
  </transition>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
    font-family: 'Montserrat', sans-serif;
  }
  @keyframes slide-in{
    from {transform: translateY(-30px);opacity:0;}
    to {transform: translateY(0px);opacity:1;}
  }
  @keyframes slide-out{
    from {transform: translateY(0px);opacity:1;}
    to {transform: translateY(-30px);opacity:0;}
  }
  .slide-enter-active{
    animation: slide-in 0.3s ease;
  } 
  .slide-leave-active{
    animation: slide-out 0.3s ease;
  } 
  body{
    overflow-x: hidden;
  }
  html {
    scroll-behavior: smooth; 
  }
  .modal-enter-active{
    opacity: 0;
  } 
  .modal-leave-active{
    opacity: 1;
  }
  .alert{
    position: fixed;
    top: 200px;
    padding: .75rem 1.25rem;
    margin-bottom: 1rem;
    border-radius: .25rem;
    z-index: 1;
  }
  .alert-warning{
    color: white;
    background-color: #212121;
  }
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px white inset;
    -webkit-text-fill-color: #212121 ;
  }
  .default-button{
    background-color: #212121;
    color: white;
    border: 1px solid #212121;
    transition: 0.3s ease all;
    font-weight: 600;
    font-size: 14px;
    line-height: 24px;
    padding: 8px 24px;
    cursor: pointer;
    text-decoration: none;
  }
  .default-button:hover{
    background-color: white;
    color: #212121;
    text-decoration: none;
  }
  .default-button.reverse{
    background-color: white;
    color: #212121;
  }
  .default-button.reverse:hover{
    background-color: #212121;
    color: white;
  }
  .default-button:disabled{
    background-color: gray;
    color: black;
    border: 1px solid gray;
    cursor:default;
  }
  .default-button:disabled:hover{
    background-color: gray;
    color: black;
    border: 1px solid gray;
  }
</style>
