function plotcreator(id) { 

    // Using the D3 library to read in samples.json.
    d3.json("data.json").then((data) => {
        console.log(data);
    
    // Defining the count of otu labels 
    var samplevalues = data.samples[0]['sample_values'];
    console.log(samplevalues)
    
    // Slicing the variable from above. 
    var slicevals = data.samples[0]['sample_values'].slice(0, 10).reverse()
    console.log(slicevals)

    // Isolating the otu ids from the json files
    var samplelabels = data.samples[0]['otu_ids'];
    console.log(samplelabels)

    // Slicing the above variable
    var slicelabels = data.samples[0]['otu_ids'].slice(0, 10).reverse()
    console.log(slicelabels)

    // Mapping it to a format that we want it 
    var OTU_id = slicelabels.map(d => "OTU " + d);

    // Defining the plotly type, data, orientation, and hover text. 
    var data = [{ 
        type: 'bar', 
        x: slicevals,
        y: OTU_id,
        orientation: 'h', 
        text: data.samples[0]['otu_labels'].slice(0, 10).reverse()
    }];

    // create layout variable to set plots layout
    var layout = {
        title: "The Top 10 OTU's",
        yaxis:{
            tickmode:"linear",
        },
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 30
        },
        height: 500,
        width: 1200
        };

    // create the bar plot
    Plotly.newPlot("bar", data, layout);

    // Create data variable for bubble chart 

    var data1 = [{ 
        x: samplelabels,
        y: samplevalues,
        mode: 'markers',
        marker: {
            size: samplevalues,
            color: samplelabels
        }
        
    }];

    // Create layout variable for bubble chart

    var layout1 = { 
        title: 'Marker Size',
        showlegend: false,
        height: 500,
        width: 1200
    };

    // create bubble plot 

    Plotly.newPlot('bubble_chart', data1, layout1);

    })

}


// grabbing the demographic data from json 
function getdata(id) { 

    d3.json("data.json").then((data) => {

    // Grabbing the metadata from the json 

    var metadata = data.metadata;

    console.log(metadata)

    // Filtering the metadata based on the specific id value from the dropdown
    // menu

    var result = metadata.filter(meta => meta.id.toString() === id)[0];

    // Grabbing the demographic class from the html code 
    var demographics = d3.select("#demographics");
    
    // Empty the demographic info panel
    demographics.html("");

    // grab the demographic data and append an h5 in the html code. 
   
     Object.entries(result).forEach((key) => {   
        demographics.append("h5").text(key[0] + ": " + key[1] + "\n");    
    
    });

    });

}

// Defining a function to be called by the dropdown menu in the html code to run 
// the above 2 functions

function runids(id) { 

    plotcreator(id)
    getdata(id)

}


function initial() {

    var dropdown = d3.select("#ids_drop");

    
    d3.json("data.json").then((data)=> {
        console.log(data)

        
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        
        plotcreator(data.names[0]);
        getdata(data.names[0]);

    });

}

initial();