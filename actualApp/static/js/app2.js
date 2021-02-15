var url_barLine = `/api/v2/bar_line`

//Initial test to ensure that we can run the data:

// function retreiveData(sample) {
//     d3.json(url_barLine).then(data=> {
//         console.log(data)     //arrays= [0]BC 2019, [1]BC 2020, [2]empty, [3] BC 2019,2020 
//     });
// };
// retreiveData();

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
        var CHART1 = d3.selectAll("#plot1").node()

         // Initialize x and y arrays
        var x = [];
        var y = [];

        switch(dataset) {
        case "database1":
            x = dates_2019;
            y = units_2019;
            break;

        case "database2":
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

    Plotly.restyle(CHART1, "x", [x]);
    Plotly.restyle(CHART1, "y", [y]);

  });
  
}

init()




var ctx = document.getElementById('myChart').getContext('2d');

d3.json(url_barLine).then(data=> {

    var dates_2019 = data[0].map(d => d.Date);
    var units_2019 = data[0].map(d => d.Units);
    var dates_2020 = data[1].map(d => d.Date);
    var units_2020 = data[1].map(d => d.Units);

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dates_2019,  //x-axis
            datasets: [{
                label: '# Ontario',
                data: units_2019,     //y-axis
                backgroundColor: 'green',
                borderColor: 'darkgreen',
                borderWidth: 1,
                hoverBorderWidth:3,
                hoverBorderColor:'black',
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
})