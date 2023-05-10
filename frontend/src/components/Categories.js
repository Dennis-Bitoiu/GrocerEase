import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ItemMenu from './ItemMenu';
import Container from 'react-bootstrap/Container';

function Categories() {
  return (
    <Container fluid>
      <h1 className='mb-2'>Categories</h1>
      <Carousel variant='dark' indicators={false} interval={null}>
        <Carousel.Item>
          <ItemMenu></ItemMenu>
          <ItemMenu></ItemMenu>
          <ItemMenu></ItemMenu>
          <ItemMenu></ItemMenu>
          <ItemMenu></ItemMenu>
          <ItemMenu></ItemMenu>
          <ItemMenu></ItemMenu>
          <ItemMenu></ItemMenu>
          <ItemMenu></ItemMenu>
          <ItemMenu></ItemMenu>
          <ItemMenu></ItemMenu>
          <ItemMenu></ItemMenu>
          <ItemMenu></ItemMenu>
          <ItemMenu></ItemMenu>
        </Carousel.Item>

        <Carousel.Item>
          <ItemMenu></ItemMenu>
          <ItemMenu></ItemMenu>
          <ItemMenu></ItemMenu>
          <ItemMenu></ItemMenu>
          <ItemMenu></ItemMenu>
          <ItemMenu></ItemMenu>
          <ItemMenu></ItemMenu>
          <ItemMenu></ItemMenu>
          <ItemMenu></ItemMenu>
          <ItemMenu></ItemMenu>
          <ItemMenu></ItemMenu>
          <ItemMenu></ItemMenu>
          <ItemMenu></ItemMenu>
          <ItemMenu></ItemMenu>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
}

export default Categories;
