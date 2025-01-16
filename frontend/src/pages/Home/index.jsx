import React from "react";
import Category from "./Category";
import Banner from "./Banner";
import Product from "./Product";
import Service from "./Service";
import Testimonials from "./Testimonials";

const Home = () => {
  return (
    <>
      <Banner />
      <Category />
      <Product />
      <Testimonials />
      <Service />
    </>
  );
};

export default Home;
