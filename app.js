function plotcreator() { 

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
        }
        };

    // create the bar plot
    Plotly.newPlot("bar", data, layout);




    })

}

plotcreator()