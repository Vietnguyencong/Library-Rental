

const dataProviders = [
    { dataProvider: user_dataprovider, resources: "users"},
    { dataProvider: items_dataprovider, resources: "items"},
    { dataProvider: transaction_dataprovider, resources: "transactions"}, 
  ];
  

export default (type, resource, params) => {
    const expected_provider = dataProviders.find(dp => dp.resources == resource);
    return expected_provider.dataProvider(type, resource, params);
};
  

  