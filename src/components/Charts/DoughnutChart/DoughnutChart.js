import React from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

// const DoughnutChart = () => {
//   // const option = {
//   //   // title: {
//   //   //   text: 'Doughnut Chart with Rounded Corners',
//   //   //   subtext: 'Example with React ECharts',
//   //   //   left: 'center',
//   //   // },
//   //   tooltip: {
//   //     trigger: "item",
//   //     formatter: "{a} <br/>{b}: {c} ({d}%)",
//   //   },
//   //   series: [
//   //     {
//   //       name: "Doughnut Chart",
//   //       type: "pie",
//   //       radius: ["40%", "70%"], // Set inner and outer radius to create a doughnut shape
//   //       avoidLabelOverlap: false,
//   //       itemStyle: {
//   //         borderRadius: 10, // Rounded corners for the slices
//   //       },
//   //       label: {
//   //         show: false,
//   //       },
//   //       emphasis: {
//   //         label: {
//   //           show: true,
//   //           fontSize: "30",
//   //           fontWeight: "bold",
//   //         },
//   //       },
//   //       data: [
//   //         { value: 335, name: "A" },
//   //         { value: 310, name: "B" },
//   //         { value: 234, name: "C" },
//   //         { value: 135, name: "D" },
//   //         { value: 1548, name: "E" },
//   //       ],
//   //     },
//   //   ],
//   // };

//   const option = {
//     tooltip: {
//       trigger: "item",
//     },
//     legend: {
//       top: "5%",
//       left: "center",
//     },
//     series: [
//       {
//         name: "Access From",
//         type: "pie",
//         radius: ["40%", "70%"],
//         avoidLabelOverlap: false,
//         itemStyle: {
//           borderRadius: 10,
//         },
//         label: {
//           show: false,
//           position: "center",
//         },
//         emphasis: {
//           label: {
//             show: true,
//             fontSize: 40,
//             fontWeight: "bold",
//           },
//         },
//         labelLine: {
//           show: false,
//         },
//         data: [
//           { value: 1048, name: "Search Engine" },
//           { value: 735, name: "Direct" },
//           { value: 580, name: "Email" },
//           { value: 484, name: "Union Ads" },
//           { value: 300, name: "Video Ads" },
//         ],
//       },
//     ],
//   };

//   return (
//     <div style={{ width: "100px", height: "100px" }}>
//       <ReactECharts
//         option={option}
//         echarts={echarts}
//         style={{ display: "flex" }}
//       />
//     </div>
//   );
// };

// export default DoughnutChart;

const DoughnutChart = () => {
  const option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical", 
      top: "center", 
      left: "start", 
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 10,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 10,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: "Search Engine" },
          { value: 735, name: "Direct" },
          { value: 580, name: "Email" },
          { value: 484, name: "Union Ads" },
          { value: 300, name: "Video Ads" },
        ],
        left: "20%",
      },
      
    ],
  };

  return (
    <div className="flex items-center w-full h-full">
      <div className="w-full flex justify-center">
        <ReactECharts
          option={option}
          echarts={echarts}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
};

export default DoughnutChart;
