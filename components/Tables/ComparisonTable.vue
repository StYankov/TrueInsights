<template>
    <div class="comparison-table">
        <h4 class="comparison-table__title">{{ title }}</h4>
        <table class="table">
            <thead>
                <tr>
                    <th @click="changOrder(label)" v-for="label in labels" :key="label">{{ label }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, i) in filteredData" :key="'row-' + i">
                    <td v-for="(value, key) in row" :key="key + i">
                        {{ value }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    data() {
        return {
            orderMethod: null,
            orderType: 'desc'
        }
    },
    props: ['title', 'labels', 'rows'],
    methods: {
        changOrder(sortIndex) {
            if(sortIndex === this.orderMethod) {
                this.orderType = this.orderType === 'asc' ? 'desc' : 'asc';
            } else {
                this.orderType = 'desc';
            }

            this.orderMethod = sortIndex;
        }
    },
    computed: {
        filteredData() {
            if(!this.orderMethod)
                return this.rows;

            const sorted = [...this.rows].sort((first, second) => {
                return second[this.orderMethod] - first[this.orderMethod];
            });

            if(this.orderType === 'asc')
                return sorted.reverse();
            
            return sorted;
        }
    }
}
</script>
<style lang="scss" scoped>
.comparison-table {
    &__title {
        text-align: center;
        margin-bottom: 1rem;
    }

    table {
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        border-radius: 3px;
        overflow: hidden;

        thead th {
            background-color: $menu-dark;
            color: #fff;
        }

        tbody tr:nth-of-type(even) td {
            background-color: #F3F3F3;
        }
    }

    th {
        cursor: pointer;
        user-select: none;
    }
}
</style>