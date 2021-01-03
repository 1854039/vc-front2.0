<template>
	<div id="register_page">
		<el-row>
			<img alt="Vue logo" src='../assets/logo_blue.png'>
		</el-row>
		<el-alert v-if="isRegisterSuccessfully===false" title="注册错误!" type="error" show-icon></el-alert>
		<el-alert v-else-if="isRegisterSuccessfully===true" title="注册成功，正在跳转!" type="success" show-icon></el-alert>
		<div id="register_area">
			<el-row></el-row>
			<el-row>
				<div id="register_title">加入VegetableChicken</div>
			</el-row>
			<el-row></el-row>
			<el-form id="register_passwordarea" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="200px"
			 class="demo-ruleForm">
				<el-form-item label="请输入用户名:" prop="account">
					<el-input id="register_account" v-model="ruleForm.account" placeholder="请输入内容"></el-input>
				</el-form-item>
				<el-form-item label="请输入密码:" prop="pass">
					<el-input type="password" v-model="ruleForm.pass" placeholder="请输入密码" show-password></el-input>
				</el-form-item>
				<el-form-item label="请再次输入密码:" prop="checkPass">
					<el-input type="password" v-model="ruleForm.checkPass" placeholder="请再次输入密码" show-password></el-input>
				</el-form-item>
				<el-form-item label="请输入手机号:" prop="phone">
					<el-input v-model.number="ruleForm.phone" placeholder="请输入手机号"></el-input>
				</el-form-item>
			</el-form>
			<el-row>
				<el-button id="register_button" type="primary" @click="submitForm('ruleForm')">注册</el-button>
				<el-button id="register_button" type="primary"><router-link tag="div" to="/Login">去登录</router-link></el-button>
			</el-row>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			var checkAccount = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入用户名'));
				} else {
					callback();
				}
			};
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					if (this.ruleForm.checkPass !== '') {
						this.$refs.ruleForm.validateField('checkPass');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.ruleForm.pass) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			var checkPhone = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('手机号不能为空'));
				}
				setTimeout(() => {
					if (!Number.isInteger(value)) {
						callback(new Error('请输入数字值'));
					} else {
						if (value < 10000000000 || value > 19999999999) {
							callback(new Error('请正确输入11位手机号'));
						} else {
							callback();
						}
					}
				}, 1000);
			};
			return {
				isRegisterSuccessfully: undefined,
				ruleForm: {
					pass: '',
					checkPass: '',
					phone: '',
					account: '',
				},
				rules: {
					account: [{
						validator: checkAccount,
						trigger: 'blur'
					}],
					pass: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					checkPass: [{
						validator: validatePass2,
						trigger: 'blur'
					}],
					phone: [{
						validator: checkPhone,
						trigger: 'blur'
					}]
				},
			}
		},
		created:function(){
			
		},
		watch: {
			isRegisterSuccessfully: function(newIsRegisterSuccessfully, oldIsRegisterSuccessfully) {
				var router = this.$router
				console.log('new' + newIsRegisterSuccessfully + 'old' + oldIsRegisterSuccessfully);
				if (newIsRegisterSuccessfully === false) {
					setTimeout(function() {
						this.isRegisterSuccessfully = undefined
						console.log(this.isRegisterSuccessfully)
					}, 10);
				} else if (newIsRegisterSuccessfully === true) {
					console.log('run in son!')
					console.log('origin ' + this.input_account + 'psw: ' + this.input_password)
					setTimeout(function() {
						router.replace('/Login')
					}, 1500)
				}
			}
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						alert('submit!');
						this.Register(this.ruleForm.account,this.ruleForm.pass);
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			Register(input_account,input_password){               //注册
				var account = input_account;
				var password = input_password;
				// var headerToken=this.token;
				this.REajax = new XMLHttpRequest();
				this.REajax.open("GET", "http://localhost:8701/register?username="+account+"&userpwd="+password, true);
				this.REajax.setRequestHeader('Authorization','Bearer ');
				this.REajax.onreadystatechange = this.REsuccessfully;
				this.REajax.send();		
			},
			REsuccessfully(){             //注册附属函数
				if (this.REajax.readyState == 4 && this.REajax.status == 200) {
					console.log(this.REajax.responseText);	
					if(this.REajax.responseText==0){
						this.isRegisterSuccessfully=true;
						this.$alert('注册成功！', '提示', {
						confirmButtonText: '确定',
					   });						
					}else {
						this.isRegisterSuccessfully=false;
					}				
					// if(JSON.parse(this.REajax.responseText).returnFlag==1){
					// 	this.$alert('注册成功！', '提示', {
					// 	confirmButtonText: '确定'
					//    });									
				 //    }
			    }
			},
		}
		
	}
</script>

<style>
	.el-row {
		margin-bottom: 20px;

		&:last-child {
			margin-bottom: 0;
		}
	}

	.el-col {
		border-radius: 4px;
	}

	.el-form-item__label {
		font-size: 20px;
	}

	#register_page {
		width: 100%;
		height: 1000px;
		background-color: #027AFF;
		text-align: center;
	}

	#register_area {
		background-color: white;
		margin: auto;
		width: 35%;
		height: 400px;
		border-radius: 20px;
	}

	#register_title {
		font-family: Microsoft YaHei;
		font-weight: bold;	
		font-size: 24px;
		line-height: 32px;
		
		color: #535151;
	}

	/* 	#register_accounttext{
		font-family: Microsoft YaHei;
		font-size: 20px;
	}
	#register_passwordtext{
		font-family: Microsoft YaHei;
		font-size: 20px;
	}
	#register_passwordtextagain{
		font-family: Microsoft YaHei;
		font-size: 20px;
	} */
	#register_passwordarea {
		left: 50px;
		width: 420px;
	}
</style>
