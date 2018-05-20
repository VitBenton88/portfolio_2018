$(document).ready( () => {

    // chart JS START --------------
    const htmlData = 70;
    const cssData = 70;
    const bootsrapData = 45;
    const jsData = 50;
    const reactData = 50;
    const jqueryData = 50;
    const respDes = 55;
    const ajaxData = 50;
    const firebaseData = 30;
    const mySQLdata = 35;
    const nodeData = 40;
    const expressData = 40;
    const handlebarsData = 35;
    const MongoDBData = 30;
    const phpData = 30;

    const frontEndData = [htmlData, cssData, bootsrapData, jsData, jqueryData, reactData, respDes, phpData];
    const backEndData = [ajaxData, nodeData, expressData, handlebarsData, firebaseData, mySQLdata, MongoDBData];

    let barChartOrientation = 'bar';
    const frontendLabels = ["HTML5", "CSS3", "Bootstrap", "Javascript", "jQuery", "React.JS", ["Responsive", "Design"], "PHP"];
    const backendLabels = ["AJAX", "Node.js", "Express.js", "Handlebars.js", "Google Firebase", "mySQL", "MongoDB"];
    const ctxFrontend = $("#canvas-frontend");
    const ctxBackend = $("#canvas-backend");
    const chartOptions = {
        tooltips: {
            enabled: false
        },
        hover: {
            mode: null
        },
        legend: {
            display: false
        },
        scales: {
            yAxes: [{
                display: false,
                ticks: {
                    beginAtZero: true,
                    fontSize: 14
                },
            }],
            xAxes: [{
                display: true,
                ticks: {
                    beginAtZero: true,
                    fontSize: 16
                },
            }],
        }
    };

    if (window.matchMedia('(max-width: 1199px)').matches) { //mobile chart
        frontendLabels[6] = 'Responsive Design';
        barChartOrientation = 'horizontalBar';
        chartOptions.scales.yAxes[0].display = true;
        chartOptions.scales.xAxes[0].display = false;
    };

    const returnColorData = (String, Num) => {
        const data = [];
        for (let i = 0; i < Num; i++) {
            data.push(String);
        }
        return data;
    }

    const myFrontendChart = () => {
        new Chart(ctxFrontend, {
            type: barChartOrientation,
            data: {
                labels: frontendLabels,
                datasets: [{
                    data: frontEndData,
                    backgroundColor: returnColorData('rgba(220, 229, 241, 0.4)', frontEndData.length),
                    borderColor: returnColorData('rgba(36, 27, 78, 1)', frontEndData.length),
                    borderWidth: 2
                }]
            },
            options: chartOptions
        });
    };

    const myBackendChart = () => {
        new Chart(ctxBackend, {
            type: barChartOrientation,
            data: {
                labels: backendLabels,
                datasets: [{
                    data: backEndData,
                    backgroundColor: returnColorData('rgba(220, 229, 241, 0.4)', backEndData.length),
                    borderColor: returnColorData('rgba(0,0,0,1)', backEndData.length),
                    borderWidth: 2
                }]
            },
            options: chartOptions
        });
    };

    //load charts
    myBackendChart();
    myFrontendChart();

    $(window).on('resize', function(){
          let win = $(this);
          if (win.width() <= 1199) {
              frontendLabels[6] = 'Responsive Design';
              barChartOrientation = 'horizontalBar';
              chartOptions.scales.yAxes[0].display = true;
              chartOptions.scales.xAxes[0].display = false;
              //reload charts
              myBackendChart();
              myFrontendChart();
          } else {
              frontendLabels[6] = ["Responsive", "Design"];
              barChartOrientation = 'bar';
              chartOptions.scales.yAxes[0].display = false;
              chartOptions.scales.xAxes[0].display = true;
              //reload charts
              myBackendChart();
              myFrontendChart();
          }
    });
    //----------------------------------------------------------------END OF .load SCRIPT
});
