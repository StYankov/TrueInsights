<template>
    <div class="retaler-statistics mb-5">
        <Button small @click="show = !show">Toggle Retailer Statistics</Button>

        <transition name="slide">
            <div class="table-wrapper mt-4" v-if="show">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Asset</th>
                            <th>Average</th>
                            <th>Max</th>
                            <th>Current Product</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Title</td>
                            <td>{{ retailer.title.avg }} <span class="unit">characters</span></td>
                            <td>{{ retailer.title.max }} <span class="unit">characters</span></td>
                            <td>{{ product.title.current }} <span class="unit">characters</span></td>
                        </tr>

                        <tr>
                            <td>Description</td>
                            <td>{{ retailer.description.avg }} <span class="unit">characters</span></td>
                            <td>{{ retailer.description.max }} <span class="unit">characters</span></td>
                            <td>{{ product.description.current }} <span class="unit">characters</span></td>
                        </tr>

                        <tr>
                            <td>Image Count</td>
                            <td>{{ retailer.images.avg }}</td>
                            <td>{{ retailer.images.max }}</td>
                            <td>{{ product.images.current }}</td>
                        </tr>

                        <tr>
                            <td>Rating</td>
                            <td>{{ retailer.rating.avg }}</td>
                            <td>{{ retailer.rating.max }}</td>
                            <td>{{ product.rating.current }}</td>
                        </tr>

                        <tr>
                            <td>Reviews</td>
                            <td>{{ retailer.reviews.avg }}</td>
                            <td>{{ retailer.reviews.max }}</td>
                            <td>{{ product.reviews.current }}</td>
                        </tr>
                    </tbody>
                </table>
                <p class="text-muted">The data includes all products in the store.</p>
            </div>
        </transition>
    </div>
</template>
<script>
import Button from '@/components/Shared/FormElements/Button';

export default {
    components: { Button },
    props: ['retailer', 'product'],
    data() {
        return {
            show: false
        }
    }
}
</script>
<style scoped>
.slide-enter-active {
   -moz-transition-duration: 0.3s;
   -webkit-transition-duration: 0.3s;
   -o-transition-duration: 0.3s;
   transition-duration: 0.3s;
   -moz-transition-timing-function: ease-in;
   -webkit-transition-timing-function: ease-in;
   -o-transition-timing-function: ease-in;
   transition-timing-function: ease-in;
}

.slide-leave-active {
   -moz-transition-duration: 0.3s;
   -webkit-transition-duration: 0.3s;
   -o-transition-duration: 0.3s;
   transition-duration: 0.3s;
   -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
   -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
   -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
   transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to, .slide-leave {
   max-height: 100px;
   overflow: hidden;
}

.slide-enter, .slide-leave-to {
   overflow: hidden;
   max-height: 0;
}

.unit {
    font-size: 0.75rem;
    font-weight: 600;
}
</style>