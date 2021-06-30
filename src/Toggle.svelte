<script>
    export let dark;

    const addDarkModeSelector = () => {
        if (!dark) {
            document.documentElement.classList.add("mode-dark");
        } else {
            document.documentElement.classList.remove("mode-dark");
        }
        dark = !dark;
    };
</script>

<!-- Toggle B -->
<div class="flex items-center justify-center w-full mb-4">
    <label for="toggleB" class="flex items-center cursor-pointer">
        <!-- toggle -->
        <div class="relative">
            <!-- input -->
            <input
                type="checkbox"
                on:click={addDarkModeSelector}
                id="toggleB"
                class="sr-only outline-none"
            />
            <!-- line -->
            <div class="block bg-gray-600 w-14 h-8 rounded-full" />
            <!-- dot -->
            <div
                class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"
            />
        </div>
    </label>
</div>
