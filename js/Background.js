(function(){
	//背景类,就是所有的平铺的背景
	window.Background=Class.extend({
		init:function(params){
			this.image=params.image;
			this.width=params.width;
			this.height=params.height;
			this.speed=params.speed;
			this.y=params.y;
			this.x=0;
			//图片个数，画布总宽度除以图片宽度，向上取整
			this.amount=parseInt(canvas.width/this.width)+1;
		},
		update:function(){
			this.x-=this.speed;
			// console.log(this.amount*this.width)
			if(this.x<=-this.width*this.amount){
				this.x=0;
			}
		},
		render:function(){
			//绘制图片，绘制2倍的图片
			for(var i=0;i<this.amount*2;i++){
				game.ctx.drawImage(this.image,0,0,this.width,this.height,this.x+this.width*i,this.y,this.width,this.height)
			}
			// game.ctx.drawImage(this.image,0,0,this.width,this.height,this.x+this.width*1,this.y,this.width,this.height)
			// game.ctx.drawImage(this.image,0,0,this.width,this.height,this.x+this.width*2,this.y,this.width,this.height)
		}
	})
})()