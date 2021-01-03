<template>
  <div id="app">
	<div class="navigation">
		<img src="./assets/logo_blue.png" class="logo"/>
		<p class="title">VegetableChicken</p>
		<el-menu
		  :default-active="activeIndex"
		  class="el-menu-demo"
		  mode="horizontal"
		  @select="handleSelect"
		  background-color="#545c64"
		  text-color="#fff"
		  active-text-color="#ffd04b">
		  <el-menu-item index="1" class="searchProcess"><router-link tag="div" to="/SearchExpress">查询快递</router-link></el-menu-item>
		  <el-menu-item index="2" class="myProcess"><router-link tag="div" to="/MyExpress">我的快递</router-link></el-menu-item>
		  <el-menu-item index="3" class="login"><router-link tag="div" to="/Login">登录</router-link></el-menu-item>
		  <el-menu-item index="4" class="register"><router-link tag="div" to="/Register">注册</router-link></el-menu-item>
		</el-menu>
	</div>
	<router-view></router-view>

  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import MyExpress from './components/MyExpress.vue'
import Register from './components/Register.vue'

export default {
  name: 'app',
  components: {
    HelloWorld,
	MyExpress,
	Register
  },
  methods: {
	  handleSelect(key, keyPath) {
	    console.log(key, keyPath);
	  }
  },
  data() {
	  return {
	    activeIndex: '3'
	  };
  },
}
</script>

<style>
#app {
/*  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
.navigation {
  position: fixed;
  width: 100%;
  height: 63px;
  left: 0px;
  top: -1px;
  background: #545c64;
  z-index: 5;
}

.logo {
  position: absolute;
  width: 38px;
  height: 38px;
  left: 25px;
  top: 10px;
}

.title {
  position: absolute;
  width: 173px;
  height: 33px;
  left: 81px;
  top: 15px;
  margin-top: 0%;
  font-family: Lucida Handwriting;
  font-style: italic;
  font-weight: normal;
  font-size: 24px;
  line-height: 33px;
  color: #ffffff;
}
.searchProcess{
	position: absolute;
	width: 112px;
	height: 24px;
	left: 400px;
	font-size: 18px;
	line-height: 24px;
	text-decoration-line: none;
	color: #ffffff;
	cursor:pointer;
}
.myProcess{
	position: absolute;
	width: 112px;
	height: 24px;
	left: 550px;
	font-size: 18px;
	line-height: 24px;
	text-decoration-line: none;
	color: #ffffff;
	cursor:pointer;
}
.login {
  position: absolute;
  width:78px;
  height: 24px;
  left: 1350px;
  font-size: 18px;
  line-height: 24px;
  text-decoration-line: none;
  color: #ffffff;
  cursor:pointer;
}

.register {
  position: absolute;
  width: 78px;
  height: 24px;
  left: 1430px;
  font-size: 18px;
  line-height: 24px;
  text-decoration-line: none;
  color: #ffffff;
  cursor:pointer;
}
</style>
