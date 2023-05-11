import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import ItemMenu from './ItemMenu';
import axios from 'axios';

async function fetchCategories() {
  try {
    const { data } = await axios.get('http://localhost:5000/api/categories');
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

function Categories() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function callFetch() {
      const res = await fetchCategories();
      setData(res);
    }

    callFetch();
  }, []);

  return (
    <Container fluid>
      <h1 className='mb-2'>Categories</h1>
      <Carousel variant='dark' indicators={false} interval={null}>
        <Carousel.Item>
          {data.slice(0, data.length / 2).map(item => (
            <ItemMenu name={item.name} image={item.image} />
          ))}
        </Carousel.Item>

        <Carousel.Item>
          {data.slice(data.length / 2).map(item => (
            <ItemMenu name={item.name} image={item.image} />
          ))}
        </Carousel.Item>
      </Carousel>
    </Container>
  );
}

export default Categories;
