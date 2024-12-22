import React, { Suspense } from "react";

// Dynamically import the chart components
const UserCharts = React.lazy(() => import("@/features/charts/components/UserCharts"));
const MenteeCharts = React.lazy(() => import("@/features/charts/components/MenteeCharts"));
const RevenueCharts = React.lazy(() => import("@/features/charts/components/RevenueCharts"));

const AdminDashboard = () => {
  return (
    <section className="admin-dashboard p-4 flex flex-col gap-y-5">
      <div className="stats-section grid grid-cols-4 gap-3 text-xl">
        <div className=" bg-white rounded shadow-md p-2">
          <h3>Total Users</h3>
          <span className="font-bold">557,456</span>
        </div>
        <div className=" bg-white rounded shadow-md p-2">
          <h3>Total Mentors</h3>
          <span className="font-bold">30</span>
        </div>
        <div className=" bg-white rounded shadow-md p-2">
          <h3>Total Mentees</h3>
          <span className="font-bold">100,456</span>
        </div>
        <div className=" bg-white rounded shadow-md p-2">
          <h3>Total Revenue</h3>
          <span className="font-bold">
            <span>$</span>557,456
          </span>
        </div>
      </div>

      <section className="charts-section grid grid-cols-2 gap-5">
        <div>
          <Suspense fallback={<div>Loading User Charts...</div>}>
            <UserCharts />
          </Suspense>
        </div>
        <div>
          <Suspense fallback={<div>Loading Mentee Charts...</div>}>
            <MenteeCharts />
          </Suspense>
        </div>
        <div className="col-span-2">
          <Suspense fallback={<div>Loading Revenue Charts...</div>}>
            <RevenueCharts />
          </Suspense>
        </div>
      </section>
    </section>
  );
};

export default AdminDashboard;
