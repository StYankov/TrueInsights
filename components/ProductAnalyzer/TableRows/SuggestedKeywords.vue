<template>
    <tr>
        <td>Suggested keywords</td>
        <td colspan="3">
            <div v-if="loading" class="loading-container">
                <Loader />
            </div>

            <template v-if="missingKeywords">
                <span class="keyword" v-for="keyword in missingKeywords" :key="keyword" v-html="keyword"></span>
            </template>

            <template v-if="noMissingKeywords">
                No missing keywords
            </template>
        </td>
        <td>
            {{ missingKeywordsAction }}
        </td>
    </tr>
</template>
<script>
import Loader from '@/components/Shared/FormElements/Loader';

export default {
    components: {
        Loader
    },
    props: {
        missingKeywords: {
            type: Array,
            default: () => null
        },
        loading: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        noMissingKeywords() {
            return Array.isArray(this.missingKeywords) && this.missingKeywords.length === 0 && this.loading === false;
        },
        missingKeywordsAction() {
            if(!this.missingKeywords)
                return '';
            
            if(this.missingKeywords.length <= 1)
                return 'No action needed';
            
            return 'Consider adding these keywords to the product\'s description';
        }
    }
}
</script>
<style scoped>
.loading-container {
    width: 100%;
    text-align: center;
}
.keyword {
    display: inline-block;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
    padding: 3px 7px;
    background: rgba(52, 73, 94, 0.7);
    color: #fff;
    border-radius: 8px;
}
</style>