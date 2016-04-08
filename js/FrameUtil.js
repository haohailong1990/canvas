(function(){
	//帧工具类，提供当前的帧数,提供当前的真是的fps
	window .FrameUtil=Class.extend({
		//初始化
		init:function(){
			//当前的帧序号
			this.currentFrame=0;
			// 起始帧
			this.sFrame=0;
			this.sTime=new Date();
			//真是的fps
			this.realFps=0;
		},
		//更新,这个函数在mainloop函数中每帧执行
		update:function(){
			//当前帧序号自增1
			this.currentFrame++;
			var t=new Date();
			if(t-this.sTime>=1000){
				this.realFps=this.currentFrame-this.sFrame;
				this.sFrame=this.currentFrame;
				this.sTime=t;
				// console.log(this.relFps)
			}
			// console.log(Math.random())
		}
	})
})();