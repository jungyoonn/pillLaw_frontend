import Chart from "chart.js/auto";
import { CategoryScale, LinearScale } from "chart.js";
import { useEffect, useRef } from "react";

const ReviewChart = ({ ratingDistribution = [0, 0, 0, 0, 0], activeTab }) => {
  Chart.register(CategoryScale, LinearScale);
  console.log("Received ratingDistribution in ReviewChart:", ratingDistribution);

  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (activeTab !== "real-product-review") return;
    if (!chartRef.current) return;
  
    if (chartInstance.current) {
      chartInstance.current.destroy(); // 기존 차트 파괴
    }
  
    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["1점", "2점", "3점", "4점", "5점"],
        datasets: [
          {
            label: "리뷰 개수",
            data: ratingDistribution,
            backgroundColor: "rgba(75, 192, 192, 0.7)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true, ticks: { stepSize: 1 } },
        },
      },
    });
  
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy(); // 정리
        chartInstance.current = null;
      }
    };
  }, [activeTab, JSON.stringify(ratingDistribution)]);
  

  return <canvas ref={chartRef} />;
};

export default ReviewChart;
