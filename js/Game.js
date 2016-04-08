(function(){
	//游戏类，最核心的类
	window.Game=Class.extend({
		init:function(paramsJson){
			var self=this;
			//fps表示每秒多少帧,默认值是60;
			this.fps=paramsJson.fps||60;
			//定时器
			this.timer=null;
			//加载完所需的图片
			this.images=null;
			//我的帧工具
			this.frameUtil=new FrameUtil();
			//得到canvas
			this.canvas=document.getElementById(paramsJson.canvasId)
			//得到上下文
			this.ctx=this.canvas.getContext("2d");
			//实例化一个静态资源管理工具，开始加载图片
			this.sr=new StaticResoucesUtil();
			this.sr.loadImages("r.json",function(alreadyLoadNum,allNum,imagesObj){

						//清屏
						self.ctx.clearRect(0,0,canvas.width,canvas.height);
						self.ctx.font="20px 黑体";
						//打印当前加载图片个数
						self.ctx.fillText("正在加载"+alreadyLoadNum+"/"+allNum,30,50);
						//如果已加载图片个数等于总数,游戏开始运行
						if(alreadyLoadNum==allNum){
							// console.log(imagesObj)
							self.images=imagesObj;
							self.run();
						}
					
			});


		},
		run:function(){
			//备份this
			var self=this;
			//自己的演员,本例实例化出3个
			this.fangzi=new Background({
				"image":this.images.fangzi,
				"width":300,
				"height":200,
				"speed":3,
				"y":190
			});

			this.diban=new Background({
				"image":this.images.diban,
				"width":48,
				"height":48,
				"speed":1,
				"y":canvas.height-48
			});

			// console.log(this.images.shu)
			this.shu=new Background({
				"image":this.images.shu,
				"width":300,
				"height":216,
				"speed":2,
				"y":235
			});

			//鸟类
			this.bird=new Bird();
			//管子类数组
			this.pipeArray=[];
			//分数类
			this.scoreManager=new scoreManager();

			//定时器
			this.timer=setInterval(function(){
				self.mainloop();
			},1000/this.fps);
		},
		//主循环
		mainloop:function(){
			// 里面的语句每帧执行
			this.frameUtil.update();
			//清屏
			this.ctx.clearRect(0,0,canvas.width,canvas.height);
			//打印fps
			this.ctx.fillText("FPS/"+this.frameUtil.realFps,10,35);
			//打印帧编号
			this.ctx.fillText("FNO/"+this.frameUtil.currentFrame, 10, 70);
			//房子更新，渲染
			this.fangzi.update();
			this.fangzi.render();
			//底板更新，渲染
			this.diban.update();
			this.diban.render();
			//大树更新，渲染
			this.shu.update();
			this.shu.render();
			//鸟的更新，渲染
			this.bird.update();
			this.bird.render();
			

			if(this.frameUtil.currentFrame % 80==0){
				this.pipeArray.push(new Pipe());
			}
			for (var i=0;i<this.pipeArray.length;i++){
					this.pipeArray[i].update();
					if(this.pipeArray[i]){
						this.pipeArray[i].render();
					}
			}
			//管子的更新，渲染
			
			// console.log(this.frameUtil.realFps);
			// this.ctx.drawImage(this.images.bird,100,100)
			//分数的渲染,更新
			this.scoreManager.render();
		},
		//暂停游戏
		pause:function(){
			clearTimeout(this.timer);
		}
	})
})()