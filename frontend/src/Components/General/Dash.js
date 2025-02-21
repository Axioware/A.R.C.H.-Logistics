import React, { useState } from "react";
import Chart from "react-apexcharts";
import DollarIcon from "../Icons/DollarIcon";
import { Bar, Doughnut } from "react-chartjs-2";
// import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, ArcElement);
ChartJS.register(CategoryScale);

const Dashboard = () => {
  const [stats] = useState([
    { title: "VALUE", value: "$30,000", change: "+4.4%" },
    { title: "USERS", value: "50,021", change: "+2.6%" },
    { title: "ORDERS", value: "45,021", change: "+3.1%" },
    { title: "TICKETS", value: "20,516", change: "+3.1%" }
  ]);

  const barChartOptions = { chart: { type: "bar" }, xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] } };
  const barChartSeries = [{ name: "Sales", data: [60, 30, 100, 50, 60, 40, 100, 70, 50, 30, 60, 55] }];

  const lineChartOptions = { chart: { type: "line" }, xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] } };
  const lineChartSeries = [{ name: "Users", data: [100, 60, 70, 80, 90, 100, 110, 120, 80, 70, 60, 90] }];

  const doughnutChartOptions = { labels: ["Oct", "Nov", "Dec"], colors: ["#00aaff", "#0099dd", "#0077cc"] };
  const doughnutChartSeries = [40, 30, 30];

  const barChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [{ label: "Sales", data: [50, 30, 60, 50, 70, 40, 60, 50, 70, 50, 90, 100], backgroundColor: "#0099dd" }]
  };

  const doughnutChartData = {
    labels: ["Oct", "Nov", "Dec"],
    datasets: [{ data: [40, 30, 30], backgroundColor: ["#00aaff", "#0099dd", "#0077cc"] }]
  };

  return (
    <div className="p-4 grid gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <div key={index} className="p-4 bg-white shadow rounded">
            <h3 className="text-xs text-grey-400">{stat.title}</h3>
            <div style={{display: "flex", flexDirection: "row", gap: "10px"}}>
            <p className="text-2xl">{stat.value}</p>
            <span className="text-xs text-green-500 bg-green-100 px-2 py-2 rounded-lg">{stat.change}</span>
            <span className="ml-auto text-gray-400"><DollarIcon width="80px" height="80px"/></span> 
            </div>
          </div>
        ))}
      </div>

      {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="col-span-2 p-4 bg-white shadow rounded">
          <h3 className="text-lg font-semibold">Bar Chart</h3>
          <Chart options={barChartOptions} series={barChartSeries} type="bar" height={250}/>
        </div>

        <div className="p-4 bg-white shadow rounded">
          <h3 className="text-lg font-semibold">Doughnut Chart</h3>
          <Chart options={doughnutChartOptions} series={doughnutChartSeries} type="donut" height={250} />
        </div>
      </div> */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="col-span-2 p-4 bg-white shadow rounded">
          <h3 className="text-lg font-semibold">Bar Chart</h3>
          <Bar data={barChartData} options={{ responsive: true, plugins: { legend: { display: false } }, scales: { x: { ticks: { color: '#A0AEC0', fontSize: 12 } }, y: { ticks: { color: '#A0AEC0', fontSize: 12 } } }, datasets: { bar: { barThickness: 10, maxBarThickness: 40 } } }} height={100} />
        </div>

        <div className="col-span-1 p-2 bg-white shadow rounded">
          <h3 className="text-lg font-semibold">Doughnut Chart</h3>
          {/* <Doughnut 
  data={doughnutChartData} 
  options={{ 
    responsive: true, 
    layout: { padding: 0 },
    // maintainAspectRatio: false,
    plugins: { legend: { position: "bottom" } }, 
    cutout: '70%', 
    radius: 80 
  }} 
  style={{ height: '50px', width: '50px' }} 
/> */}
<Chart options={doughnutChartOptions} series={doughnutChartSeries} type="donut" height={330} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="p-4 bg-white shadow rounded">
          <h3 className="text-lg font-semibold">Active users right now</h3>
          <p className="text-2xl">24 Users</p>
          <Chart options={barChartOptions} series={barChartSeries} type="bar" height={150} />
        </div>

        <div className="col-span-2 p-4 bg-white shadow rounded">
          <h3 className="text-lg font-semibold">Line Chart</h3>
          <Chart options={lineChartOptions} series={lineChartSeries} type="line" height={250} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;