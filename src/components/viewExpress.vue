<template>
	<div class="main" id="app">
	    <div id="container" class="map" tabindex="0"></div>
	    <div class="info-box">
	        <div class="code">快递单号：{{id}}</div>
	        <el-container class="info" v-for="message in messages">
	            <el-aside style="width:100px">
	                <div class="time">{{message.time.time}}</div>
	                <div class="date">{{message.time.date}}</div>
	            </el-aside>
	            <el-main class="main-info" style="width:500px">
	                {{message.info}}
	            </el-main>
	        </el-container>
	    </div>
	</div>
	
	<script src="https://unpkg.com/vue/dist/vue.js"></script>
	<script src="https://unpkg.com/element-ui/lib/index.js"></script>
	<script language="javascript" src="https://webapi.amap.com/maps?v=1.4.15&key=84c113b753854d2a372345f043cb50c2&plugin=Map3D,AMap.DistrictLayer,AMap.Scale,AMap.ToolBar,AMap.Geocoder"></script>
	<script src="https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>
	<script type="text/javascript">
	    var app = new Vue({
	        el: '#app',
	        data: {
	            id: "11111111111111111111111",
	            messages: [{
	                time: {
	                    time: "8:00",
	                    date: "2020-12-20"
	                },
	                info: "已送达",
	            }, {
	                time: {
	                    time: "8:00",
	                    date: "2020-12-21"
	                },
	                info: "已签收"
	            }],
	            address: [
	                "北京市朝阳区阜荣街10号",
	            ]
	        },
	        methods: {
	
	        }
	    })
	
	
	    var SOC = 'CHN'
	    var colors = {};
	    var GDPSpeed = {
	        '520000': 10, //贵州
	        '540000': 10, //西藏
	        '530000': 8.5, //云南 
	        '500000': 8.5, //重庆
	        '360000': 8.5, //江西
	        '340000': 8.0, //安徽
	        '510000': 7.5, //四川
	        '350000': 8.5, //福建
	        '430000': 8.0, //湖南
	        '420000': 7.5, //湖北
	        '410000': 7.5, //河南
	        '330000': 7.0, //浙江
	        '640000': 7.5, //宁夏
	        '650000': 7.0, //新疆
	        '440000': 7.0, //广东
	        '370000': 7.0, //山东
	        '450000': 7.3, //广西
	        '630000': 7.0, //青海
	        '320000': 7.0, //江苏
	        '140000': 6.5, //山西
	        '460000': 7, // 海南
	        '310000': 6.5, //上海
	        '110000': 6.5, // 北京
	        '130000': 6.5, // 河北
	        '230000': 6, // 黑龙江
	        '220000': 6, // 吉林
	        '210000': 6.5, //辽宁
	        '150000': 6.5, //内蒙古
	        '120000': 5, // 天津
	        '620000': 6, // 甘肃
	        '610000': 8.5, // 甘肃
	        '710000': 2.64, //台湾
	        '810000': 3.0, //香港
	        '820000': 4.7 //澳门
	
	    }
	    var getColorByDGP = function(adcode) {
	        if (!colors[adcode]) {
	            var gdp = GDPSpeed[adcode];
	            if (!gdp) {
	                colors[adcode] = 'rgb(227,227,227)'
	            } else {
	                var rg = 255 - Math.floor((gdp - 5) / 5 * 255);
	                colors[adcode] = 'rgb(' + rg + ',' + rg + ',255)';
	            }
	        }
	        return colors[adcode]
	    }
	
	    var disCountry = new AMap.DistrictLayer.Country({
	        zIndex: 10,
	        SOC: 'CHN',
	        depth: 2,
	        styles: {
	            'nation-stroke': '#22ffff',
	            'coastline-stroke': [0.85, 0.63, 0.94, 1],
	            'province-stroke': 'white',
	            'city-stroke': 'rgba(255,255,255,0.15)', //中国特有字段
	            'fill': function(props) { //中国特有字段
	                return getColorByDGP(props.adcode_pro)
	            }
	        }
	    })
	
	
	
	    var map = new AMap.Map("container", {
	        showIndoorMap: false,
	        zoom: 3,
	        isHotspot: false,
	        zoomEnable: true,
	        keyboardEnable: false,
	        dragEnable: true,
	        showLabel: false,
	        touchZoomCenter: 1,
	        center: [108.152601, 30.193629],
	        pitch: 0,
	        layers: [
	            disCountry,
	        ],
	    })
	
	    var geocoder = new AMap.Geocoder({});
	    var marker = new AMap.Marker();
	
	    function getInfo(num, id) {
	        var URL = "localhost:8020/search?num=" + num + "&cid=" + id;
	        $.getJSON(URL, function(datas) {
	            console.log(datas);
	
	        })
	    }
	
	    getInfo("YT5062119938236", "YTU");
	
	    function geoCode(address) {
	        geocoder.getLocation(address, function(status, result) {
	            if (status === 'complete' && result.geocodes.length) {
	                var lnglat = result.geocodes[0].location;
	                console.log(result.geocodes[0].location.lng);
	                marker.setPosition(lnglat);
	                map.add(marker);
	            } else {
	                log.error('根据地址查询位置失败');
	            }
	        });
	    }
	    geoCode("山东省市场部公司");
	</script>
</body>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		created:function(){
			
		},
		methods:{
			
		}
	}
</script>

<style>
	
</style>
