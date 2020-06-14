//global variable
        var ctx=document.getElementById('ctx').getContext('2d');
            var Width=500;
            var Height=500;
            var snakeList, foodList, direction, eaten, intervalVar, previousDirection, score;
            var running=false;
            var snakeColor='green';
            var countTimer;
            ctx.font="20px Calibri";
            ctx.fillText('Click me to start Game', 140, 250);

            document.getElementById('ctx').onmousedown=function(){
                if(!running){
                            console.log("here");
                                startGame();
                            }
            }

            var snakeBody = {
                width:20,
                height:20,
                color:snakeColor
            };
            var food = {
                width: 20,
                height: 20,
                color: 'orange'
            };
        var snakeList=[
                {x:220,y:200},
                {x:210,y:200},
                {x:200,y:200}
                ];
//controls
        document.onkeydown=function(event){
            if(event.keyCode===37){
                        //0 go left
                        if(previousDirection!==2){
                                                direction=0;
                         }                   }
                    else
            if(event.keyCode===38){
                            //1 go up
                            if(previousDirection!==3)
                            {direction=1;}
            }
            else
            if(event.keyCode===39){
                        //2  go right
                        if(previousDirection!==0)
                        {direction=2;}
                    }
                    else
            if(event.keyCode===40){
                        //3..go down
                        if(previousDirection!==1)
                        {direction=3;}

                    }
                    previousDirection=direction;
            //console.log(direction);
        }
//sb snake body and i for index

            drawSnake=function(sb,i){
                //console.log("draw Snake");
                ctx.save();
                if(i===0)
                {
                    ctx.fillStyle='black'
                }
                else{
                   ctx.fillStyle = snakeBody.color;}
                ctx.fillRect(sb.x,sb.y, snakeBody.width, snakeBody.height);
                ctx.restore();
            }

            testCollision=function(rect1,rect2){
                return ((rect1.x<= rect2.x+food.width)&&
                    (rect2.x<= rect1.x+snakeBody.width)&&
                    (rect1.y<= rect2.y+food.height)&&
                    (rect2.y<= rect1.y+snakeBody.height)
                    );
                                                    }

            testCollisionSnake=function(snake1,snake2){
                var allowance=5;
                return ((Math.abs(snake1.x-snake2.x)<allowance)
                    &&
                    (Math.abs(snake1.y-snake2.y)<allowance)
                    );
            }

//f food in food list, i index
            drawFood=function(f,i){
            ctx.save();
            ctx.fillStyle=food.color;
            ctx.fillRect(f.x, f.y, food.width, food.height);
            ctx.restore();
                            }

