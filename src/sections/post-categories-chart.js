import PropTypes from 'prop-types';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { Chart } from 'src/components/chart';

// Function to define options for the chart
const useChartOptions = (labels) => {
  const theme = useTheme();

  // Return chart configuration options
  return {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false
      }
    },

    // Define colors for the chart, data labels and fill
    colors: [theme.palette.primary.main, alpha(theme.palette.primary.main, 0.25)],
    dataLabels: {
      enabled: false
    },
    fill: {
      opacity: 1,
      type: 'solid'
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 2,
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    legend: {
      show: false
    },
    // Define bar width
    plotOptions: {
      bar: {
        columnWidth: '40px'
      }
    },
    stroke: {
      colors: ['transparent'], 
      show: true,
      width: 2
    },
    theme: {
      mode: theme.palette.mode
    },
    // Configure x-axis and y-axis settings
    xaxis: {
      axisBorder: {
        color: theme.palette.divider,
        show: true
      },
      axisTicks: {
        color: theme.palette.divider,
        show: true
      },
      categories: labels,
      labels: {
        offsetY: 5,
        style: {
          colors: theme.palette.text.secondary
        }
      }
    },
    yaxis: {
      labels: {
        offsetX: -10,
        style: {
          colors: theme.palette.text.secondary
        }
      }
    }
  };
};
// Functional component to display the CategoriesChart
export const CategoriesChart = (props) => {
  const { chartSeries, sx, title, labels } = props; // Destructure props
  const chartOptions = useChartOptions(labels); // Get chart options using provided labels

  return (
    <Card sx={sx}>
      <CardHeader
        title={title}
      />
      <CardContent>
        <Chart
          height={350}
          options={chartOptions}
          series={chartSeries}
          type="bar"
          width="100%"
        />
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
      </CardActions>
    </Card>
  );
};

// PropTypes for type-checking props passed to CategoriesChart component
CategoriesChart.protoTypes = {
  chartSeries: PropTypes.array.isRequired, // Array of chart series data
  sx: PropTypes.object
};
