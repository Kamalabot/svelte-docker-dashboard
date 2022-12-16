<script>
 import { format} from "d3"
 const numberFormat = format(".2s")
 export let fileData
//  console.log(fileData,'start')
</script>

<style>
  table {
    width: 100%;
  }
  .section {
    padding: 0.5rem 1.5rem;
  }
</style>

<div class="section">
  <div class="container">
	  {#if fileData.length != 0}
		<table class="table table-compact w-full">
		  <thead>
			<tr class="striped--near-white">
			  	<th class="pv2 ph3">Stores</th>
				<th class="pv2 ph3">SalesUnits</th>
				<th class="pv2 ph3">Unit/Txn</th>
				<th class="pv2 ph3">Sales $</th>
				<th class="pv2 ph3">Cost $</th>
				<th class="pv2 ph3">Cost/Unit</th>
				<th class="pv2 ph3">Sales Execs</th>
			</tr>
		  </thead>
		  <tbody>
			{#each fileData as line}
			  <tr class="striped--near-white">
				  <td class="pv2 ph3">{line.store}</td>
				  <td class="pv2 ph3">{line.saleUnits}</td>
				  <td class="pv2 ph3">{line.UPT.toFixed(1)}</td>
				  <td class="pv2 ph3">{numberFormat(line.sales)}</td>
				  <td class="pv2 ph3">{numberFormat(line.cost)}</td>
				  <td class="pv2 ph3">{line.costPerUnit.toFixed(1)}</td>
				  <td class="pv2 ph3">{line.repsInStore}</td>
			  </tr>
			{/each}
		  </tbody>
		</table>
	  {:else}
	  <h3>Please provide appropriate build data for the table</h3>
	  {/if}
  </div>
</div>