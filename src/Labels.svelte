<script>
    export let result, isPhone, compare

    let labelsList = [
        [result.data.healthLabels, "green"],
        [result.data.dietLabels, "yellow"],
        [result.data.cautions, "red"],
    ]
</script>

<div class="h-28 px-2">
    {#each labelsList as labelList}
        <div class="scrollmenu">
            {#each labelList[0] as label}
                <div class="text-{isPhone && compare ? 'xs' : 'sm'} font-medium bg-{labelList[1]}-100 p-1 rounded text-{labelList[1]}-500 align-middle hover:bg-{labelList[1]}-200 hover:ring-2 hover:ring-{labelList[1]}-500">
                    {label}
                </div>
            {/each}
        </div>
    {/each}
</div>
