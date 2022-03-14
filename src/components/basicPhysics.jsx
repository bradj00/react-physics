// MatterStepOne.js
import React, { useEffect, useState, useRef } from 'react'
import Matter from 'matter-js'

export const MatterStepOne = () => {
  const [containerBackgroundColor, setContainerBackgroundColor] = useState('rgba(115,11,222,1)');

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

  function createLevel(){
    console.log('creating level...');
    //static for now. Should get more challenging over time
    let rowHeight   = 12; //12 bricks high
    let rowWidth    = 20; //20 bricks wide

    let brickArray = [];
    //create an array of Rectangle blocks:
    
    for (let i = 1; i < (rowHeight); i++){
    // for (let i = 1; i < (2); i++){
        let rowArray = [];
        for (let q = 1; q < (rowWidth); q++){
            let randomExistence = getRandomInt(100);
            if (randomExistence > 60){continue;}
            rowArray.push(
                // Bodies.rectangle(x, y, 20, ((maxWidth/rowWidth)*.9), {
                Bodies.rectangle( (maxWidth/rowWidth)*q, ((maxHeight/2)/rowHeight)*i,  ((maxWidth/rowWidth)*.9), 20, {
                    // label:'some brick',
                    isStatic: true,
                    friction: 0,
                    frictionAir: 0,
                    frictionStick: 0,
                    render: { fillStyle: 'rgba(222,180,11, 1)', },
                  })
            )
        }
        // console.log(rowArray);
        World.add(engine.world, rowArray)
        // brickArray.push(rowArray);
    }
    engine.positionIterations = 60;
    engine.velocityIterations = 60;
}




  let wallLeft = Bodies.rectangle(-100, 1, 200, maxHeight*2, {
    label:'Lwall',
    isStatic: true,
    friction: 0,
    frictionAir: 0,
    frictionStick: 0,
  });
  let wallRight = Bodies.rectangle(maxWidth+100, 1, 200, maxHeight*2, {
    label:'Rwall',
    isStatic: true,
    friction: 0,
    frictionAir: 0,
    frictionStick: 0,
  });
  let wallTop = Bodies.rectangle(1, -100, maxWidth*2, 200, {
    label:'Twall',
    isStatic: true,
    friction: 0,
    frictionAir: 0,
    frictionStick: 0,
  });

  let boundaryBottom = Bodies.rectangle(1, (maxHeight)+100, maxWidth*2, 200, {
    label:'Bwall',
    isStatic: true,
    friction: 0,
    frictionAir: 0,
    frictionStick: 0,
  });


  let paddle = Bodies.rectangle(200, 650, paddleWidth, paddleHeight, {
    render: { fillStyle: 'rgba(0,0,100,1)', },
    label:'paddle',
    inertia: Infinity,
    mass: Infinity,
    restitution: 0,
    density: Infinity,
    friction: 0,
    frictionAir: 0,
    frictionStick: 0,
    });
  // Matter.Body.setStatic(paddle, true);

  let ball = Bodies.circle(250, maxHeight-150, 10, {
    label:'ball',
    restitution: 1.1, 
    render: {
      fillStyle: 'rgba(0,0,50,1)',
    },
    frictionAir: 0,
    friction:0,
    density:0.0001,
    frictionStick: 0,

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
        background: containerBackgroundColor,
      },
    })

   

    let ballArray = [];          
    for (let i = 0; i < 100; i++){
        ballArray.push(
            Bodies.circle(10*i+200, 0, 10, {
                restitution: 0.9,
                render: {
                fillStyle: '#00ff00',
                },
            })
          )
    }

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
    console.log(ball.position.x, ball.position.y);
    Matter.Body.applyForce( ball, {x: ball.position.x, y: ball.position.y}, {x: 0.0008, y: 0.0005})
    console.log('iterations: ',engine.positionIterations );
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
    console.log('COLLISION: ',event.pairs[0]);
    let labelA = event.pairs[0].bodyA.label;
    let labelB = event.pairs[0].bodyB.label;

    // event.pairs[0].bodyA.render.fillStyle="red";
    
    if ((labelA != 'ball') && (labelA != 'paddle') && (labelA != 'Lwall') && (labelA != 'Rwall') && (labelA != 'Bwall')&& (labelA != 'Twall') ){
      World.remove(engine.world, event.pairs[0].bodyA);
    }
    
    if ((labelB != 'ball') && (labelB != 'paddle') && (labelB != 'Lwall') && (labelB != 'Rwall') && (labelB != 'Bwall')&& (labelB != 'Twall') ){
      World.remove(engine.world, event.pairs[0].bodyB);
    }
    


  });


  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }


  function movePaddle(event) {

    var x = event.clientX;
    var y = event.clientY;
    if (y < (maxHeight - 150) ){
      y = maxHeight - 150;
    }else if (y > (maxHeight - paddleHeight)) {
      y = maxHeight - paddleHeight;
    }

    if (x < ((paddleWidth/2)+20) ){
      x = (paddleWidth/2)+20;
    }else if ( x > (maxWidth - ((paddleWidth/2)+20 )) ) {
      x = (maxWidth - ((paddleWidth/2)+20 ) );
    }

    Matter.Body.setPosition(paddle,  { x: x, y: y });
  }

  return (
    <div
      ref={boxRef}
      style={{
        width: maxWidth,
        height: maxHeight,
      }}
      onMouseMove={(e)=>{movePaddle(e)}}
      onClick={()=>{setBallInMotion()}}
    >
      <canvas ref={canvasRef} />
    </div>
  )
}

export default MatterStepOne;