// MatterStepOne.js
import React, { useEffect, useState, useRef, useContext} from 'react'
import Matter from 'matter-js'
import {PlayerInfo} from '../App.js';

export const MatterStepOne = () => {
  const [containerBackgroundColor, setContainerBackgroundColor] = useState('rgba(115,11,222,1)');
 
  const {playerCurrentScore}      = useContext(PlayerInfo);
  const {setPlayerCurrentScore}   = useContext(PlayerInfo);
  const {thePlayerCurrentScore}   = useContext(PlayerInfo);

  const boxRef = useRef(null)
  const canvasRef = useRef(null)

  const maxHeight = window.innerHeight * 0.86;
  const maxWidth = window.innerWidth * 0.99;
  const paddleHeight = 20;
  const paddleWidth = 150;

  let Engine = Matter.Engine
  let Render = Matter.Render
  let World = Matter.World
  let Bodies = Matter.Bodies
  let engine = Engine.create({


  })

  let rowArray = []; //declared in larger scope so we can check if all bricks have been destroyed
  function createLevel(){
    console.log('creating level...');
    //static for now. Should get more challenging over time
    let rowHeight   = 12; //12 bricks high
    let rowWidth    = 20; //20 bricks wide

    //create an array of Rectangle blocks:
    let brickArray  = [];
    let brickColors = ['blue','cyan','green','magenta','red','yellow','orange','gray'];
    
    for (let i = 1; i < (rowHeight); i++){
    // for (let i = 1; i < (2); i++){
        
        for (let q = 1; q < (rowWidth); q++){
            let randomExistence = getRandomInt(100);
            if (randomExistence > 70){continue;}

            let randomBrickColor = getRandomInt(7);

            rowArray.push(
                // Bodies.rectangle(x, y, 20, ((maxWidth/rowWidth)*.9), {
                Bodies.rectangle( (maxWidth/rowWidth)*q, ((maxHeight/2)/rowHeight)*i,  ((maxWidth/rowWidth)*.9), 20, {
                    label:'brick',
                    isStatic: true,

                    render: { fillStyle: brickColors[randomBrickColor], },
                  })
            )
        }
        // console.log(rowArray);
        World.add(engine.world, rowArray)
        // brickArray.push(rowArray);
    }
    engine.positionIterations = 10;
    engine.velocityIterations = 10;
  }


  let wallLeft = Bodies.rectangle(-100, 1, 200, maxHeight*2, {
    label:'Lwall',
    isStatic: true,
    friction: 0,
    frictionAir: 0,
    frictionStick: 0,
    restitution: 1,
    inertia: Infinity,
  });
  let wallRight = Bodies.rectangle(maxWidth+100, 1, 200, maxHeight*2, {
    label:'Rwall',
    isStatic: true,
    friction: 0,
    frictionAir: 0,
    frictionStick: 0,
    restitution: 1,
    inertia: Infinity,
  });
  let wallTop = Bodies.rectangle(1, -100, maxWidth*2, 200, {
    label:'Twall',
    isStatic: true,
    friction: 0,
    frictionAir: 0,
    frictionStick: 0,
    restitution: 1,
    inertia: Infinity,
  });

  let boundaryBottom = Bodies.rectangle(1, (maxHeight)+100, maxWidth*2, 200, {
    label:'Bwall',
    isStatic: true,
    friction: 0,
    frictionAir: 0,
    frictionStick: 0,
    restitution: 1,
    inertia: Infinity,
  });


  let paddle = Bodies.rectangle(200, 650, paddleWidth, paddleHeight, {
    render: { fillStyle: '#bbb', },
    label:'paddle',
    inertia: Infinity,
    mass: Infinity,
    restitution: 1,
    density: 1,

    });
  // Matter.Body.setStatic(paddle, true);

  let ball = Bodies.circle(250, maxHeight-150, 10, {
    label:'ball',
    restitution: 1, 
    render: {
      fillStyle: 'rgba(255,255,255,1)',
    },
    frictionAir: 0,
    friction:0,
    density:0.004,
    inertia: Infinity,

  })

  let render;

  useEffect(() => {
    

    render = Render.create({
      element: boxRef.current,
      engine: engine,
      canvas: canvasRef.current,
      options: {
        width: maxWidth,
        height: maxHeight,
        background: 'rgba(100, 100, 100, 0.5)',
        wireframes: false,
        showAngleIndicator: false,
        showCollisions: false,
        showVelocity: false,
        // background: containerBackgroundColor,
        background: 'linear-gradient(0deg, rgba(51,49,180,0.9752275910364145) 0%, rgba(0,0,10,1) 100%, rgba(24,24,24,0.9304096638655462) 100%)',
      },
    })

   


    World.add(engine.world, [wallTop])
    World.add(engine.world, [wallLeft])
    World.add(engine.world, [wallRight])
    World.add(engine.world, [boundaryBottom])

    World.add(engine.world, [ball])
    World.add(engine.world, [paddle])

    engine.gravity.y = 0;
    Engine.run(engine)
    Render.run(render)
    createLevel();
  }, [])

  function setBallInMotion() {
    Matter.Body.applyForce( ball, {x: ball.position.x, y: ball.position.y}, {x: 1, y: 0.15})
    console.log(Matter.Composite.allBodies(engine.world),Matter.Composite.get(engine.world, 12, 'rectangle'));
  }

  const limitMaxSpeed = () => {
    let maxSpeed = 15;
    if (ball.velocity.x > maxSpeed) {
        Matter.Body.setVelocity(ball, { x: maxSpeed, y: ball.velocity.y });
    }

    if (ball.velocity.x < -maxSpeed) {
      Matter.Body.setVelocity(ball, { x: -maxSpeed, y: ball.velocity.y });
    }

    if (ball.velocity.y > maxSpeed) {
      Matter.Body.setVelocity(ball, { x: ball.velocity.x, y: maxSpeed });
    }

    if (ball.velocity.y < -maxSpeed) {
      Matter.Body.setVelocity(ball, { x: -ball.velocity.x, y: -maxSpeed });
    }
  }
  Matter.Events.on(engine, 'beforeUpdate', limitMaxSpeed);



  Matter.Events.on(engine, 'collisionStart', function(event) {
    
    let labelA = event.pairs[0].bodyA.label;
    let labelB = event.pairs[0].bodyB.label;
    
    // event.pairs[0].bodyA.render.fillStyle="red";
    
    if (labelA == 'brick'){
      World.remove(engine.world, event.pairs[0].bodyA);
      Matter.Composite.remove(engine.world, event.pairs[0].bodyA);
      setPlayerCurrentScore(playerCurrentScore => playerCurrentScore + 50);
      // console.log('removing: ',event.pairs[0].bodyA)
    }
    
    if (labelB == 'brick'){
      World.remove(engine.world, event.pairs[0].bodyB);
      Matter.Composite.remove(engine.world, event.pairs[0].bodyB);
      setPlayerCurrentScore(playerCurrentScore => playerCurrentScore + 50);
      // console.log('removing: ',event.pairs[0].bodyB)
    }

  });


  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }


  function movePaddle(event) {
    
    var x = event.clientX;
    var y = event.clientY;
    // if (y < (maxHeight - 150) ){
    //   y = maxHeight - 150;
    // }else if (y > (maxHeight - paddleHeight)) {
    //   y = maxHeight - paddleHeight;
    // }

    // if (x < ((paddleWidth/2)+20) ){
    //   x = (paddleWidth/2)+20;
    // }else if ( x > (maxWidth - ((paddleWidth/2)+20 )) ) {
    //   x = (maxWidth - ((paddleWidth/2)+20 ) );
    // }
    Matter.Body.set(paddle, "position", {x: event.clientX, y: event.clientY})
    // Matter.Body.setPosition(paddle,  { x: x, y: y });
    // console.log('set position: ',event.clientX,event.clientY, paddle);
  }

  return (
    <div
      ref={boxRef}
      style={{
        width: maxWidth,
        height: maxHeight,
      }}
      onMouseMove={(e)=>{movePaddle(e)}}
      onClick={(e)=>{setBallInMotion()}}
    >
      <canvas ref={canvasRef} />
    </div>
  )
}

export default MatterStepOne;