<script>
// @ts-nocheck'
    import parsers from "$lib/parsers"    
	export let height;
    export let width;
	import * as d3 from 'd3'
	import { onMount } from 'svelte';
	export let label;
	export let xVar;
	export let stackVar
    export let stackedData; //get the historic data from page.js
	let div;

	stackedBarPlot(width, height, stackedData,stackVar,xVar, label)

	function stackedBarPlot(width, height,stackedData, stackVar, xVar, label) {
	  console.log(stackedData)	
	  const xArray = stackedData.map(d => d.data[xVar])
	
	  const maxYVal = d3.max(stackedData.map(d => d.data['total']))
	
	  console.log(xArray, maxYVal)
	  const color = d3.scaleOrdinal()
    		.domain(stackedData.map(d => d.key))
    		.range(d3.schemeTableau10);
		
	  const margin = {top: 30, right: 0, bottom: 20, left: 40};
	  const visWidth = width - margin.left - margin.right;
	  const visHeight = 500 - margin.top - margin.bottom;

	  onMount(() => {

			const docLocation = d3.select(div)

			const canvas = docLocation.append('svg')
					.attr('width',width)
					.attr('height',height)

			const chart = canvas.append('g')
				.attr('transform', `translate(${150}, ${margin.top})`);

			const title = canvas.append('g')
				.attr('transform',`translate(${0},${margin.top + 20})`)
				.append('text')
				.text(label)
	
		  const x = d3.scaleBand()
			  .domain(xArray)
			  .range([0, visWidth])
			  .padding(0.25)

		  const y = d3.scaleLinear()
			  .domain([0, maxYVal]).nice()
			  .range([visHeight, 0]);

		  const xAxis = d3.axisBottom(x).tickFormat(d3.timeFormat('%B'))

		  const yAxis = d3.axisLeft(y).tickFormat(d3.format(''))

		  canvas.append('g')
			  .attr('transform', `translate(0,${visHeight})`)
			  .call(xAxis)
			  .call(g => g.select('.domain').remove());

		  canvas.append("g")
			  .call(yAxis)
			  .call(g => g.select('.domain').remove())

		  const series = chart.append('g')
			.selectAll('g')
			.data(stackedData)
			.join('g')
			  .attr('fill', d => color(d.key));

		  series.selectAll('rect')
			.data(d => d)
			.join('rect')
			  .attr('y', d => y(d[1]))
			  .attr('height', d => y(d[0]) - y(d[1]))
			  .attr('x', d => x(d.data['xVar']))
			  .attr('width', x.bandwidth())

		})
	}
</script>

<div bind:this={div}></div>