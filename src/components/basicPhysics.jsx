// MatterStepOne.js
import React, { useEffect, useRef } from 'react'
import Matter from 'matter-js'

export const MatterStepOne = () => {
  const boxRef = useRef(null)
  const canvasRef = useRef(null)

  const maxHeight = 900;
  const maxWidth = 1900;
  const paddleHeight = 20;
  const paddleWidth = 150;

  let Engine = Matter.Engine
  let Render = Matter.Render
  let World = Matter.World
  let Bodies = Matter.Bodies
  let engine = Engine.create({


  })
  
  let wallLeft = Bodies.rectangle(1, 1, 20, maxHeight*2, {
    isStatic: true,
    friction: 0,
    frictionAir: 0,
    frictionStick: 0,
  });
  let wallRight = Bodies.rectangle(maxWidth, 1, 20, maxHeight*2, {
    isStatic: true,
    friction: 0,
    frictionAir: 0,
    frictionStick: 0,
  });
  let wallTop = Bodies.rectangle(1, 1, maxWidth*2, 20, {
    isStatic: true,
    friction: 0,
    frictionAir: 0,
    frictionStick: 0,
  });

  let boundaryBottom = Bodies.rectangle(1, (maxHeight)-0, maxWidth*2, 20, {
    isStatic: true,
    friction: 0,
    frictionAir: 0,
    frictionStick: 0,
  });


  let paddle = Bodies.rectangle(200, 850, paddleWidth, paddleHeight, {
    render: { fillStyle: '#ccc', },
    inertia: Infinity,
    mass: Infinity,
    restitution: 0,
    density: Infinity,
    friction: 0,
    frictionAir: 0,
    frictionStick: 0,
    });
  // Matter.Body.setStatic(paddle, true);

  let ball = Bodies.circle(250, 50, 10, {
    restitution: 1.1, 
    render: {
      fillStyle: 'blue',
    },
    frictionAir: 0,
    friction:0,
    density:0.0001,
    frictionStick: 0,

  })

  useEffect(() => {
    

    let render = Render.create({
      element: boxRef.current,
      engine: engine,
      canvas: canvasRef.current,
      options: {
        width: maxWidth,
        height: maxHeight,
        background: 'rgba(100, 100, 100, 0.5)',
        wireframes: false,
        showAngleIndicator: true,
        showCollisions: true,
        showVelocity: true,
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
  }, [])


  function setBallInMotion() {

    console.log(ball.position.x, ball.position.y);
    Matter.Body.applyForce( ball, {x: ball.position.x, y: ball.position.y}, {x: 0, y: 0.0003})
  }

 

  function movePaddle(event) {
    var x = event.clientX;
    var y = event.clientY;
    if (y < (maxHeight - 150) ){
      y = maxHeight - 150;
    }
    else if (y > (maxHeight - paddleHeight)) {
      y = maxHeight - paddleHeight;
    }
    if (x < (paddleWidth/2) ){
      x = paddleWidth/2;
    }
    else if (x > (maxWidth - (paddleWidth/2))) {
      x = (maxWidth - (paddleWidth/2));
    }

    Matter.Body.setPosition(paddle,  { x: x, y: y });
    // paddle.position.x = event.clientX;
    // Matter.Body.setStatic(paddle, true);
    // paddle.position.y = event.clientY;
    // console.log(paddle);
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