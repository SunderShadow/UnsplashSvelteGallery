<script lang="ts">
    let leftSidePageMax  = 3
    let rightSidePageMax = 3

    export let totalPages  = 1
    export let currentPage = 1

    let leftPageNums:  number[] = []
    let rightPageNums: number[] = []

    function fillLeftSidePages() {
        let newPageNumbers = []

        for (let i = currentPage - leftSidePageMax; i < currentPage; i++) {
            if (i > 0) {
                newPageNumbers.push(i)
            }
        }

        leftPageNums = newPageNumbers
    }

    function fillRightSidePages() {
        let newPageNumbers = []

        for (let i = currentPage + 1; i <= currentPage + rightSidePageMax; i++) {
            if (i <= totalPages) {
                newPageNumbers.push(i)
            }
        }

        rightPageNums = newPageNumbers
    }

    export function setCurrentPage(pageNum: number) {
        currentPage = pageNum

        fillLeftSidePages()
        fillRightSidePages()
    }

    fillLeftSidePages()
    fillRightSidePages()
</script>

<div class="pagination gap-2">
    {#if currentPage > leftSidePageMax + 1}
        <li on:click={() => setCurrentPage(1)} class="page-item page-link">1</li>
        <li class="disabled page-item page-link">...</li>
    {/if}

    {#each leftPageNums as i}
        <li on:click={() => setCurrentPage(i)} class="page-item page-link">{i}</li>
    {/each}

    <li class="page-item page-link active">{currentPage}</li>

    {#each rightPageNums as i}
        <li on:click={() => setCurrentPage(i)} class="page-item page-link">{i}</li>
    {/each}

    {#if totalPages - currentPage > rightSidePageMax}
        <li class="disabled page-item page-link">...</li>
        <li on:click={() => setCurrentPage(totalPages)} class="page-item page-link">{totalPages}</li>
    {/if}
</div>

<style>

    li {
      cursor: pointer;
    }

    li.disabled {
      cursor: default;
    }
</style>