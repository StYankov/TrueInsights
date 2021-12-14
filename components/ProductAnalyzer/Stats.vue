<template>
    <table class="table">
        <thead>
            <tr>
                <td>Asset</td>
                <td>Category Average</td>
                <td>Current Product</td>
                <td>Status</td>
                <td>Action</td>
            </tr>
        </thead>
        <tbody>
            <tr :class="getRowClass(stats.title.status)">
                <td>Title</td>
                <td>{{ stats.title.average }} <span class="unit">characters</span></td>
                <td>{{ stats.title.current }} <span class="unit">characters</span></td>
                <td>{{ getStatus(stats.title.status) }}</td>
                <td>{{ getTitleAction(stats.title.status) }}</td>
            </tr>

            <tr :class="getRowClass(stats.description.status)">
                <td>Description</td>
                <td>{{ stats.description.average }} <span class="unit">characters</span></td>
                <td>{{ stats.description.current }} <span class="unit">characters</span></td>
                <td>{{ getStatus(stats.description.status) }}</td>
                <td>{{ getDescriptionAction(stats.description.status) }}</td>
            </tr>

            <tr :class="getRowClass(stats.images.status)">
                <td>Images</td>
                <td>{{ stats.images.average }}</td>
                <td>{{ stats.images.current }}</td>
                <td>{{ getStatus(stats.images.status) }}</td>
                <td>{{ getImagesAction(stats.images.status, stats.images.current, stats.images.average) }}</td>
            </tr>
        </tbody>
    </table>
</template>
<script>
export default {
    props: ['stats'],
    methods: {
        getStatus(value) {
            if(value === 0)
                return 'Excelent';
            if(value === 1)
                return 'Good';
            if(value === 2)
                return 'Needs Improvements';

            return 'Bad';
        },
        getTitleAction(status) {
            if(status <= 1)
                return 'No action needed';

            return 'Rewrite the title';
        },
        getDescriptionAction(status) {
            if(status <= 1)
                return 'No action needed';

            return 'Re-write the copy';
        },
        getImagesAction(status, current, average) {
            if(status <= 1)
                return 'No action needed';

            if(current < average)
                return 'Add more images';
            else return 'Reduce number of images';
        },
        getRowClass(status) {
            switch(status) {
                case 1:
                    return 'row-good';
                case 2:
                    return 'row-warning';
                case 3:
                    return 'row-bad';
                default:
                    return '';
            }
        }
    }
}
</script>
<style scoped>
.unit {
    font-size: 0.75rem;
    font-weight: 600;
}

.row-good {
    color: #2c3e50;
}

.row-warning {
    color: #f39c12;
}

.row-bad {
    color: #c0392b;
    font-weight: bold;
}
</style>