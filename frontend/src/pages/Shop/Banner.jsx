const Banner = () => {
  return (
    <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
      <div className="py-16 px-48 flex flex-col justify-center items-center">
        <div className="text-center space-y-7 px-4">
          <h2 className="md:text-4xl text-4xl font-bold md:leading-snug leading-snug">
            Unleash Your Inner <span className="text-red">Geek</span>:<br />
            Shop Our Exclusive Tech-themed Merchandise!
          </h2>
          <p className="text-xl text-[#4A4A4A]">
            We offer a curated selection of high-quality products ranging from
            clothing and accessories to home decor and office essentials. Each
            item is carefully chosen to meet our standards of quality.
            functionality, and style.
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
