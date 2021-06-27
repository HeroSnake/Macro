<script>
    export let result;
</script>

{#each Object.values(result.totalNutrients) as Nutrient}
    {#if Nutrient.quantity > 0}
        <div>
            <b>{Nutrient.label}</b> : {parseFloat(Nutrient.quantity).toFixed(2)}
            {Nutrient.unit}
        </div>
    {/if}
{/each}
