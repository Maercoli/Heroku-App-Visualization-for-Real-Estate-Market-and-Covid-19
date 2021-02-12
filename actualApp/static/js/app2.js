var url_barLine = `/api/v2/bar_line`

//Initial test to ensure that we can run the data:

function retreiveData(sample) {
    d3.json(url_barLine).then(data=> {
        console.log(data)
    });
};
retreiveData();

// Initializes the page with a default plot
function init() {

    d3.json(url_barLine).then(data=> {

        // get Ontario data
        var dates_2019 = data[0].map(d => d.Date);
        var units_2019 = data[0].map(d => d.Units);
        // console.log(dates_2019);
        // console.log(units_2019);

        // Add initial dataset for #plot ON
        set1 = [{
        x: dates_2019,
        y: units_2019 }];

        var layout = {
            title:'Ontario: Houses Sold by Month',
            xaxis: {
              title: 'Month/Year'
            },
            yaxis: {
              title: '# of Units Sold'
            }
          };
    
        var CHART = d3.selectAll("#plot").node();
    
        Plotly.newPlot(CHART, set1, layout);

        // get BC data
        var bc_dates_2019 = data[3].slice(0,11).map(d => d.Date)
        var bc_units_2019 = data[3].slice(11,22).map(d => d.Units)

        // Add initial dataset for #plot ON
        setBc = [{
            x: bc_dates_2019,
            y: bc_units_2019 }];
    
            var layout1 = {
                title:'British Columbia: Houses Sold by Month',
                xaxis: {
                  title: 'Month/Year'
                },
                yaxis: {
                  title: '# of Units Sold'
                }
              };
        
            var CHART1 = d3.selectAll("#plot1").node();
        
            Plotly.newPlot(CHART1, set1, layout1);
            
    });
}

// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("body").on("change", updatePlotly);

// This function is called when a dropdown menu item is selected
function updatePlotly() {

    d3.json(url_barLine).then(data=> {

        var dates_2019 = data[0].map(d => d.Date);
        var units_2019 = data[0].map(d => d.Units);
        var dates_2020 = data[1].map(d => d.Date);
        var units_2020 = data[1].map(d => d.Units);
    
        // console.log(dates_2019);
        // console.log(units_2019);
        // console.log(dates_2020);
        // console.log(units_2020);

        // Use D3 to select the dropdown menu
        var dropdownMenu = d3.select("#selYear");
        // Assign the value of the dropdown menu option to a variable
        var dataset = dropdownMenu.node().value;

        var CHART = d3.selectAll("#plot").node()

         // Initialize x and y arrays
        var x = [];
        var y = [];

        switch(dataset) {
        case "database2":
            x = dates_2019;
            y = units_2019;
            break;

        case "database1":
            x = dates_2020;
            y = units_2020;
            break;

        default:
            x = dates_2019;
            y = units_2019;
            break;
        }
    
    // Note the extra brackets around 'x' and 'y'
    Plotly.restyle(CHART, "x", [x]);
    Plotly.restyle(CHART, "y", [y]);

  });
  
}

init()




var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

// var myChart = new Chart(ctx, {
//     type: 'bar',
//     data: data,
//     options: options
// });

// console.log(myChart)
// var mixedChart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//         datasets: [{
//             label: 'Bar Dataset',
//             data: [10, 20, 30, 40]
//         }, {
//             label: 'Line Dataset',
//             data: [50, 50, 50, 50],

//             // Changes this dataset to become a line
//             type: 'line'
//         }],
//         labels: ['January', 'February', 'March', 'April']
//     },
//     options: options
// });