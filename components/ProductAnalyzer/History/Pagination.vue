<template>
    <nav v-if="pages.length > 1" aria-label="Page navigation example">
        <ul class="pagination">
            <li v-if="current > 1" class="page-item"><nuxt-link class="page-link" @click.native="changePage(current - 1)" :to="pageLink(current - 1)">Previous</nuxt-link></li>
            <li v-for="page in pages" :key="page" class="page-item" :class="{active: page === current}">
                <nuxt-link class="page-link" @click.native="changePage(page)" :to="pageLink(page)">{{ page }}</nuxt-link>
            </li>
            <li v-if="total !== current" class="page-item">
                <nuxt-link class="page-link" @click.native="changePage(current + 1)" :to="pageLink(current + 1)">Next</nuxt-link>
            </li>
        </ul>
    </nav>
</template>
<script>
export default {
    mounted() {
        console.log(this.pages);
    },
    methods: {
        pageLink(page) {
            if(page === 1)
                return `/analyzer/history`; 

            return `/analyzer/history?page=${page}`;
        },
        changePage(page) {
            this.$store.dispatch('analyzer/getHistoryItems', page)
                .then(() => {
                    window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: 'smooth'
                    })
                });
        }
    },
    computed: {
        current() {
            return this.$store.state.analyzer.currentPage;
        },
        total() {
            return this.$store.state.analyzer.totalPages;
        },
        pages() {
            const min = Math.max(1, this.current - 2);
            const max = Math.min(this.current + 2, this.total);

            return [...Array(max - min + 1).keys()].map(i => i + min);
        }
    }
}
</script>