<template>
    <nav v-if="pages.length > 1" aria-label="Page navigation example">
        <ul class="pagination">
            <li class="page-item">
                <nuxt-link 
                    class="page-link" 
                    :event="current === 1 ? '' : 'click'" 
                    :to="pageLink(1)"
                    @click.native="changePage(1)"
                >
                    First
                </nuxt-link>
            </li>
            <li v-for="page in pages" :key="page" class="page-item" :class="{active: page === current}">
                <nuxt-link
                    class="page-link" 
                    :to="pageLink(page)"
                    @click.native="$emit('changePage', page)" 
                >
                    {{ page }}
                </nuxt-link>
            </li>
            <li class="page-item">
                <nuxt-link
                    class="page-link"
                    :event="current === total ? '' : 'click'" 
                    :to="pageLink(total)"
                    @click.native="$emit('changePage', total)"
                >
                    Last
                </nuxt-link>
            </li>
        </ul>
    </nav>
</template>
<script>
export default {
    props: ['current', 'total'],
    methods: {
        pageLink(page) {
            const path = this.$route.path;

            if(page === 1)
                return path;

            return `${path}?page=${page}`;
        }
    },
    computed: {
        pages() {
            const min = Math.max(1, this.current - 2);
            const max = Math.min(this.current + 2, this.total);

            return [...Array(max - min + 1).keys()].map(i => i + min);
        }
    },
    watch: {
        current(newPage, oldPage) {
            if(newPage !== oldPage)
                window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: 'smooth'
                });
        }
    }
}
</script>