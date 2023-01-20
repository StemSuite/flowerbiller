import Store from '../../../models/store.js'

const storeQueries = {
    stores: async () => {
        return Store.find()
    },
    
    store: async (_, args) => {
        return Store.findById(args.id)
    }
}

export default storeQueries;