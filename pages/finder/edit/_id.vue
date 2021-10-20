<template>
  <div class="container">
      <div class="page-logo">
          <img src="/images/keyword-finder.png" alt="keyword-finder" />
      </div>
      <h3 class="section-title">Keyword Research</h3>
      
      <RetailersSelect />

      <h3 class="section-title heading-with-button">Enter Seed Keywords* or <Button buttonClasses="ml-4" small>UPLOAD</Button></h3>
      <Input containerClass="mb-4" @enter="addKeyword" desc="*Enter 1 keyword or more seperated by comma" />
      <KeywordsBag />

      <h3 class="section-title">Enter Report Name</h3>
      <Input containerClass="mb-4" :value="finder.name" @input="updateProperty('name', $event.target.value)" />

      <Button @click="createReport" buttonClasses="ml-auto">Get Keywords</Button>

  </div>
</template>
<script>
import { mapState } from 'vuex';
import RetailersSelect from '@/components/KeywordFinder/RetailersSelect';
import KeywordsBag from '@/components/KeywordFinder/KeywordsBag';

import Button from '@/components/Shared/FormElements/Button';
import Input from '@/components/Shared/FormElements/Input';

export default {
    components: {
        RetailersSelect,
        Button,
        Input,
        KeywordsBag
    },
    async asyncData({ store, params, redirect }) {
        const [report, errors] = await store.dispatch('finder/getReport', params.id);

        if(errors) {
            return redirect('/finder');
        }

        await store.dispatch('finder/getCountries');
        await store.dispatch('finder/getStores');
    },
    beforeDestroy() {
        this.$store.commit('finder/resetFinder');
    },
    methods: {
        updateProperty(key, value) {
            this.$store.commit('finder/setFinderProperty', { key, value });
        },
        addKeyword(e) {
            if(!e.target.value)
                return;

            if(this.finder.keywords.indexOf(e.target.value) !== -1) {
                this.$swal.toast({ icon: 'error', title: 'The keyword already exists in the list' });
                return;
            }

            if(this.finder.keywords.length >= process.env.keywordsLimit) {
                this.$swal.toast({ icon: 'error', title: 'You have reached the maximum amount of keywords per report!' });
                return
            }

            this.$store.commit('finder/toggleKeyword', e.target.value);
            e.target.value = '';
        },
        async createReport() {
            const [report, error] = await this.$store.dispatch('finder/createReport');

            if(report) {
                this.$router.push(`/finder/edit/${report._id}`);
            }
            console.log(report, error);
        }
    },
    computed: {
        ...mapState('finder', ['finder'])
    }
}
</script>
<style>
.heading-with-button {
    display: flex;
    align-items: center;
}
</style>