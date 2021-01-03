<template>
	<div id="myExpress_page">
		<el-col :span="16">
			<div id="myExpress_left">
				<div id="myExpress_user_info">
					<div id="myExpress_info_up">
						<el-col :span="8" :push="1">
							<p id="myExpress_id">{{nick_name}}(cid:{{user_id}})</p>
						</el-col>
						<el-col :span="6" :push="9">
							<el-button id="myExpress_personal">个人中心</el-button>
						</el-col>
					</div>
					<div id="myExpress_info_down">
						<el-col :span="8">
							<p id="myExpress_to_be_shipped">待发货</p>
							<p id="myExpress_to_be_shipped_num" v-if="shipped>0">{{shipped}}</p>
						</el-col>
						<el-col :span="8">
							<p id="myExpress_to_be_received">待收货</p>
							<p id="myExpress_to_be_received_num" v-if="received>0">{{received}}</p>
						</el-col>
						<el-col :span="8">
						    <p id="myExpress_to_be_evaluate">待评价</p>
							<p id="myExpress_to_be_evaluate_num" v-if="evaluate>0">{{evaluate}}</p>
						</el-col>
					</div>
				</div>
				<div id="myExpress_good_info">
					<div id="myExpress_good_up">
						<el-col :span="1" :push="1">
							<img id="myExpress_good_logo" src="../assets/good.png"/>
						</el-col>
						<el-col :span="3" :push="1">
							<p id="myExpress_good_title">我的快递</p>
						</el-col>
					</div>
					<div id="myExpress_express_list">
						<div class="express_item" v-for="item in express" :key="item.id">
							<div class="express_id_box">
								<div class="express_id">
									快递单号：{{item.expressid}}
								</div>
							</div>
							<div class="express_under">
								<el-col :span="4">
									<img class="express_photo" src='../assets/logo_blue.png' />
								</el-col>
								<div class="express_right">
									<div class="express_state">{{item.expressstatus}}</div>
									<div class="express_commodity">{{item.expressstore}}</div>
									<div class="express_position">{{item.expressposition}}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</el-col>
		<el-col :span="8">
			<div id="myExpress_right">
				<div id="myExpress_advertising">
					<el-tabs v-model="activeName" @tab-click="handleClick">
					    <el-tab-pane label="菜鸡精选" name="first">
							<el-carousel :interval="5000" arrow="nerver" indicator-position="outside">
							  <el-carousel-item v-for="(item,index) in VGselected" :key="index">
								  <a :href="item.link">
								  	<img class="myExpress_advertising_photo" :src="item.url"/>
								  </a>
							  </el-carousel-item>
							</el-carousel>
						</el-tab-pane>
					    <el-tab-pane label="猜你喜欢" name="second">
							<el-carousel :interval="5000" arrow="nerver" indicator-position="outside">
							  <el-carousel-item v-for="(item,index) in VGsuggest" :key="index">
							    <a :href="item.link">
									<img class="myExpress_advertising_photo" :src="item.url"/>
								</a>
							  </el-carousel-item>
							</el-carousel>
						</el-tab-pane>
					</el-tabs>
				</div>
			</div>
		</el-col>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				user_id:"1",
				nick_name:"panpan",
				shipped:0,
				received:0,
				evaluate:0,
				activeName: 'first',
				express:[],
				index:0,
				VGselected:[
					{
						url:require('../assets/logo_white.png'),
						link:"http://www.w3school.com.cn/",
						title:""
					},
					{
						url:require('../assets/logo_blue.png'),
						link:"http://www.w3school.com.cn/",
						title:""
					},
					{
						url:require('../assets/taobao.jpg'),
						link:"taobao.com",
						title:""
					}
				],
				VGsuggest:[
					{
						url:require('../assets/good.png'),
						link:"http://www.w3school.com.cn/",
						title:""
					},
					{
						url:require('../assets/logo_blue.png'),
						link:"http://www.w3school.com.cn/",
						title:""
					},
					{
						url:require('../assets/jingdong.jpg'),
						link:"http://www.w3school.com.cn/",
						title:""
					}
				]
			}
		},
		created:function(){
			this.getExpressList();
			this.getad();
		},
		methods:{
			handleClick(tab, event) {
			    console.log(tab, event);
			 },
			 
			 getExpressList(){
			 	var userid = this.user_id;
			 	this.GELajax = new XMLHttpRequest();
			 	this.GELajax.open("GET", "http://localhost:8705/myexpresslist?userid="+userid, true);
			 	this.GELajax.setRequestHeader('Authorization','Bearer ');
			 	this.GELajax.onreadystatechange = this.GELsuccessfully;
			 	this.GELajax.send();	
			 },
			 GELsuccessfully(){             //注册附属函数
			 	if (this.GELajax.readyState == 4 && this.GELajax.status == 200) {
			 		console.log(this.GELajax.responseText);	
			 		console.log(JSON.parse(this.GELajax.responseText));
					if(JSON.parse(this.GELajax.responseText).code==20000){
						console.log(JSON.parse(this.GELajax.responseText).data);
						this.express = JSON.parse(this.GELajax.responseText).data.items;
						length=JSON.parse(this.GELajax.responseText).data.items.length;
						for(var i = 0; i < length; i++){
							if(JSON.parse(this.GELajax.responseText).data.items[i].expressstatus == "运输中"){
								this.received++;
							}
							else if(JSON.parse(this.GELajax.responseText).data.items[i].expressstatus == "已签收"){
								this.evaluate++;
							}
						}
						
					}
			    }
			},
			getad(){
			 	var userid = this.user_id;
			 	this.GADajax = new XMLHttpRequest();
			 	this.GADajax.open("GET", "http://localhost:8707/ad?keyword="+"菜鸡", true);
			 	this.GADajax.setRequestHeader('Authorization','Bearer ');
			 	this.GADajax.onreadystatechange = this.GADsuccessfully;
			 	this.GADajax.send();	
			 },
			 GADsuccessfully(){            
			 	if (this.GADajax.readyState == 4 && this.GADajax.status == 200) {
			 		// console.log(this.GADajax.responseText);	
			 		console.log(JSON.parse(this.GADajax.responseText).data);
					console.log(JSON.parse(this.GADajax.responseText).data.list)
					for(var i=0; i<3; i++){
						this.VGselected[i].url=JSON.parse(this.GADajax.responseText).data.list[i].marketingMainPic;
						this.VGselected[i].link=JSON.parse(this.GADajax.responseText).data.list[i].itemLink;
						this.VGselected[i].title=JSON.parse(this.GADajax.responseText).data.list[i].dtitle;
					}
			    }
			},
		},
		
	}
