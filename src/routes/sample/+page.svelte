<script>
  import ScatterChart from "$lib/ScatterChart.svelte";
  import Histogram from "$lib/Histogram.svelte";
  import HistoScatter from "$lib/HistoScatter.svelte";
  import BarPlot from "$lib/BarPlot.svelte";	
  import LineChart from "$lib/LineChart.svelte";
  import PieChart from "$lib/PieChart.svelte";
  import {rollups} from "d3"
  import pypidata from "$lib/top-pypi-packages-30-days.json"
  //import bseData from "$lib/bseScripts.json"
  export let data;
  //console.log(data.covidData)
  //console.log(data.athleteData)
  //console.log(data.irisData)
  //console.log(pypidata)
  let pyData = pypidata.rows
  let filterPyData = pyData.filter(d => d['download_count'] < 200000)
  var irisData = data.irisData  
  var athleteData = data.athleteData.slice(0,20)
  var athleteCount = rollups(data.athleteData, g => g.length, d => d.sport)
													
</script>

<h1 class="text-5xl font-bold text-center">Gallery One</h1>

<div class="max-w">
    <h3 class="text-3xl font-bold">Basic Charts</h3>
    <p class="py-6">Scatter plots to Pie charts have become a mainstay in our reports, dashboards and Infographics. Gallery consists of 
	charts that help in Univariate and Bivariate Analysis of the data that is available with us. With D3 these charts can be extended to 
	tri-variate analysis by assigning the size, color and position.</p>
	<p class="py-6">The charts are made with Svelte Components inside which the data and the chart functions are coded. None of that info
	 will be available to the user. Why? Because SvelteKit compiles the source code and sends it to the user.
</div>

<div class="flex w-full">
  <div class="grid flex-grow card bg-base-300 rounded-box place-items-center">
    <ScatterChart width={400} height={300} chartData={data.covidData[0].data} xVar={data.xVar} yVar={data.yVar} color={data.color} label={data.title}  class="max-w-sm rounded-lg shadow-2xl"/>	
	 <h1 class="text-2xl font-bold">ScatterPlot US Covid Data</h1>
  </div>
  <div class="divider divider-horizontal">|</div>
  <div class="grid flex-grow card bg-base-300 rounded-box place-items-center">
    <ScatterChart width={400} height={300} chartData={irisData} xVar={"Sepal_Length"} yVar={"Petal_Length"} color={"blue"} label={"Iris Data"}  class="max-w-sm rounded-lg shadow-2xl"/>	
	 <h1 class="text-2xl font-bold">ScatterPlot of the infamous Iris Data</h1>
  </div>
</div>
<div class="divider divider-vertical">|</div>
<div class="flex w-full">
  <div class="grid flex-grow card bg-base-300 rounded-box place-items-center">
	<Histogram width={400} height={300} chartData={filterPyData} Var={'download_count'} Bins={10} color={data.color} label={'Histogram of Download Counts'}  class="max-w-sm rounded-lg shadow-2xl"/>	
	<h1 class="text-2xl font-bold">Pypi Library downloads</h1>
  </div>
  <div class="divider divider-horizontal">|</div>
  <div class="grid flex-grow card bg-base-300 rounded-box place-items-center">
    <Histogram width={400} height={300} chartData={irisData} Var={'Sepal_Length'} Bins={10} color={data.color} label={'Histogram of Sepal Length'}  class="max-w-sm rounded-lg shadow-2xl"/>	
    <h1 class="text-2xl font-bold">Histogram of Iris Dataset</h1>
  </div>
</div>
<div class="divider divider-vertical">|</div>
<div class="flex w-full">
  <div class="grid flex-grow card bg-base-300 rounded-box place-items-center">
	<BarPlot width={400} height={300} chartData={athleteData} xVar={"name"} yVar={"weight"} color={"blue"} label={""} class="max-w-sm rounded-lg shadow-2xl"/>	
	<h1 class="text-2xl font-bold">Athlete Data Bar Chart</h1>
  </div>
  <div class="divider divider-horizontal">|</div>
  <div class="grid flex-grow card bg-base-300 rounded-box place-items-center">
    <LineChart width={400} height={300} chartData={athleteData} xVar={"name"} yVar={"weight"} color={"blue"} label={""} class="max-w-sm rounded-lg shadow-2xl"/>
    <h1 class="text-2xl font-bold">Athlete Weight Line</h1>
  </div>
</div>
<div class="divider divider-vertical">|</div>
<div class="flex w-full">
  <div class="grid flex-grow card bg-base-300 rounded-box place-items-center">
	<BarPlot width={400} height={300} chartData={athleteCount} xVar={0} yVar={1} color={"blue"} label={"Athlete Counts"} class="max-w-sm rounded-lg shadow-2xl"/>	
	<h1 class="text-2xl font-bold">Athlete Counts Bar Chart</h1>
  </div>
  <div class="divider divider-horizontal">|</div>
  <div class="grid flex-grow card bg-base-300 rounded-box place-items-center">
    <PieChart width={400} height={300} chartData={athleteCount} xVar={0} yVar={1} label={"Athlete Count"} class="max-w-sm rounded-lg shadow-2xl"/>
    <h1 class="text-2xl font-bold">Athlete Count Pie Chart</h1>
  </div>
</div>
