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

<div class="pagination">
    {#if currentPage > leftSidePageMax + 1}
        <button on:click={() => setCurrentPage(1)}>1</button>
        <span>...</span>
    {/if}

    {#each leftPageNums as i}
        <button on:click={() => setCurrentPage(i)}>{i}</button>
    {/each}

    <button class="current">{currentPage}</button>

    {#each rightPageNums as i}
        <button on:click={() => setCurrentPage(i)}>{i}</button>
    {/each}

    {#if totalPages - currentPage > rightSidePageMax}
        <span>...</span>
        <button on:click={() => setCurrentPage(totalPages)}>{totalPages}</button>
    {/if}
</div>

<style>
    .pagination {
      display: flex;
      justify-content: center;
      gap: 1rem;
    }


    span {
      user-select: none;
    }

    button {
      display: flex;

      border: none;
      padding: .5em;
      opacity: .5;
      background-color: blanchedalmond;

      cursor: pointer;
    }

    .pagination .current {
      opacity: 1;
    }
</style>