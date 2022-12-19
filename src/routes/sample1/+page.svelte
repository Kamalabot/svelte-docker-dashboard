<script>
  import PackChart from "$lib/PackChart.svelte";
  import TreemapChart from "$lib/TreemapChart.svelte";
  import stackedDataGenerator from "$lib/stackDataGenerator.js";
  import HeatMapChart from "$lib/HeatMapChart.svelte";
	
  import {rollups, timeParse, extent} from "d3"
  export let data;
    //console.log(data.chartData[0].data)
  
  let fmcgCompany = data.csvData.data3
  let companyFilteredByIncome = fmcgCompany	
	  .filter(d => d.Quarter == "Q4 2019")
	  .map(d => ({
		Company_Name: d['Company Name'],
		Total_Income: Number(d['Total Income']),
		Industry:d['Industry'],
		Net_Profit:Number(d['Net Profit  Loss  from Ordinary Activities after Tax'])
	  }))
  let companyByIncome = data.csvData.data4[0]
  console.log(companyByIncome)
  let companies = data.csvData.data4[1]
  let qtrs = data.csvData.data4[2]
  
</script>

<h1 class="text-5xl font-bold text-center">Gallery 2</h1>

<div class="max-w">
    <h3 class="text-3xl font-bold">Complex Charts</h3>
    <p class="py-6">Data that you want to analyse can be a time series of a sensor, product telemetry data or your own organisations 
	CRM data. Much of the pattern in the data can be visualised using <a href="/sample">Basic Charts</a> Some patterns could not be extracted
	because,</p>
	<ul>
		<li>1) Visualisation requires more than 3 dimensions</li>
		<li>2) Variables in question are derived from multiple inputs / features</li>
		<li>3) Variables change with Time and Space</li>
	</ul>
	<p  class="py-6">Gallery will exhibit Svelte components that involve Non-Standard charts that can be built using D3</p>
</div>

<div class="flex w-full">
  <div class="grid flex-grow card bg-base-300 rounded-box place-items-center">
    <PackChart width={500} height={500} chartData={companyFilteredByIncome} refVar={"Total_Income"} xVar={"Company_Name"} yVar={"Industry"} label={"Company Income"}  class="max-w-sm rounded-lg shadow-2xl"/>	
	 <h1 class="text-2xl font-bold">Pack Chart of BSE Listed Companies</h1>
  </div>
</div>
<div class="divider divider-vertical">--</div>
<div class="flex w-full">
  <div class="grid flex-grow card bg-base-300 rounded-box place-items-center">
    <TreemapChart width={700} height={500} chartData={companyFilteredByIncome} refVar={"Total_Income"} xVar={"Company_Name"} yVar={"Industry"} label={"Company Income"}  class="max-w-sm rounded-lg shadow-2xl"/>	
	 <h1 class="text-2xl font-bold">TreeMap of BSE Listed Companies</h1>
  </div>
</div>
<div class="divider divider-vertical">--</div>
<div class="flex w-full">
  <div class="grid flex-grow card bg-base-300 rounded-box place-items-center">
	  <HeatMapChart width={1000} chartData={companyByIncome} xArray={qtrs} yArray={companies} variable={"TotalIncome"} xVar={"qtr"} yVar={"Company_Name"} label={"Income Heat Map"}  class="max-w-sm rounded-lg shadow-2xl"/>
	 <h1 class="text-2xl font-bold">HeatMap Chart of NYC Collisions</h1>
  </div>
</div>