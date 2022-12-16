<script>
 export let variable
 export let location
	let href = `/${location}/${variable}`
</script>
<a href={href}>{variable}</a>
