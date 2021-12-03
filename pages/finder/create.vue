<template>
  <div class="container">
      <div class="page-logo">
          <img src="/images/keyword-finder.png" alt="keyword-finder" />
      </div>
      <h3 class="section-title">Keyword Research</h3>
      
      <RetailersSelect />

      <!-- <h3 class="section-title heading-with-button">Enter Seed Keywords* or <Button buttonClasses="ml-4" small>UPLOAD</Button></h3> -->
      <h3 class="section-title heading-with-button">Enter Seed Keywords*</h3>
      <div class="page-head align-items-lg-start">
        <Input ref="input" containerClass="mb-1" @enter="addKeyword" @blur="onBlur" desc="*Enter 1 keyword or more seperated by comma" />
        <Button small buttonClasses="ml-lg-4">Add</Button>
      </div>
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
    async asyncData({ store }) {
        await store.dispatch('finder/getCountries');
        await store.dispatch('finder/getStores');
    },
    beforeCreate() {
        this.$store.commit('finder/resetFinder');
    },
    methods: {
        updateProperty(key, value) {
            this.$store.commit('finder/setFinderProperty', { key, value });
        },
        onBlur(e) {
            if(!e.target.value)
                return;

            const value = e.target.value;
            const keywords = value.split(',');

            keywords.map(k => {
                this.$store.commit('finder/toggleKeyword', k)
            });
            e.target.value = '';
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
            // Validation
            if(this.finder.name.length < 2) {
                this.$swal.fire(
                    '',
                    'You must enter the name of the report to continue',
                    'warning'
                );

                return;
            }

            if(this.finder.keywords.length === 0) {
                this.$swal.fire(
                    '',
                    'You must enter at least 1 keyword to continue',
                    'warning'
                );

                return;
            }

            if(this.finder.stores.length === 0) {
                this.$swal.fire(
                    '',
                    'You must select at least 1 store to continue',
                    'warning'
                );

                return;
            }

            const [report, error] = await this.$store.dispatch('finder/createReport');

            if(report) {
                this.$router.push(`/finder/view/${report._id}`);
                this.$swal.fire(
                    '',
                    'Your request is scheduled for processing',
                    'info'
                );
            }
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