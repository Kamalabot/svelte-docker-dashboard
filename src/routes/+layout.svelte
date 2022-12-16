<script>
  import "../app.css";
  export let data;	
</script>

<div class="navbar bg-primary">
  <!-- svelte-ignore a11y-missing-attribute -->
  <a class="btn btn-ghost normal-case text-xl" href="/">Home</a>	
	<div class="dropdown">
	  <label tabindex="0" class="btn btn-ghost normal-case text-xl m-1">DashBoards</label>
	  <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
		<li><a href="/performanceDB">Sales Performance Dashboard</a></li>
	  </ul>
	</div>
	<div class="dropdown">
	  <label tabindex="0" class="btn btn-ghost normal-case text-xl m-1">Gallery</label>
	  <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
		<li><a href="/sample">Basic Charts</a></li>
		<li><a href="/sample1">Complex Charts</a></li>
	  </ul>
	</div>
  <a class="btn btn-ghost normal-case text-xl" href="/getData">Get Data</a>
  	<div class="gap-5 navbar-end">
	{#if data?.profile}
		<form action='/logout' method='POST'>
			<button class="btn btn-outline base-300">Logout</button>	
		</form>
	{:else}	
	<a class="btn btn-outline base-300" href="/Register">Register</a>
  	<a class="btn btn-outline base-300" href="/login">Login</a>
	{/if}
	</div>	  
</div>


<slot />