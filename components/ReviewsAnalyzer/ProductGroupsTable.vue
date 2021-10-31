<template>
    <div class="table-wrapper">
        <table class="table">
            <thead>
                <tr>
                    <th>Group Name</th>
                    <th>Products</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in rows" :key="row.name">
                    <td>{{ row.name }}</td>
                    <td>{{ row.products }}</td>
                    <td><Button buttonClasses="ml-auto" stroke small @click="$emit('select', row)">Select</Button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import Button from '@/components/Shared/FormElements/Button';

export default {
    components: { Button },
    data() {
        return {
            rows: [
                { name: 'DE Products', products: 412 },
                { name: 'Toilet Paper UK', products: 98 },
                { name: 'Priority Items EU West', products: 50 },
                { name: 'Sand Paper', products: 50 }
            ]
        }
    }
}
</script>