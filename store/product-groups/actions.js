export default {
    async getGroups({ commit, state }, page = 1) {
        if(state.data[page]) {
            commit('SET_PROPERTY', { key: 'page', value: page });
            return [true, false];
        }

        try {
            const response = await this.$axios.get(`/product-groups?page=${page}`);

            commit('SET_DATA', response.data);
            return [true, false];
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
    },
    async deleteGroup({ commit }, id) {
        try {
            await this.$axios.delete(`product-groups/${id}`);

            commit('DELETE_GROUP', id);

            return [true, null]; 
        } catch(err) {
            return [false, err];
        }
    }
}