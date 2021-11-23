export const state = () => ({
    erorr: false
});

export const mutations = {

}

export const actions = {
    async login({ commit }, payload) {
        try {
            await this.$axios({ url: 'sanctum/csrf-cookie', baseURL: process.env.baseURL });
            const response = await this.$auth.loginWith('local', { data: payload });

            return [response.data, null];
        } catch(e) {
            return [null, e.errors];
        }
    },
    async logout() {
        await this.$auth.logout();
    }
}