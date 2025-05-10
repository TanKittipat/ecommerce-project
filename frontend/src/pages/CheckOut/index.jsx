import React from "react";

const CheckOutSuccess = () => {
  return (
    <div className="min-h-[61.5vh] max-w-[800px] w-full m-auto flex flex-col items-center justify-center">
      <h2 className="text-[2rem] mb-[1rem] text-emerald-700">
        Check out successful
      </h2>
      <p>Your order might take sometime to process.</p>
      <p>Check your order status at your profile after about 10 minutes.</p>
      <p>
        In case of any inquiries contact the support at{" "}
        <strong>654259026@webmail.npru.ac.th</strong>
      </p>
    </div>
  );
};

export default CheckOutSuccess;
