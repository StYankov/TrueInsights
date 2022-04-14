export default {
    setProperty(state, { key, value }) {
        state[key] = value;
    },
    setFilter(state, { key, filter }) {
        state.filters[key] = filter;
    },
    DELETE_GROUP(state, id) {
        state.data = state.data.filter(x => x._id !== id);
    }
}