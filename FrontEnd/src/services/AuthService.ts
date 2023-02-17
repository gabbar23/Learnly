import Api from '@/services/ApiConnection'

export default {
    register (credentials : object){
        return Api().post('api/register/createSeller',credentials)
    }
    ,
    getStates(){
        return Api().get('api/fetch/fetchStates')
    }
    ,
    //add parameter state name to search city
    getCities(){
        return Api().get('api/fetch/fetchCities')
    }
}
