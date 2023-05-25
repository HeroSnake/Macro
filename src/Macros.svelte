<script>
    export let result
</script>

<table class="table-auto">
    <tbody>
        {#each Object.values(result.data.totalNutrients) as Nutrient}
            {#if Nutrient.quantity > 0}
                <tr>
                    <td>{Nutrient.label}</td>
                    <td>{parseFloat(Nutrient.quantity).toFixed(2)} {Nutrient.unit}</td>
                </tr>
            {/if}
        {/each}
    </tbody>
</table>
