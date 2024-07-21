import { Line } from "react-chartjs-2";
import { useLanguage } from "../../LanguageContext"; 
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);
function MyChart(props) {
  // eslint-disable-next-line
  const { getText } = useLanguage(); 
  console.log(props);
  const trueLabel = getText("True", "صح");
  const falseLabel = getText("False", "غلط");

  const labels = [
  getText("Jan", "يناير"),
  getText("Feb", "فبراير"),
  getText("Mar", "مارس"),
  getText("Apr", "أبريل"),
  getText("May", "مايو"),
  getText("Jun", "يونيو"),
  getText("Jul", "يوليو"),
  getText("Aug", "أغسطس"),
  getText("Sep", "سبتمبر"),
  getText("Oct", "أكتوبر"),
  getText("Nov", "نوفمبر"),
  getText("Dec", "ديسمبر"),
  ];
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: getText("Seeds Check Overview", "نظرة عامة على فحص البذور"),
      },
    },
  };
  const currentYear = new Date().getFullYear();


  const data = {
    labels,
    datasets: [
      {
        label: trueLabel, // Use translated "True" label
        data: labels.map((v, i) => {
          return props.props[1][currentYear + "-" + (i + 1)] !== undefined
            ? props.props[1][currentYear + "-" + (i + 1)].length
            : 0;
        }),
        borderColor: "rgb(0, 255, 0)",
        backgroundColor: "rgba(0, 180, 0, 0.5)",
        cubicInterpolationMode: "monotone",
        fill: true,
      },
      {
        label: falseLabel, // Use translated "False" label
        data: labels.map((v, i) => {
          return props.props[0][currentYear + "-" + (i + 1)] !== undefined
            ? props.props[0][currentYear + "-" + (i + 1)].length
            : 0;}),
        borderColor: "rgb(255, 0, 0)",
        backgroundColor: "rgba(150, 0, 0,0.5)",
        cubicInterpolationMode: "monotone",
        fill: true,
      },
    ],
  };

  return <Line options={options} data={data} />;
}

export default MyChart;
