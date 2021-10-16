export const finder = () => ({
    name: '',
    stores: [],
    keywords: [],
});

export const state = () => ({
    finders: [],
    finder: finder(),
    countries: [],
    stores: [],
});

export const mutations = {
    setProperty(state, { key, value }) {
        state[key] = value;
    },
    setFinderProperty(state, { key, value }) {
        state.finder[key] = value;
    },
    toggleStore(state, storeId) {
        if(state.finder.stores.indexOf(storeId) !== -1) {
            state.finder.stores = state.finder.stores.filter(s => s !== storeId);
        } else {
            state.finder.stores.push(storeId);
        }
    },
    toggleKeyword(state, keyword) {
        if(state.finder.keywords.indexOf(keyword) !== -1) {
            state.finder.keywords = state.finder.keywords.filter(s => s !== keyword);
        } else {
            state.finder.keywords.push(keyword);
        }
    },
    resetFinder(state) {
        state.finder = finder();
    }
}

export const actions = {
    async getCountries({ commit }) {
        try {
            const response = await this.$axios.get('countries');

            console.log(response.data);

            commit('setProperty', { key: 'countries', value: response.data });

            return [true, null];
        } catch(e) {
            console.log(e);
            return [false, e.errors];
        }
    },
    async getStores({ commit }) {
        try {
            const response = await this.$axios.get('stores');

            commit('setProperty', { key: 'stores', value: response.data });

            return [true, null];
        } catch(e) {
            return [false, e.errors];
        }
    },
    async createReport({ commit, state }) {
        try {
            const response = await this.$axios.post('keyword-report', state.finder);

            return [response.data, null];
        } catch(e) {
            return [null, e.errors];
        }
    }
}