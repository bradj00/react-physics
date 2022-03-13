// MatterStepOne.js
import React, { useEffect, useState, useRef } from 'react'
import Matter from 'matter-js'


export const MatterStepOne = () => {
  const [containerBackgroundColor, setContainerBackgroundColor] = useState('rgba(120,250,80,1)');

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
  
  let wallLeft = Bodies.rectangle(1, 1, 20, maxHeight*2, {
    label:'left wall',
    isStatic: true,
    friction: 0,
    frictionAir: 0,
    frictionStick: 0,
  });
  let wallRight = Bodies.rectangle(maxWidth, 1, 20, maxHeight*2, {
    label:'right wall',
    isStatic: true,
    friction: 0,
    frictionAir: 0,
    frictionStick: 0,
  });
  let wallTop = Bodies.rectangle(1, 1, maxWidth*2, 20, {
    label:'top wall',
    isStatic: true,
    friction: 0,
    frictionAir: 0,
    frictionStick: 0,
  });

  let boundaryBottom = Bodies.rectangle(1, (maxHeight)-0, maxWidth*2, 20, {
    label:'bottom wall',
    isStatic: true,
    friction: 0,
    frictionAir: 0,
    frictionStick: 0,
  });


  let paddle = Bodies.rectangle(200, 850, paddleWidth, paddleHeight, {
    render: { fillStyle: '#ccc', },
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

  let ball = Bodies.circle(250, 50, 10, {
    label:'ball',
    restitution: 1.1, 
    render: {
      fillStyle: 'blue',
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
        showAngleIndicator: true,
        showCollisions: true,
        showVelocity: true,
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
  }, [])


  function setBallInMotion() {
    console.log(ball.position.x, ball.position.y);
    Matter.Body.applyForce( ball, {x: ball.position.x, y: ball.position.y}, {x: 0.0003, y: 0.0003})
  }

  Matter.Events.on(engine, 'collisionStart', function(event) {
    // console.log('COLLISION: ',event.pairs[0]);
    console.log('render: ', render);
    // event.pairs[0].bodyA.render.fillStyle="red";
    // event.pairs[0].bodyB.render.fillStyle="red";
    let a = getRandomInt(255);
    let b = getRandomInt(255);
    let c = getRandomInt(255);
    console.log(a,b,c);
    render.options.background = 'rgba('+a+','+b+','+c+',0.4)';


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