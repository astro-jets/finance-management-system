
function getLineChart() {
  let http = new XMLHttpRequest()
    http.open('get','/reports/dashboard.json',true)
    http.send()
    http.onload = function(){
        if(this.readyState == 4 && this.status ==200)
        {
          let myData = JSON.parse(this.responseText)
            console.log(myData)
            plotLineGraph(myData)
          }
      }
}

// Area Chart
function plotLineGraph(data){
    function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
    }
    var ctx = document.getElementById("myAreaChart");
    var myLineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        // Assets
        {
          label: "Assets Bought (MK) ",
          lineTension: 0.3,
          backgroundColor: "red",
          borderColor: "orangered",
          pointRadius: 3,
          pointBackgroundColor: "yellow",
          pointBorderColor: "orangered",
          pointHoverRadius: 3,
          pointHoverBackgroundColor: "orangered",
          pointHoverBorderColor: "orangered",
          pointHitRadius: 10,
          pointBorderWidth: 2,
          data: data.assets,
        },
        // Assets
        {
          label: "Fees",
          lineTension: 0.3,
          backgroundColor: "rgba(78, 115, 223, 0.05)",
          borderColor: "rgba(78, 115, 223, 1)",
          pointRadius: 3,
          pointBackgroundColor: "rgba(78, 115, 223, 0.05)",
          pointBorderColor: "rgba(78, 115, 223, 1)",
          pointHoverRadius: 3,
          pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
          pointHoverBorderColor: "rgba(78, 115, 223, 1)",
          pointHitRadius: 10,
          pointBorderWidth: 2,
          data: data.fees,
        },
        // Registrations
        {
          label: "Salaries",
          lineTension: 0.3,
          backgroundColor: "green",
          borderColor: "greenyellow",
          pointRadius: 3,
          pointBackgroundColor: "greenyellow",
          pointBorderColor: "green",
          pointHoverRadius: 3,
          pointHoverBackgroundColor: "greenyellow",
          pointHoverBorderColor: "greenyellow",
          pointHitRadius: 10,
          pointBorderWidth: 2,
          data: data.salary,
        }

    ],
    },
    options: {
      maintainAspectRatio: false,
      layout: {
        padding: {
          left: 10,
          right: 25,
          top: 25,
          bottom: 0
        }
      },
      scales: {
        xAxes: [{
          time: {
            unit: 'date'
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          ticks: {
            maxTicksLimit: 7
          }
        }],
        yAxes: [{
          ticks: {
            maxTicksLimit: 5,
            padding: 10,
            // Include a dollar sign in the ticks
            callback: function(value, index, values) {
              return '$' + number_format(value);
            }
          },
          gridLines: {
            color: "rgb(234, 236, 244)",
            zeroLineColor: "rgb(234, 236, 244)",
            drawBorder: false,
            borderDash: [2],
            zeroLineBorderDash: [2]
          }
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        titleMarginBottom: 10,
        titleFontColor: '#6e707e',
        titleFontSize: 14,
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        intersect: false,
        mode: 'index',
        caretPadding: 10,
        callbacks: {
          label: function(tooltipItem, chart) {
            var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
            return datasetLabel + ': $' + number_format(tooltipItem.yLabel);
          }
        }
      }
    }
    });
}
// Area Chart

