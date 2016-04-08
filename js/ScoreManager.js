(function(){
	window.scoreManager=Class.extend({
		init:function(){
			this.score=0;
		},
		update:function(){

		},
		addPoint:function(){
			this.score++;
		},
		render:function(){
			var len=this.score.toString().length;
			// console.log(len)
			if(len % 2==0){
				//偶数基准位置
				var jizhunwei=(game.canvas.width/2)-len/2*40;
				console.log(jizhunwei)
			}else{
				//基数基准位置
					var jizhunwei=(game.canvas.width/2)-(len-1)/2*40-20;
			}
			for(var i=0;i<len;i++){
				// console.log(scoreStr.substr(i,1))
				var currentWei=parseInt(this.score.toString().substr(i,1));
				renderYiweshu(currentWei,jizhunwei+i*40,100)
			}

		},
	})
	//渲染以一位数
	function renderYiweshu(num,x,y){
			game.ctx.drawImage(game.images.number,num*40,0,40,57,x,y,40,57)
	}
})()