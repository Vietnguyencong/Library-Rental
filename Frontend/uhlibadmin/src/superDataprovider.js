import user_dataprovider from './dataproviders/userDataprovider'
import items_dataprovider from './dataproviders/itemDataprovider'
// import transaction_dataprovider from './dataproviders/transactionDataprovider'
// import loanitem_dataprovider from './dataproviders/transactionDataprovider'
// import library_Dataprovider from './dataproviders/transactionDataprovider'
// import employee_dataprovider from './dataproviders/transactionDataprovider'
// import employee_dataprovider from './dataproviders/transactionDataprovider'

const dataProviders = [
    { dataProvider: user_dataprovider, resources: "users"},
    { dataProvider: items_dataprovider, resources: "items"},
    // { dataProvider: transaction_dataprovider, resources: "transactions"}, 
    // { dataProvider: loanitem_dataprovider, resources: "loanitem"}, 
    // { dataProvider: library_Dataprovider, resources: "library"}, 
    // { dataProvider: employee_dataprovider , resources: "employee"}, 
    // { dataProvider: paidfine_dataprovider , resources: "paidfine"}, 
  ];
  

export default (type, resource, params) => {
  
    // console.log(mappingType[type]) 
    // console.log(resource)
    // console.log(params)
    const expected_provider = dataProviders.find(dp => dp.resources == resource);
    // console.log(expected_provider.dataProvider)
    switch (type){ 
        case 'getList':{
            return expected_provider.dataProvider.getList(resource, params);
        }
        case 'getOne':{
            return expected_provider.dataProvider.getOne(resource, params);
        }
        case 'getMany':{
            return expected_provider.dataProvider.getMany(resource, params);
        }
        case 'getManyReference':{
            return expected_provider.dataProvider.getManyReference(resource, params);
        }
        case 'update':{
            return expected_provider.dataProvider.update(resource, params);
        }
        case 'updateMany':{
            return expected_provider.dataProvider.updateMany(resource, params);
        }
        case 'create':{
            return expected_provider.dataProvider.create(resource, params);
        }
        case 'delete':{
            return expected_provider.dataProvider.delete(resource, params);
        }
        case 'deleteMany':{
            return expected_provider.dataProvider.deleteMany(resource, params);
        }
    }
};
  


  