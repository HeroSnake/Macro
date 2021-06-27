<script>
    export let result;

    let labelsList = [
        [result.healthLabels, "green"],
        [result.dietLabels, "yellow"],
        [result.cautions, "red"],
    ];
</script>

{#each labelsList as labelList}
    <div class="scrollmenu">
        {#each labelList[0] as label}
            <div
                class="text-sm font-medium bg-{labelList[1]}-100 py-1 px-2 rounded text-{labelList[1]}-500 align-middle hover:bg-{labelList[1]}-200 hover:ring-2 hover:ring-{labelList[1]}-500"
            >
                {label}
            </div>
        {/each}
    </div>
{/each}
