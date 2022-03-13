// MatterStepOne.js
import React, { useEffect, useRef } from 'react'
import Matter from 'matter-js'

export const MatterStepOne = () => {
  const boxRef = useRef(null)
  const canvasRef = useRef(null)



  const maxHeight = 900;
  const maxWidth = 1900;

  let Engine = Matter.Engine
  let Render = Matter.Render
  let World = Matter.World
  let Bodies = Matter.Bodies
  let engine = Engine.create({})
  
  let paddle = Bodies.rectangle(200, 850, 150, 20, { render: { fillStyle: '#ccc', }, });
  
  let ball = Bodies.circle(250, 0, 10, {
    restitution: 1,
    render: {
      fillStyle: 'blue',
    },
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
      },
    })

    // const floor = Bodies.rectangle(150, 800, 3500, 20, {
    //   isStatic: true,
    //   render: {
    //     fillStyle: 'blue',
    //   },
    // })

   




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



    // World.add(engine.world, [floor])
    World.add(engine.world, [ball])
    World.add(engine.world, [paddle])

    engine.gravity.y = 0;
    Engine.run(engine)
    Render.run(render)
  }, [])

  // function showCoords(event) {
  //   console.log(paddle);
  // }

  function setVel() {
    // Matter.Body.setAngularVelocity(ball, 0.02);
    console.log(ball.position.x, ball.position.y);
    Matter.Body.applyForce( ball, {x: ball.position.x, y: ball.position.y}, {x: 0, y: 0.01})
  }

 

  function movePaddle(event) {
    var x = event.clientX;
    var y = event.clientY;
    paddle.position.x = event.clientX;
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
      onClick={()=>{setVel()}}
    >
      <canvas ref={canvasRef} />
    </div>
  )
}

export default MatterStepOne;