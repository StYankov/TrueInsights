<template>
    <tr class="product-group">
        <td class="item-name"><nuxt-link :to="`/product-groups/${group._id}`">{{ group.name }}</nuxt-link></td>
        <td class="item-summary"><span class="count">{{ group.urls.length }}</span> SKUs in <span class="count">1</span> store</td>
        <td class="item-score" :style="{color: statusColor}">{{total}}%</td>
        <td><span :class="statusClass" >{{ group.status }}</span></td>
        <td class="item-date">{{ createdAt }}</td>
        <td class="item-delete">
            <button @click="deleteRow" type="button" class="btn-icon btn-delete">
                <fa :icon="['fas', 'trash']" />
            </button>
        </td>
    </tr>
</template>
<script>
export default {
    props: {
        group: {
            type: Object,
            required: true,
            default: () => {}
        }
    },
    methods: {
        deleteRow() {
            if(confirm(`Confirm deleting "${this.group.name}" group`)) {
                this.$store.dispatch('product-groups/deleteGroup', this.group._id);
            }
        }
    },
    computed: {
        total() {
            const products = this.group.products;

            const totalSum = products.reduce((acc, curr) => acc + (curr.statistics.total || 0), 0)

            if(totalSum === 0)
                return 0;

            return (totalSum / products.length).toFixed(2);

        },
        statusClass() {
            const classes = ['badge-pill'];
            if(this.group.status === 'success')
                classes.push('badge-success')
            
            if(this.group.status === 'queued')
                classes.push('badge-primary')

            if(this.group.status === 'error')
                classes.push('badge-danger')

            return classes.join(' ');
        },
        statusColor() {
            if(this.total >= 90)
                return '#16a085';

            if(this.total >= 75)
                return '#88b554';

            if(this.total >= 35)
                return '#f39c12'; 

            return '#c0392b';
        },
        createdAt() {
            return this.group.created_at.slice(0, 10);
        }
    }
}
</script>
<style lang="scss" scoped>
.product-group {
    cursor: pointer;
}

.item-name a {
    font-weight: 600;
    color: #222;
}

.item-summary {
    font-weight: 300;
    font-size: 13px;
    color: $menu-dark;
    width: 200px;
}

.item-summary .count {
    font-weight: 700;
    font-size: 15px;
    color: $heading;
}

.item-score {
    font-weight: 700;
    width: 150px;
    text-align: center;
}

.badge-pill {
    display: inline-block;
    font-weight: 600;
    color: #fff;
    font-size: 12px;
    padding-top: 2px;
    padding-bottom: 2px;
    padding-left: 10px;
    padding-right: 10px;
}
</style>