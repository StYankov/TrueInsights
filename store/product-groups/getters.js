export default {
    groups: state => {
        return state.data[state.page];
    },
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
            const storeName = `${product.store} ${product.country || ''}`;
            if(!results[storeName]) {
                results[storeName] = [];
            }
            
            results[storeName].push(product);
        }

        return results;
    },
    stores: state => {
        const result = {};
        if(!state.group || !state.group.products)
            return result;

        for(const product of state.group.products) {
            result[product.store_slug] = {
                name: product.store,
                country: product.country
            }
        }

        return result;
    },
    getGroup: state => id => {
        return state.data.reduce((acc, val) => acc.concat(val), [])
            .find(x => x._id === id);
    }
}