// update movement
            updateSnakeList =function(){
                //previousDirection=direction;
                //console.log(previousDirection);
                for(var i=snakeList.length-1;i>=0;i--){
                    switch(direction){
                        case 0:
                        //0- left key
                        if(i===0)
                        {
                            snakeList[i].x=snakeList[i].x-5;
                        }
                        else
                        {
                        snakeList[i].x=snakeList[i-1].x;
                        snakeList[i].y=snakeList[i-1].y;
                        }
                        break;
                        case 1:
                                                //1- down key
                        if(i===0)
                        {
                            snakeList[i].y=snakeList[i].y-5;
                        }
                        else
                        {
                        snakeList[i].x=snakeList[i-1].x;
                        snakeList[i].y=snakeList[i-1].y;
                        }
                        break;
                        case 2:
                                                //0- left key
                        if(i===0)
                        {
                            snakeList[i].x=snakeList[i].x+5;
                        }
                        else
                        {
                        snakeList[i].x=snakeList[i-1].x;
                        snakeList[i].y=snakeList[i-1].y;
                        }
                        break;
                        case 3:
                                                //0- left key
                        if(i===0)
                        {
                            snakeList[i].y=snakeList[i].y+5;
                        }
                        else
                        {
                        snakeList[i].x=snakeList[i-1].x;
                        snakeList[i].y=snakeList[i-1].y;
                        }
                        break;
                    }
                }
            }

            checkSnakePosition=function(){
                var allowance=5;
                if(snakeList[0].x>=(500-4*allowance))
                {
                    snakeBody.color='red';
                    snakeList.forEach(drawSnake);
                    //console.log("bumped");
                    clearInterval(intervalVar);
                    ctx.fillText("Game Over, click on screen to start again",150, 250);
                    running=false;
                    //console.log(snakeBody.color);
                    //snakeList[0].x=0;
                }
                else
                if(snakeList[0].x<(0+allowance))
                {
                    snakeBody.color='red';
                    snakeList.forEach(drawSnake);
                    clearInterval(intervalVar);
                    ctx.fillText("Game Over, click on screen to start again",150, 250);
                    running=false;
                    //snakeList[0].x=500;
                }
                else
                    if(snakeList[0].y>=(500-4*allowance))
                    {
                        snakeBody.color='red';
                    snakeList.forEach(drawSnake);
                        clearInterval(intervalVar);
                    ctx.fillText("Game Over, click on screen to start again",150, 250);
                    running=false;
                        //snakeList[0].y=0
                    }
                else
                    if(snakeList[0].y<(0+allowance))
                    {
                        snakeBody.color='red';
                    snakeList.forEach(drawSnake);
                        clearInterval(intervalVar);
                    ctx.fillText("Game Over, click on screen to start again",150, 250);
                    running=false;
                        //snakeList[0].y=500;
                    }
            }

            isGameOver=function(){
                console.log("crash test");
                for(i in snakeList){
                    if(i==0)
                    continue;
                if(testCollisionSnake(snakeList[0],snakeList[i]))
                    {
                        snakeBody.color='red';
                    snakeList.forEach(drawSnake);
                        clearInterval(intervalVar);
                        ctx.fillText("Game Over, click on screen to start again",150, 250);
                    running=false;
                return;
                    }
                }
            }


            updateSnakePosition=function(){

                //console.log("check");
                ctx.clearRect(0,0,Width,Height);
                while(eaten){
                    var pos_x=Math.random()*485+5;
                    var pos_y=Math.random()*485+5;
                    foodList[0]= {x:pos_x, y:pos_y};
                    eaten=false;
                }

                foodList.forEach(drawFood);
                snakeList.forEach(drawSnake);
                if(testCollision(snakeList[0],foodList[0])){
                    foodList=[];
                    eaten=true;
                    score++;
                    var new_X, new_Y;
                    //0 go left
//left
//1 go up
//2  go right
//3..go down
                    if(direction===0){
                        new_X=snakeList[0].x-10;
                        new_Y=snakeList[0].y;
                    }

                        if(direction===1){
                        new_X=snakeList[0].x;
                        new_Y=snakeList[0].y-10;
                    }
                        if(direction===2){
                        new_X=snakeList[0].x+10;
                        new_Y=snakeList[0].y;
                    }
                    if(direction===3){
                        new_X=snakeList[0].x;
                        new_Y=snakeList[0].y+10;
                    }
                    snakeList.unshift({x:new_X, y:new_Y});//pluck a new head
                    //console.log(snakeList);
                }
                ctx.fillText('Score '+score, 420, 30);
                ctx.fillText('Timer '+countTimer, 420, 50);
                countTimer++;
                //setInterval(Timer,100); //timer
                isGameOver();
                checkSnakePosition();
                updateSnakeList();
            }

Timer=()=>
{
    ctx.save();
    //ctx.clearRect(0,0,Width,Height);
    ctx.clearRect(420,50,10,10);
    ctx.fillText('Timer '+countTimer, 420, 50)
    countTimer++;
    ctx.restore();
}

            startGame= function(){
                snakeList=[
                {x:220,y:200},
                {x:210,y:200},
                {x:200,y:200}
                ];
                snakeBody.color="green";
                ctx.clearRect(0,0,Width,Height);
                ctx.fillText('Timer ', 420, 50)
                score=0;
                foodList=[];
                direction=99;
                eaten=true;
                running=true;
                countTimer=0;
//console.log(snakeList);
// for each is to loop in the snakeList
                //snakeList.forEach(drawSnake);
                intervalVar=setInterval(updateSnakePosition,20);//100fps


                //updateSnakePosition();
            }
//            startGame();