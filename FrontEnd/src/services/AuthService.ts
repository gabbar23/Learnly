import Api from '@/services/ApiConnection'

export default {
    register (credentials : object){
        // return Api().post('api/register/createSeller',credentials)
        return Api().post('api/fetch/fetchCity',credentials)

    }
}
