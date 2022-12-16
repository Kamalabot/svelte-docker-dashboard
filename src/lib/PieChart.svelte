<script>
// @ts-nocheck'
    import parsers from "$lib/parsers"    
	export let height;
    export let width;
	import * as d3 from 'd3'
	import { onMount } from 'svelte';
	export let label;
	export let xVar;
	export let yVar;	
    export let chartData; //get the historic data from page.js
	let div;

	piePlot(width, height, chartData,xVar,yVar,label)


	function piePlot(width, height, chartData, xVar, yVar, label ){
		
		const margin = { left: 30, right: 40, top: 10, bottom: 30 };
		const visHeight = height - margin.top - margin.bottom;
		const visWidth = width - margin.right - margin.left;


		const xData = chartData.map(d => d[xVar]);
		const yData = chartData.map(d => d[yVar]);
		
		//console.log(xData, yData)

		const numberFormat = d3.format(".2s");

		onMount(() => {

		const docLocation = d3.select(div)
		
		const canvas = docLocation.append('svg')
				.attr('width',width)
				.attr('height',height)
	
		const yScale = d3.scaleLinear()
		  .domain(yData).nice()
		  .range([visHeight, 0]);
		  
	  	const colorScale = d3.scaleOrdinal()
			.domain(xData)
			.range(d3.schemeCategory10)

	
		const chart = canvas.append('g')
			.attr('transform', `translate(${0}, ${margin.top})`);


		var pieGenerator = d3.pie()
					.value(d => d[yVar])
		
		var arcGenerator = d3.arc()
			.innerRadius(width / 5)
			.outerRadius(width / 3);
			
		var arcData = pieGenerator(chartData);
  

		console.log(arcData)
		
		chart.append('g')
			.attr('transform',`translate(${visWidth/2},${visHeight/2})`)
			.selectAll('path')
			.data(arcData)
			.join('path')
			.attr('d', arcGenerator)
			.attr('fill',(d) => colorScale(d.data[xVar]));
	})
}
</script>

<div bind:this={div}></div>