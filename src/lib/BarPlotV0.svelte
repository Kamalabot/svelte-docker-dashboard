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
	
	function groupingSum(dataset, category, reqdSum){
		var result = d3.rollups(dataset,v => d3.sum(v, f => f[reqdSum]), d => d[category]).map(d => ({
			category: d[0],
			value :d[1]
		})).sort((a,b) => d3.descending(a.value, b.value))
		return result
	}
	
	const sumCatData = groupingSum(chartData,xVar, yVar)
	//console.log(sumCatData)
	
	barPlot(width, height, sumCatData,"category","value",color,label)


	function barPlot(width, height, chartData,xVar,yVar,color,label){

		const margin = { left: 40, right: 20, top: 10, bottom: 30 };
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

		const xScale = d3.scaleBand()
			.domain(xData)
			.range([margin.left, visWidth + 35])
			.paddingInner(0.2);

		const yScale = d3.scaleLinear()
			.domain([0, d3.max(yData)])
			.range([visHeight, margin.top])
			.clamp(true);
			

		const yAxis = canvas.append('g')
			.attr('transform', `translate(${margin.left},${margin.top})`)
			.call(d3.axisLeft(yScale)
					.tickFormat(function(d){
							return d3.format('~s')(d)
								}))
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

		const bars = bubbles
			.append('rect')
			.attr('x',d => xScale(d[xVar]))
			.attr('y', d => yScale(d[yVar]))
			.attr('height', d => visHeight - yScale(d[yVar]))
			.attr('width', xScale.bandwidth())
			.attr('class', 'ref')
			.attr('fill', color)
			.attr('opacity', 0.7);
/*
		const valuesRef = bubbles
			.append('text')
			.attr('x', d => xScale(d[xVar]) + xScale.bandwidth())
			.attr('y', d => yScale(d[yVar]))
			.text(d => d[yVar])
			.attr('fill', color)
			.attr('font-size', '15');*/
			})
	}
</script>

<div bind:this={div}></div>