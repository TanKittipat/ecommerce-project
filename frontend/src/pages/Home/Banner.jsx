import ProductItem from "../../components/ProductItem";

const Banner = () => {
  return (
    <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#7b202091] to-100%">
      <div className="py-24 flex flex-col md:flex-row-reverse justify-between items-center">
        <div className="md:w-1/2">
          <img src="/images/home/banner.png" alt="banner" />
          <div className="flex flex-col md:flex-row items-center justify-around -mt-20 gap-4">
            <ProductItem
              image="/images/home/gamepad.png"
              name="Game pad"
              price={499}
              rating={4}
            />
            <ProductItem
              image="/images/home/headphone.png"
              name="Headphone"
              price={999}
              rating={5}
            />
          </div>
        </div>
        <div className="md:w-1/2 space-y-7 px-4">
          <h2 className="md:text-4xl text-4xl font-bold md:leading-snug leading-snug">
            Discover uniq{" "}
            <span className="text-red">Software Engineering Swag</span> for
            Every coding Enthusiasm!
          </h2>
          <p className="text-xl text-[#4A4A4A]">
            Our Mission: To merge fashion with functionality in the world of
            Software Engineering
          </p>
          <a
            href="/shop"
            className="btn bg-red px-8 py-3 font-semibold text-white rounded-full"
          >
            Order now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
