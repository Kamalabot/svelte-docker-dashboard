<script>
// @ts-nocheck'
    import parsers from "$lib/parsers"    
	export let height;
    export let width;
	import * as d3 from 'd3'
	import { onMount } from 'svelte';
	export let label;
	export let color;
	export let xVar;
	export let yVar;	
    export let chartData; //get the historic data from page.js
	let div;

	linePlot(width, height, chartData,xVar,yVar,color,label)


	function linePlot(width, height, chartData,xVar,yVar,color,label){

		const margin = { left: 30, right: 40, top: 10, bottom: 30 };
		const visHeight = height - margin.top - margin.bottom;
		const visWidth = width - margin.right - margin.left;


		const xData = chartData.map(d => d[xVar]);
		const yData = chartData.map(d => d[yVar]);

		const numberFormat = d3.format(".2s");

		onMount(() => {

		const docLocation = d3.select(div)
		
		const canvas = docLocation.append('svg')
				.attr('width',width)
				.attr('height',height)

		const chart = canvas.append('g')
			.attr('transform', `translate(${0}, ${margin.top})`);

		const xScale = d3.scalePoint()
			.domain(xData)
			.range([margin.left, visWidth + 35])

		const yScale = d3.scaleLinear()
			.domain([0, d3.max(yData)])
			.range([visHeight, margin.top])
			.clamp(true);
			

		const yAxis = canvas.append('g')
			.attr('transform', `translate(${margin.left},${margin.top})`)
			.call(d3.axisLeft(yScale))
			.selectAll("text")  
			.style("text-anchor", "end")
			.attr("dx", "-.1em")
			.attr("dy", ".05em")
			.attr("transform", "rotate(-25)");

		const xAxis = canvas.append('g')
			.attr('transform', `translate(${0},${visHeight + margin.top})`)
			.call(d3.axisBottom(xScale))
			.selectAll("text")  
			.style("text-anchor", "end")
			.attr("dx", "-.1em")
			.attr("dy", ".05em")
			.attr("transform", "rotate(-25)");
			
		const title = canvas.append('g')
			.attr('transform',`translate(${width/4},${margin.top + 20})`)
			.append('text')
			.text(label)

		const bubbles = chart.selectAll('g')
			.data(chartData)
			.join('g');

		const linePath =  d3.line()
				.curve(d3.curveCardinal)
				.x(d => xScale(d[xVar]))
				.y(d => yScale(d[yVar]))

		const linesGroup = chart.append('g');

		linesGroup.append('path')
			.attr('d', linePath(chartData))
			.attr('fill','none')
			.attr('stroke-width',2)
			.attr('stroke', color)
	/*	
		const valuesRef = bubbles
			.append('text')
			.attr('x', d => xScale(d[xVar]))
			.attr('y', d => yScale(d[yVar]))
			.text(d => `${numberFormat(d[yVar])}`)
			.attr('fill', color)
			.attr('font-size', '15')
			.attr('dy', -10);*/
	})
}
</script>

<div bind:this={div}></div>