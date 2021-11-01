<script>
    export let result, isPhone
</script>

<span>
    {#if isPhone}
        <b>{result.data.calories}</b> Cal<br>
        <b>{result.data.totalWeight}</b> g
    {:else}
        <b>{result.data.calories}</b> Cal - <b>{result.data.totalWeight}</b> g
    {/if}
</span>
