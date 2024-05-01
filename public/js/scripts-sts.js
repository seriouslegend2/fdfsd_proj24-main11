// Function to fetch week data from the backend
async function fetchWeekDataFromBackend() {
  try {
    const response = await fetch('/api/user/weekdata');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching week data:', error);
    throw error;
  }
}

async function fetchMonthDataFromBackend() {
  try {
    const response = await fetch('/api/user/monthdata');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const monthdata = await response.json();

    // Count the number of objects in each month
    const monthCounts = Object.values(monthdata).map(month => month.length);

    return monthCounts;
  } catch (error) {
    console.error('Error fetching month data:', error);
    throw error;
  }
}

async function fetchContestMonthDataFromBackend() {
  try {
    const response = await fetch('/api/user/contestmonthdata');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const contestmonthdata = await response.json();

    // Count the number of objects in each month
    const monthCounts = Object.values(contestmonthdata).map(month => month.length);

    return monthCounts;
  } catch (error) {
    console.error('Error fetching month data:', error);
    throw error;
  }
}
// Call the function to fetch weekdata
fetchWeekDataFromBackend()
  .then(weekdata => {
    console.log("Week Data:", weekdata);

    // Extracting problem count for each day of the week
    const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const problemCounts = daysOfWeek.map(day => weekdata[day].length);

    // Chart configuration for the bar chart
    const barChartOptions = {
      series: [{
        data: problemCounts,
        name: 'Problems Solved'
      }],
      chart: {
        type: 'bar',
        background: 'transparent',
        height: 350,
        toolbar: {
          show: false,
        },
      },
      colors: ['#2962ff', '#d50000', '#2e7d32', '#ff6d00', '#583cb3'],
      plotOptions: {
        bar: {
          distributed: true,
          borderRadius: 4,
          horizontal: false,
          columnWidth: '40%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        opacity: 1,
      },
      grid: {
        borderColor: '#55596e',
        yaxis: {
          lines: {
            show: true,
          },
        },
        xaxis: {
          lines: {
            show: true,
          },
        },
      },
      legend: {
        labels: {
          colors: '#f5f7ff',
        },
        show: true,
        position: 'top',
      },
      stroke: {
        colors: ['transparent'],
        show: true,
        width: 2,
      },
      tooltip: {
        shared: true,
        intersect: false,
        theme: 'dark',
      },
      xaxis: {
        categories: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
        title: {
          style: {
            color: '#f5f7ff',
          },
        },
        axisBorder: {
          show: true,
          color: '#55596e',
        },
        axisTicks: {
          show: true,
          color: '#55596e',
        },
        labels: {
          style: {
            colors: '#f5f7ff',
          },
        },
      },
      yaxis: {
        title: {
          text: 'Count',
          style: {
            color: '#f5f7ff',
          },
        },
        axisBorder: {
          color: '#55596e',
          show: true,
        },
        axisTicks: {
          color: '#55596e',
          show: true,
        },
        labels: {
          style: {
            colors: '#f5f7ff',
          },
        },
        max:6,
      },
    };

    // Render the bar chart
    const barChart = new ApexCharts(document.querySelector('#bar-chart'), barChartOptions);
    barChart.render();
  })
  .catch(error => {
    console.error('Error fetching week data:', error);
  });

  fetchMonthDataFromBackend()
  .then(monthCounts => {
    console.log("Month Counts:", monthCounts);

    // Chart configuration for the second bar chart
    const barChartOptions3 = {
      series: [{
        data: monthCounts, // Use the monthCounts as data values
        name: 'Participation'
      }],
      chart: {
        type: 'bar',
        background: 'transparent',
        height: 350,
        toolbar: {
          show: false,
        },
      },
      colors: ['#2962ff', '#d50000', '#2e7d32', '#ff6d00', '#583cb3'],
      plotOptions: {
        bar: {
          distributed: true,
          borderRadius: 4,
          horizontal: false,
          columnWidth: '40%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        opacity: 1,
      },
      grid: {
        borderColor: '#55596e',
        yaxis: {
          lines: {
            show: true,
          },
        },
        xaxis: {
          lines: {
            show: true,
          },
        },
      },
      legend: {
        labels: {
          colors: '#f5f7ff',
        },
        show: true,
        position: 'top',
      },
      stroke: {
        colors: ['transparent'],
        show: true,
        width: 2,
      },
      tooltip: {
        shared: true,
        intersect: false,
        theme: 'dark',
      },
      xaxis: {
        categories: ['january', 'feb', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'],
        title: {
          style: {
            color: '#f5f7ff',
          },
        },
        axisBorder: {
          show: true,
          color: '#55596e',
        },
        axisTicks: {
          show: true,
          color: '#55596e',
        },
        labels: {
          style: {
            colors: '#f5f7ff',
          },
        },
      },
      yaxis: {
        title: {
          text: 'Count',
          style: {
            color: '#f5f7ff',
          },
        },
        axisBorder: {
          color: '#55596e',
          show: true,
        },
        axisTicks: {
          color: '#55596e',
          show: true,
        },
        labels: {
          style: {
            colors: '#f5f7ff',
          },
        },
        max:36,
      },
    };

    // Render the second bar chart
    const barChart3 = new ApexCharts(document.querySelector('#bar-chart1'), barChartOptions3);
    barChart3.render();
  })
  .catch(error => {
    console.error('Error fetching month data:', error);
  });


  fetchContestMonthDataFromBackend()
  .then(monthCounts => {
    console.log("Month Counts:", monthCounts);

    // Chart configuration for the second bar chart
    const barChartOptions3 = {
      series: [{
        data: monthCounts, // Use the monthCounts as data values
        name: 'Participation'
      }],
      chart: {
        type: 'bar',
        background: 'transparent',
        height: 350,
        toolbar: {
          show: false,
        },
      },
      colors: ['#2962ff', '#d50000', '#2e7d32', '#ff6d00', '#583cb3'],
      plotOptions: {
        bar: {
          distributed: true,
          borderRadius: 4,
          horizontal: false,
          columnWidth: '40%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        opacity: 1,
      },
      grid: {
        borderColor: '#55596e',
        yaxis: {
          lines: {
            show: true,
          },
        },
        xaxis: {
          lines: {
            show: true,
          },
        },
      },
      legend: {
        labels: {
          colors: '#f5f7ff',
        },
        show: true,
        position: 'top',
      },
      stroke: {
        colors: ['transparent'],
        show: true,
        width: 2,
      },
      tooltip: {
        shared: true,
        intersect: false,
        theme: 'dark',
      },
      xaxis: {
        categories: ['january', 'feb', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'],
        title: {
          style: {
            color: '#f5f7ff',
          },
        },
        axisBorder: {
          show: true,
          color: '#55596e',
        },
        axisTicks: {
          show: true,
          color: '#55596e',
        },
        labels: {
          style: {
            colors: '#f5f7ff',
          },
        },
      },
      yaxis: {
        title: {
          text: 'Count',
          style: {
            color: '#f5f7ff',
          },
        },
        axisBorder: {
          color: '#55596e',
          show: true,
        },
        axisTicks: {
          color: '#55596e',
          show: true,
        },
        labels: {
          style: {
            colors: '#f5f7ff',
          },
        },
        max:8,
      },
    };

    // Render the second bar chart
    const barChart3 = new ApexCharts(document.querySelector('#bar-chart2'), barChartOptions3);
    barChart3.render();
  })
  .catch(error => {
    console.error('Error fetching month data:', error);
  });