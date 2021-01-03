<template>
	<div id="Login_page_container">
		<img id="Login_logo" src="../assets/logo_blue.png" />
		<el-alert v-if="isLoginSuccessfully===false" title="密码错误!" type="error" show-icon></el-alert>
		<el-alert v-else-if="isLoginSuccessfully===true" title="登陆成功，正在跳转!" type="success" show-icon></el-alert>
		<div id="Login_login_container">
			<div id="Login_tilte">登录</div>
			<el-row id="Login_account_container">
				<el-col :span="4" :offset="5" id="Login_account_title">账号</el-col>
				<el-col :span="8">
					<el-input id="Login_account_input" v-model="input_account"></el-input>
				</el-col>
			</el-row>
			<el-row id="Login_password_container">
				<el-col :span="4" :offset="5" id="Login_password_title">密码</el-col>
				<el-col :span="8">
					<el-input id="Login_password_input" v-model="input_password" show-password></el-input>
				</el-col>
			</el-row>
			<el-row id="Login_btn_container">
				<el-button type="primary" id="Login_login_btn" @click="login">登录</el-button>
				<el-button type="primary" id="Login_register_btn">
					<router-link tag="div" to="/Register">去注册</router-link>
				</el-button>
			</el-row>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				input_account: '',
				input_password: '',
				isLoginSuccessfully: undefined,
			}
		},
		methods: {
			login() {
				this.ajax = new XMLHttpRequest();
				this.ajax.open("GET", "http://localhost:8701/login?username=" + this.input_account + "&userpwd=" + this.input_password,
					true);
				this.ajax.setRequestHeader('Authorization', 'Bearer ');
				this.ajax.onreadystatechange = this.loginSuccessfully;
				this.ajax.send();
			},
			loginSuccessfully() {
				if (this.ajax.readyState == 4 && this.ajax.status == 200) {
					if (JSON.parse(this.ajax.responseText) == 0) {
						this.isLoginSuccessfully = true;
						console.log(this.isLoginSuccessfully);
					} else if (JSON.parse(this.ajax.responseText) == -1) {
						this.isLoginSuccessfully = false;
						console.log(this.isLoginSuccessfully);
					}
				}
			}
		},
		watch: {
			isLoginSuccessfully: function(newIsLoginSuccessfully, oldIsLoginSuccessfully) {
				var router = this.$router
				console.log('new' + newIsLoginSuccessfully + 'old' + oldIsLoginSuccessfully);
				if (newIsLoginSuccessfully === false) {
					setTimeout(function() {
						this.isLoginSuccessfully = undefined
						console.log(this.isLoginSuccessfully)
					}, 10);
				} else if (newIsLoginSuccessfully === true) {
					console.log('run in son!')
					console.log('origin ' + this.input_account + 'psw: ' + this.input_password)
					setTimeout(function() {
						router.replace('/SearchExpress')
					}, 1500)
				}
			}
		}
	}
</script>

<style>
	#Login_page_container {
		width: 100%;
		height: 789px;
		background-color: #027AFF;
		text-align: center;
	}

	#Login_login_container {
		margin: auto;
		position: relative;
		width: 35%;
		height: 350px;
		background-color: #FFFFFF;
		text-align: center;
		border-radius: 20px;
	}

	#Login_tilte {
		position: relative;
		top: 30px;
		font-family: "microsoft yahei";
		font-size: 44px;
	}

	#Login_account_container {
		position: relative;
		top: 50px;
	}

	#Login_password_container {
		position: relative;
		top: 60px;
	}

	#Login_btn_container {
		position: relative;
		top: 90px;
	}

	#Login_account_title {
		font-family: "microsoft yahei";
		font-size: 20px;
	}

	#Login_password_title {
		font-family: "microsoft yahei";
		font-size: 20px;
	}

	#Login .el-row {
		margin-bottom: 20px;

		&:last-child {
			margin-bottom: 0;
		}

		.el-col {
			border-radius: 4px;
		}

	}
	
	.el-alert {
		position: absolute;
		left: 50%;
		margin-left: -110px;
		width: 220px;
		z-index: 99;
	}
	
</style>
