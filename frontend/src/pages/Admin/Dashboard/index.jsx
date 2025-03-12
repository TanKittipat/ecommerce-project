import React from "react";
import DashboardCard from "../../../components/DashboardCard";

const Dashboard = () => {
  return (
    <div className="flex justify-center items-center mt-6">
      <div className="grid gap-6 grid-cols-3 w-10/12">
        <DashboardCard
          title={"Products"}
          message={"Manage all products in this system."}
          link={"/dashboard/manage-items"}
          btn={"btn-success"}
        />
        <DashboardCard
          title={"Orders"}
          message={"Manage all orders in this system."}
          link={"/dashboard/orders"}
          btn={"btn-primary"}
        />
        <DashboardCard
          title={"Add Product"}
          message={"Add new product to this system."}
          link={"/dashboard/add-product"}
          btn={"btn-secondary"}
        />
        <DashboardCard
          title={"Users"}
          message={"Manage users in this system."}
          link={"/dashboard/all-users"}
          btn={"btn-accent"}
        />
      </div>
    </div>
  );
};

export default Dashboard;
