import React from "react";
import Carousel from "react-bootstrap/Carousel";
import ItemMenu from "./ItemMenu";

function Categories() {
  return (
    <Carousel variant="dark" indicators={false}>
      <Carousel.Item>
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
      </Carousel.Item>
    </Carousel>
  );
}

export default Categories;
