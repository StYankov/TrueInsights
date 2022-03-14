export const state = () => ({
    group: {},
    data: [],
    page: 1,
    totalPages: 1,
    filters: {
        stores: [],
        keyword: ''
    }
});

export const getters = {
    products: state => {
        if(!state.group.products)
            return [];

        let filtered = state.group.products;

        if(state.filters.keyword)
            filtered = filtered.filter(product => product.product.title.toLowerCase().indexOf(state.filters.keyword) !== -1);

        if(state.filters.stores.length)
            filtered = filtered.filter(product => state.filters.stores.indexOf(product.store_slug) !== -1);

        const results = {};
        for(const product of filtered) {
            const storeName = `${product.store} ${product.country}`;
            if(!results[storeName]) {
                results[storeName] = [];
            }
            
            results[storeName].push(product);
        }

        return results;
    },
    stores: state => {
        const result = {};
        for(const product of state.group.products) {
            result[product.store_slug] = {
                name: product.store,
                country: product.country
            }
        }

        return result;
    }
}

export const mutations = {
    setProperty(state, { key, value }) {
        state[key] = value;
    },
    setFilter(state, { key, filter }) {
        state.filters[key] = filter;
    }
}

export const actions = {
    async getGroups({ commit }) {
        try {
            const response = await this.$axios.get('/product-groups');

            commit('setProperty', { key: 'page', value: response.data.current_page });
            commit('setProperty', { key: 'totalPages', value: response.data.last_page });
            commit('setProperty', { key: 'data', value: response.data.data });

            return [response.data.data, false];
        } catch(err) {
            return [false, err];
        }
    },
    async getGroup({ state, commit }, id) {
        try {
            const response = await this.$axios.get(`/product-groups/${id}`);

            commit('setProperty', { key: 'group', value: response.data });

            return [response.data, false];
        } catch(err) {
            return [false, err];
        }
    },
    async export({}, id) {
        const response = await this.$axios({
            url: `/product-groups/${id}/export`,
            method: 'GET',
            responseType: 'blob'
        });

        const fileName = `${id}-export.csv`;

        const fileUrl = window.URL.createObjectURL(new Blob([response.data]));
        const fileLink = document.createElement('a');

        fileLink.href = fileUrl;
        fileLink.setAttribute('download', fileName);
        document.body.appendChild(fileLink);

        fileLink.click();
    }
}