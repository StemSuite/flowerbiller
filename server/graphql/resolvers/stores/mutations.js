import Store from '../../../models/store.js';

const storeMutations = {
    addStore: async(_, {store}) => {
        let newStore = new Store ( store )
        return newStore.save()
    }
}

export default storeMutations;