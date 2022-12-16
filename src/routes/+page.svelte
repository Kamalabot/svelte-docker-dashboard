<script>
    import ScatterChart from "$lib/ScatterChart.svelte";
    import Histogram from "$lib/Histogram.svelte";
	import HistoScatter from "$lib/HistoScatter.svelte";
    export let data;
    //console.log(data.chartData[0].data)
	//console.log(data.chartData[1].data)
</script>

<h1 data-theme="cmyk" class="text-5x1 font-bold text-center">Welcome to the Repo</h1>

<div class="max-w">
    <h3 class="text-3x1 font-bold">The Challenge</h3>
    <p class="py-6">
        Ideas of abstracting complete chart is not new. There is <a href="https://vega.github.io/">Vega</a> and <a href="https://github.com/observablehq/plot">Plot</a>  written by D3 
        creators. Then there is veritable <a href="https://plotly.com/javascript/">Plotly.js</a> and <a href="http://www.gnuplot.info/">Gnu Plot</a>. There is Tableau and PowerBi softwares which transforms the Data to visualisation as seemless as possible.  
        </p>
</div>
<div class="flex w-full">
	<div class="grid flex-grow card bg-accent rounded-box place-items-center">
	<h3 class="text-2xl font-bold">ScatterPlot Chart</h3>
	<ScatterChart width={400} height={300} chartData={data.chartData[0].data} xVar={data.xVar} yVar={data.yVar} color={data.color} label={data.title} class="max-w-sm rounded-lg shadow-2xl"/>
	</div>
    <div class="divider divider-horizontal"></div>
	<div class="grid flex-grow card bg-base-300 rounded-box place-items-center">
	<h3 class="text-2xl font-bold">Histogram Chart</h3>
	<Histogram width={400} height={300} chartData={data.chartData[0].data} Var={data.yVar} Bins={10} color={data.color} label={'Histogram of Cases'} class="max-w-sm rounded-lg shadow-2xl"/>
	</div>
</div>
<div class="max-w">
    <h3 class="text-3x1 font-bold">Abstraction : A Choice</h3>
    <p class="py-6">
        The ease comes with abstraction of the chart creation process, that has been implemented on top some other language or library for example D3. If you want to have control then of the chart, there is very high learning curve, and learn D3. With Svelte there is an opportunity to reverse this dynamics. If you know D3 then there is no need to learn any other library. You can implement the chart in the style you want, and then create Svelte Components that are reusable. Like the component shown below. 
    </p>
    <pre> &lt;LineChart height width chartData /&gt;</pre>
	<div class="grid flex-grow card bg-base-300 rounded-box place-items-center">
		<h3 class="text-2xl font-bold">Viz1 Histogram & Scatterplot</h3>	
		<HistoScatter width={700} height={500} chartData={data.chartData[0].data} Var={data.yVar} refVar={data.xVar} Bins={10} histoColor={data.color} scatterColor={'blue'} class="max-w-sm rounded-lg shadow-2xl"/>
	</div>
    <p class="py-6">
        What is Scatterplot? It is plot showing change of one variable with respect to a reference. So it must have  Xvariable, YVariable. The styles and attributes play a vital role in controlling the visualisation. Grammar of Graphics implemented in Vega is a wonderful example. 
        
        When multiple types of visualisation is required on the same canvas to show a particular phenomenon, like shown above the libraries require us to understand the data. And the how the library abstracts 
        the data into visualisation.
		
		Here is the above multi-visual chart for a different data.
    </p>
	<div class="grid flex-grow card bg-base-300 rounded-box place-items-center">
		<h3 class="text-2xl font-bold">Viz2 Histogram & Scatterplot</h3>	
		<HistoScatter width={700} height={500} chartData={data.chartData[1].data} Var={data.yVar} refVar={data.xVar} Bins={10} histoColor={data.color} scatterColor={'orange'} class="max-w-sm rounded-lg shadow-2xl"/>
	</div>
    <h3 class="text-2xl font-bold">Inspiration</h3>
    <p class="py-6">I am deeply inspired by the Ian Holtz and his <a href="https://d3-graph-gallery.com/">D3 Graph Gallery.</a> repo which contains more than 300 charts. I depend a lot on <a href="https://www.d3indepth.com/">D3 In Depth reference</a> Mike and Rich the creators of D3 and Svelte have been a great source of knowledge and made the life of developers a little more easier.</p>
</div>
