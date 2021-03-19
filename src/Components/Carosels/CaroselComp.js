import React from 'react'
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel'
import Hom1 from '../Image/hom1.jpg'
import Hom2 from '../Image/hom2.jpg'
import Hom3 from '../Image/hom3.jpg'

function CaroselComp() {
  return (
    <div>
      <Carousel fade>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Hom1}
            alt="Third slide"
            style={{ height: '400px', width: '100vw', objectFit: 'cover' }}
          />

          <Carousel.Caption>
            <div> In Search Of a Home? </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Hom2}
            alt="Third slide"
            style={{ height: '400px', width: '100vw', objectFit: 'cover' }}
          />

          <Carousel.Caption>
            <div> We Help Ingnite Your Dream Home </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Hom3}
            alt="Third slide"
            style={{ height: '400px', width: '100vw', objectFit: 'cover' }}
          />

          <Carousel.Caption>
            <div> In a Very Easy Manner </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  )
}

export default CaroselComp
