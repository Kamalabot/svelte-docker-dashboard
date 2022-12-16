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
	export let refVar
    export let chartData; //get the historic data from page.js
	let div;

	treemapPlot(width, height, chartData,refVar,xVar,yVar, label)


	function treemapPlot(width,height,chartData,refVar,xVar,yVar, label){
		
		const parameterRollUp = d3.rollups(chartData, g => d3.sum(g, x => x[refVar]), d => d[yVar])
  				.sort((a,b) => d3.descending(a[1],b[1]))
		
		const dataHierarchy = d3.rollup(chartData, g => d3.sum(g, x => x[refVar]),d => d[yVar], d => d[xVar])		
	
		const paramColorScale = d3.scaleOrdinal()
  			.domain(parameterRollUp.map(d => d[0]))
  			.range(d3.schemeCategory10)
	
		paramColorScale.unknown('lightgreen')
				
		const margin = { left: 100, right: 100, top: 10, bottom: 10 };
		const visHeight = height - margin.top - margin.bottom;
		const visWidth = width - margin.right - margin.left;
	
		const dataPack = d3.treemap()
  			.size([visWidth,visHeight])
  			.paddingOuter(10)
			.paddingInner(2)
			.tile(d3.treemapBinary)
	
		const hierarchyRoot = d3.hierarchy(dataHierarchy)
		
		hierarchyRoot.sum(d => d[1])
	
		const hierarchyPack= dataPack(hierarchyRoot)
		
		const sizeScale = d3.scaleLinear()
		  .domain([0, d3.max(hierarchyRoot.descendants().map(d => d.r))])
		  .range([5,10])
	
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

		const bubbles = chart.selectAll('g')
			.data(hierarchyPack)
			.join('g')
			.attr('transform',d=> `translate(${d.x0},${d.y0})`);
	
		const tip = chart.append('text')
			.attr('transform','translate(-150,50)')
			.attr('visibility','hidden')
			.attr('id','recDetail')

		  bubbles 
			.append('rect')
			.attr('width', d => d.x1 - d.x0)
			.attr('height', d => d.y1 - d.y0)
			.attr('fill',d => paramColorScale(d.data[0]))
			.attr('opacity',0.8)
			.attr('stroke','black')
			.attr('stroke-opacity',0.3)
			.on('mouseover',showDetail)

		  function showDetail(event, d) {
			const text = d3.select('#recDetail')
			  .attr('visibility','visible')
			  .text(`${xVar}: ${d.data[0]}
					 ${refVar}: ${Math.round(d.value)} INR`)
		  }
		})
	}
</script>

<div bind:this={div}></div>