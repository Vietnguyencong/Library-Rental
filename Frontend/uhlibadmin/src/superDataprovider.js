import user_dataprovider from './dataproviders/userDataprovider'
import items_dataprovider from './dataproviders/itemDataprovider'
import transaction_dataprovider from './dataproviders/transactionDataprovider'
import loanitem_dataprovider from './dataproviders/loanitemDataprovider'
import libraries_Dataprovider from './dataproviders/libraryDataprovider'
import employee_dataprovider from './dataproviders/employeeDataprovider'
import paidfine_dataprovider from './dataproviders/paidfinesDataprovider'
import waitinglist_dataprovider from './dataproviders/waitinglistDataprovider'
import notifications_dataprovider from './dataproviders/notificationsDataprovider'

const dataProviders = [
    { dataProvider: user_dataprovider, resources: "users"},
    { dataProvider: items_dataprovider, resources: "items"},
    { dataProvider: transaction_dataprovider, resources: "transactions"},
    { dataProvider: loanitem_dataprovider, resources: "loanitem"}, 
    // { dataProvider: items_dataprovider, resources: "items"}, 
    { dataProvider: libraries_Dataprovider, resources: "libraries"}, 
    { dataProvider: employee_dataprovider , resources: "employees"}, 
    { dataProvider: paidfine_dataprovider , resources: "paidfines"}, 
    { dataProvider: waitinglist_dataprovider , resources: "waitinglist"}, 
    { dataProvider: notifications_dataprovider , resources: "notifications"},
  ];

export default (type, resource, params) => {
    console.log(type)
    console.log(resource)
    console.log(params)
   
    const expected_provider = dataProviders.find(dp => dp.resources === resource);
    // console.log(expected_provider.dataProvider)
    switch (type){ 
        case 'GET_LIST':{
            return expected_provider.dataProvider.getList(resource, params);
        }
        case 'GET_ONE':{
            return expected_provider.dataProvider.getOne(resource, params);
        }
        case 'GET_MANY':{
            return expected_provider.dataProvider.getMany(resource, params);
        }
        case 'GET_MANY_REFERENCE':{
            return expected_provider.dataProvider.getManyReference(resource, params);
        }
        case 'UPDATE':{
            return expected_provider.dataProvider.update(resource, params);
        }
        case 'UPDATE_MANY':{
            return expected_provider.dataProvider.updateMany(resource, params);
        }
        case 'CREATE':{
            return expected_provider.dataProvider.create(resource, params);
        }
        case 'DELETE':{
            return expected_provider.dataProvider.delete(resource, params);
        }
        case 'DELETE_MANY':{
            return expected_provider.dataProvider.deleteMany(resource, params);
        }
        default : {
            return expected_provider.dataProvider.getList(resource, params);
        }
    }
};
  


  