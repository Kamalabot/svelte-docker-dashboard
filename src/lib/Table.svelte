<script>
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
		<table class="collapse ba br2 b--black-10 pv2 ph3 mt4">
		  <thead>
			<tr class="striped--near-white">
			  <th class="pv2 ph3">Row Data</th>
			</tr>
		  </thead>
		  <tbody>
			{#each fileData as line}
			  <tr class="striped--near-white">
				<td class="pv2 ph3">{JSON.stringify(line)}</td>
			  </tr>
			{/each}
		  </tbody>
		</table>
	  {:else}
	  <h3>Please enter the URL for fetching the file</h3>
	  {/if}
  </div>
</div>