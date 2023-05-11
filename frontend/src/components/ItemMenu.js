import React from 'react';
import Card from 'react-bootstrap/Card';
import { Image } from 'react-bootstrap';

function ItemMenu(props) {
  console.log(props);
  return (
    <Card className='carousel-card'>
      <Card.Body>
        <Card.Text className='text-center' style={{ position: 'absolute' }}>
          {props.name}
        </Card.Text>
        <Image className='mt-4' src={props.image} fluid rounded></Image>
      </Card.Body>
    </Card>
  );
}

export default ItemMenu;
