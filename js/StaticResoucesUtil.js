(function(){
	window.StaticResoucesUtil=Class.extend({
		init:function(){
			// this.images={};
			this.images=new Object();
		},
		//读取图片
		//调用loadImages,有2个参数,第一个是JOSN,表示读取列表
		//第二个是回调函数,回调函数需要三个参数，分别是已经加载的图片的数量，图片总数量，图片对象
		loadImages:function(jsonURL,callback){
			// console.log(jsonURL);
			var self=this;
			var xhr=new XMLHttpRequest();
			xhr.onreadystatechange=function(){
				if(xhr.readyState==4){
					if(xhr.status>=200 && xhr.status<300 || xhr.status ==304){
						//已经加载的图片数量
						var alreadyLoadNumber=0;
						//将json文件纯文本转为json对象
						var jsonObj=JSON.parse(xhr.responseText);
						for(var i=0;i<jsonObj.images.length;i++){
							var image=new Image();
							image.index=i;
							//一旦设置src，上行请求将发出
							image.src=jsonObj.images[i].src;
							image.onload=function(){
								//已经加载的图片数量+1
								alreadyLoadNumber++;
								self.images[jsonObj.images[this.index].name]=this;
								//回调
								callback(alreadyLoadNumber,jsonObj.images.length,self.images);
							}

						}
					}
				}
			}
			xhr.open("get",jsonURL,true);
			xhr.send(null);
		}
	})
})()