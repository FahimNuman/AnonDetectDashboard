import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const ProjectChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://anon-cat.vercel.app/api/v1/project"
        );
        const data = await response.json();

        console.log(data); // Check data format

        const labels = data.map((project) => project.projectTitle);
        const projectDates = data.map((project) =>
          new Date(project.createdAt).getTime()
        );

        setChartData({
          labels,
          datasets: [
            {
              label: "Project Created Dates",
              data: projectDates,
              borderColor: "rgba(75,192,192,1)",
              borderWidth: 2,
              backgroundColor: "rgba(75,192,192,0.2)",
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="chart-container">
      <Line data={chartData} />
    </div>
  );
};

export default ProjectChart;
