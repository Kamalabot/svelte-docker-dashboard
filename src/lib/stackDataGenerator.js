import * as d3 from "d3"

function stackedDataGen(chartData,stackVar,yVar,xVar){
	const stackVarArray = d3.groupSort(
	  chartData,
	  groupInter => -d3.sum(groupInter, c => c[yVar]), //minus sign is for the order
	  d => d[stackVar]
	)
	
	const counts = d3.rollup(chartData,
			 groupInter => d3.sum(groupInter, c => c[yVar]),
			 d => d3.timeMonth(d[xVar]),
			 d => d[stackVar]);

	const dataByXvar = Array.from(counts, (([xval, map]) => {
		map.set('total', d3.sum(map.values()));
		map.set('xVar', xval);
		return Object.fromEntries(map)
	  }));
	
	const stackData = d3.stack().keys(stackVarArray)(dataByXvar)
	//console.log(stackData)
	return stackData
}

export default{
	stackedDataGen
}