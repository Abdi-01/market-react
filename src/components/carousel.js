import React, { Component } from 'react'
import { UncontrolledCarousel } from 'reactstrap';


const items = [
    {
      src: 'https://image.winudf.com/v2/image1/c3VucmlzZS5zYW1zdW5nLnMxMC5nYWxheHlzMTAuczEwcGx1cy5zMTB3YWxscGFwZXJzLnMxMS5sYXVuY2hlci50aGVtZV9zY3JlZW5fMF8xNTQxNTA0MDk3XzA5Nw/screen-0.jpg?fakeurl=1&type=.jpg',
      altText: 'Slide 1',
      caption: 'Slide 1',
      header: 'Slide 1 Header',
      key: '1'
    },
    {
      src: 'https://melali.news/wp-content/uploads/2019/09/IMG_20190919_192335.jpg',
      altText: 'Slide 2',
      caption: 'Slide 2',
      header: 'Slide 2 Header',
      key: '2'
    },
    {
      src: 'https://www.soyacincau.com/wp-content/uploads/2019/09/190912-celcom-iphone-11.jpg',
      altText: 'Slide 3',
      caption: 'Slide 3',
      header: 'Slide 3 Header',
      key: '3'
    }
  ];

  class imgSlide extends Component{
      render(){
          return(
              <div className="sizeCarousle">
                  <UncontrolledCarousel items={items} ></UncontrolledCarousel>
              </div>
          )
      }
  }

  export default imgSlide