export const state = () => ({
    current: null,
    edit: []
});

export const mutations = {
    SET_CURRENT(state, current = null) {
        if(state.current) {
            state.edit = state.edit.filter(x => x.id !== state.current.id);
            state.edit.push(state.current);
        }

        state.current = current;
    },
    UPDATE_CURRENT(state, { key, value }) {
        if(state.current) {
            state.current.params[key] = value;
        }
    }
}

export const actions = {
    async saveParams({ commit, state }) {
        try {
            const response = await this.$axios.post('stores/user-preference', { store: state.current });

            return [true, false];
        } catch(err) {
            return [false, 'Could not update stor'];
        }
    }
}