<template>
	<div id="searchExpress_page">
		<center>
			<img id="searchExpress_img" src='../assets/logo_white.png' />
		</center>
		<center>
			<div id="searchExpress_container">
			<el-row :gutter="20" id="searchExpress_row">
				<el-col :span="4">
					<el-select id="searchExpress_company" v-model="value" placeholder="快递公司">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-col>
				<el-col :span="16">
					<el-input id="searchExpress_input" v-model="input" placeholder="输入单号"></el-input>
				</el-col>
				<el-col :span="4">
					<el-button id="searchExpress_btn" type="primary">查快递</el-button>
				</el-col>
			</el-row>
			</div>
		</center>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				input: '',
				options: [{
					value: '选项1',
					label: '自动识别'
				}, {
					value: '选项2',
					label: '圆通'
				}, {
					value: '选项3',
					label: '申通'
				}, {
					value: '选项4',
					label: '百世'
				}, {
					value: '选项5',
					label: '天天'
				}],
				value: ''
			}
		}
	}
</script>

<style>
	#searchExpress_page {}

	#searchExpress_img {
		margin: auto;
		position: relative;
		top: 50px;

	}

	#searchExpress_row {
		position: relative;
		top: 20px;
	}

	#searchExpress_container {
		position: relative;
		top: 50px;
		background-color: white;
		margin: auto;
		width: 70%;
		height: 200px;
		border-radius: 20px;
	}

	#searchExpress_company {
		height: 60px;
	}

	#searchExpress_input {
		height: 60px;
	}

	#searchExpress_btn {
		height: 60px;
		width: 150px;
	}
</style>