</script>

<style>
	#myExpress_page{
		width: 100%;
		height: 1000px;
		background-color: white;
		text-align: center;
	}
	#myExpress_left{
		width:756px ;
		margin-left:200px;
		margin-top: 80px;
	}
	#myExpress_user_info{
		width:756px ;
		height: 126px;
	    border: 1px solid #e4eaee;
	    font-size: 12px;
	    color: #4b4b4b;
	}
	#myExpress_info_up{
		width: 756px;
		height: 72px;
		background: #f5f8fa;
		border-bottom: 1px solid #e4eaee;
	}
	#myExpress_id{
		margin-top: 25px;
	}
	#myExpress_personal{
		margin-top: 15px;
	}
	#myExpress_info_down{
		width: 756px;
		height: 40px;
	}
	#myExpress_to_be_shipped{
		margin-top: 16px;
		border-left: 1px solid #e4eaee
	}
	#myExpress_to_be_shipped_num{
		margin-top: -28px;
		margin-left: 58px;
	}
	#myExpress_to_be_received{
		margin-top: 16px;
		border-left: 1px solid #e4eaee
	}
	#myExpress_to_be_received_num{
		margin-top: -28px;
		margin-left: 58px;
	}
	#myExpress_to_be_evaluate{
		margin-top: 16px;
		border-left: 1px solid #e4eaee
	}
	#myExpress_to_be_evaluate_num{
		margin-top: -28px;
		margin-left: 58px;
	}
	#myExpress_good_info{
		width:780px;
		margin-top: 40px;
	}
	#myExpress_good_up{
		height: 44px;
		background: #f5f8fa;
		border-bottom: 1px solid #e4eaee;
	}
	#myExpress_good_logo{
		width: 45px;
		height: 45px;
	}
	#myExpress_good_title{
		margin-top: 10px;
	}
	#myExpress_express_list{
		margin-top: 15px;
		width:780px;
		border-radius: 10px;
	}
	.express_item{
		margin-bottom: 20px;
		height:160px;
		border-radius: 10px;
		border-style: solid;
		border-color: #e4eaee;
	}
	.express_id_box{
		background-color: #e4eaee;
	}
	.express_id{
		text-align: left;
		font-size: 18px;
		font-family: Microsoft YaHei;
		line-height: 30px;
		margin-left: 30px;
	}
	.express_photo{
		width: 130px;
		height: 130px;
		border-radius: 10px;
		border-top-left-radius: 0px;
	}
	.express_right{
		width: 530px;
		height: 130px;
		margin-left: 150px;
	}
	.express_state{
		text-align: left;
		font-size: 26px;
		font-family: Microsoft YaHei;
		line-height: 54px;
	}
	.express_commodity{
		text-align: left;
		font-size: 22px;
		font-family: Microsoft YaHei;
		line-height: 48px;
		margin-top:-10px;
		overflow: hidden;       /* 超出内容隐藏 */
		white-space: nowrap;     /* 设置不换行 */
		text-overflow: ellipsis;   /* 超出显示省略号 */
	}
	.express_position{
		text-align: left;
		font-size: 20px;
		font-family: Microsoft YaHei;
		line-height: 36px;
		overflow: hidden;       /* 超出内容隐藏 */
		white-space: nowrap;     /* 设置不换行 */
		text-overflow: ellipsis;   /* 超出显示省略号 */
	}
	#myExpress_right{
		width: 340px;
		margin-left: 80px;
	}
	#myExpress_advertising_title{
		margin-top: 120px;
	}
	#myExpress_advertising{
		margin-top: 80px;
		border-radius: 20px;
	}
	.myExpress_advertising_photo{
		height: 330px;
		width: 340px;
		border-radius: 20px;
	}
	.myExpress_advertising_info{
		position: relative;
	}
	.el-carousel__item h3 {
	    color: #475669;
	    font-size: 18px;
	    opacity: 0.75;
	    line-height: 300px;
	    margin: 0;
	  }  
	.el-carousel__item:nth-child(2n) {
	    background-color: #99a9bf;
	  }
	  
	.el-carousel__item:nth-child(2n+1) {
	    background-color: #d3dce6;
	  }
	.el-carousel__item{
		border-radius: 20px;
	}
</style>