// Bar Chart
function plotBarChart(data)
{
    // Set new default font family and font color to mimic Bootstrap's default styling  
    function number_format(number, decimals, dec_point, thousands_sep) {
    // *     example: number_format(1234.56, 2, ',', ' ');
    // *     return: '1 234,56'
    number = (number + '').replace(',', '').replace(' ', '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function(n, prec) {
        var k = Math.pow(10, prec);
        return '' + Math.round(n * k) / k;
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
    }
    // Bar Chart Example
    var ctx = document.getElementById("myBarChart");
    var myBarChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Loans", "Funeral", "Life", "Savings"],
        datasets: [
        {
            label: "Subscriptions",
            backgroundColor: ['rgba(25, 214, 19,.8)','rgba(255, 153, 0,.8)', 'rgba(224, 20, 5,.8)','rgba(0, 0, 255, 0.8)'],
            hoverBackgroundColor: ['rgb(25, 214, 19)','rgb(255, 153, 0)', 'rgb(224, 20, 5)','blue'],
            borderColor: ['rgb(25, 214, 19)','rgb(255, 153, 0)', 'rgb(224, 20, 5)','blue'],
            borderWidth: 2,
            fill:false,
            data: [
            data.loans,
            data.funeral,
            data.life,
            data.savings
        ],
        }
        ],
    },
    options: {
        maintainAspectRatio: false,
        layout: {
        padding: {
            left: 10,
            right: 25,
            top: 25,
            bottom: 0
        }
        },
        scales: {
        xAxes: [{
            time: {
            unit: 'month'
            },
            gridLines: {
            display: false,
            drawBorder: false
            },
            ticks: {
            maxTicksLimit: 6
            },
            maxBarThickness: 25,
        }],
        yAxes: [{
            ticks: {
            min: 0,
            max: 15000,
            maxTicksLimit: 5,
            padding: 10,
            // Include a dollar sign in the ticks
            callback: function(value, index, values) {
                return '$' + number_format(value);
            }
            },
            gridLines: {
            color: "rgb(234, 236, 244)",
            zeroLineColor: "rgb(234, 236, 244)",
            drawBorder: false,
            borderDash: [2],
            zeroLineBorderDash: [2]
            }
        }],
        },
        legend: {
        display: false
        },
        tooltips: {
        titleMarginBottom: 10,
        titleFontColor: '#6e707e',
        titleFontSize: 14,
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        caretPadding: 10,
        callbacks: {
            label: function(tooltipItem, chart) {
            var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
            return datasetLabel + ': $' + number_format(tooltipItem.yLabel);
            }
        }
        },
    }
    });

}
// Bar Chart


// Pie Chart for displaying TAX
function plotPieChart(data){
    // Pie Chart Example
    var ctx = document.getElementById("myPieChart");
    var myPieChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ["Customs", "PAYEE", "VAT", "Levy"],
        datasets: [{
        data: [
            data.loans,
            data.funeral,
            data.life,
            data.savings
        ],
        backgroundColor: ['rgba(25, 214, 19,.8)','rgba(255, 153, 0,.8)', 'rgba(224, 20, 5,.8)','rgba(0, 0, 255, 0.8)'],
        hoverBackgroundColor: ['rgb(25, 214, 19)','rgb(255, 153, 0)', 'rgb(224, 20, 5)','blue'],
        borderColor: ['rgb(25, 214, 19)','rgb(255, 153, 0)', 'rgb(224, 20, 5)','blue'],
        hoverBorderColor: ['rgb(25, 214, 19)','rgb(255, 153, 0)', 'rgb(224, 20, 5)','blue']
        }],
    },
    options: {
        maintainAspectRatio: false,
        tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: true,
        caretPadding: 10,
        },
        legend: {
        display: false
        },
        cutoutPercentage: 80,
    },
    });

}
// Pie 



// Pie Chart
function plotDonutChart(data){
    // Pie Chart Example
    var ctx = document.getElementById("myDonutChart");
    var myPieChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ["Loans", "Funeral", "Life", "Savings"],
        datasets: [{
        data: [
            data.loans,
            data.funeral,
            data.life,
            data.savings
        ],
        backgroundColor: ['rgba(25, 214, 19,.8)','rgba(255, 153, 0,.8)', 'rgba(224, 20, 5,.8)','rgba(0, 0, 255, 0.8)'],
        hoverBackgroundColor: ['rgb(25, 214, 19)','rgb(255, 153, 0)', 'rgb(224, 20, 5)','blue'],
        borderColor: ['rgb(25, 214, 19)','rgb(255, 153, 0)', 'rgb(224, 20, 5)','blue'],
        hoverBorderColor: ['rgb(25, 214, 19)','rgb(255, 153, 0)', 'rgb(224, 20, 5)','blue']
        }],
    },
    options: {
        maintainAspectRatio: false,
        tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: true,
        caretPadding: 10,
        },
        legend: {
        display: false
        },
        cutoutPercentage: 80,
    },
    });

}
// Pie Chart


getLineChart()