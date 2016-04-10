(function(){
	window.Pipe=Class.extend({
		init:function(){
			console.log("进入管子")
			//0表示向上的管子，1表示向下的管子
			this.type=_.random(0,1);
			//宽度
			this.w=148;
			//高度
			this.h=_.random(100,game.canvas.height/2);
			// 管子类型,0表示向上的管子，1表示向下的管子
			this.y=this.type==0 ? game.canvas.height-this.h-49:0;
			//初始化管子的位置
			this.x=game.canvas.width;
			//速度
			this.speed=5;
		},
		 pause : function(){
            this.speed = 0;
        },
		update:function(){
			this.x-=this.speed;
			if(this.x<-this.w){
				game.pipeArray=_.without(game.pipeArray,this)
			}
			//碰撞检测
			if(game.bird.x>this.x-game.bird.w && game.bird.x<this.x+this.w){
					//鸟已经死
					//向上的管子
					if(this.type==0){
						if(game.bird.y>this.y-game.bird.h){
							// game.pause();
							game.gameOver();
							return;
						}
					//向下的管子
					}else if(this.type==1){
						if(game.bird.y<=this.h){
							// game.pause();
							game.gameOver();
							return;
						}
					}
			}
			//加分
			if(this.x+this.w< game.bird.x && !this.done){
				game.scoreManager.addPoint();
				this.done=true;
			}
		},
		render:function(){

			if(this.type==0){
				game.ctx.drawImage(game.images["pipe"+this.type],0,0,this.w,this.h,this.x,this.y,this.w,this.h)
			}else if(this.type==1){
				game.ctx.drawImage(game.images["pipe"+this.type],0,1664-this.h,this.w,this.h,this.x,this.y,this.w,this.h)
			}
		}
	})
})()