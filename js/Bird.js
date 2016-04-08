(function(){
	window.Bird=Class.extend({
		init:function(){
			this.w=85,
			this.h=60,
			//鸟的翅膀状态，合法值0,1,2
			this.x=(game.canvas.width-85)/2,
			this.swing=0;
			this.y=100;
			this.dY=1;
			//开始掉落的帧数
			this.dropStatFram=game.frameUtil.currentFrame;
			//鸟的方向
			this.ro=0;
			//添加监听
			this.bindClickListener();
			//状态,0是下降，1是上升
			this.state=0;

			this.deltaY=0;
			//翅膀扇动速度
			this.swingSpeed=5;

		},
		update:function(){
			if(game.frameUtil.currentFrame %this.swingSpeed==0){
				this.swing++;
				if(this.swing>2){
					this.swing=0;
				}
				//小鸟下降
				if(this.state==0){
					this.swingSpeed=5;
				//dY的变化就是越掉越快
					this.dY=0.02*Math.pow(game.frameUtil.currentFrame-this.dropStatFram,2);
				//旋转的改变
					this.ro+=5;
				}else if(this.state==1){
					//小鸟的上升
					this.deltaY+=3;
					this.dY=-20+this.deltaY ;
					//小鸟上升的极限，就是上升的那一瞬间,往上120px
					if(this.dY>0){
						this.state=0;

						this.dropStatFram=game.frameUtil.cur rentFrame;
					}
				}
					
				}
				this.y+=this.dY;
				//验收
				if(this.y<=0){
					this.y=0;
				}
				if(this.y>game.canvas.height-this.h-49){
					game.pause();
				}
		},
		render:function(){
			//旋转公式
			game.ctx.save();
			game.ctx.translate(this.x+this.w/2,this.y+this.h/2);
			game.ctx.rotate((Math.PI/180)*this.ro);
			game.ctx.translate(-(this.x+this.w/2),-(this.y+this.h/2))
			game.ctx.drawImage(game.images.bird,this.w*this.swing,0,this.w,this.h,this.x,this.y,this.w,this.h)
			game.ctx.restore();
			// game.ctx.fillRect(100, 100, 100, 100)
		},
		fly:function(){
				this.state=1;
				this.deltaY=1;
				//记录一下此时的y
				this.ro=-25;
				this.swingSpeed=2;
		},
		bindClickListener:function(){
			var self=this;
			game.canvas.addEventListener("mousedown",function(){
				self.fly();
			},false)
		}
	})
})();