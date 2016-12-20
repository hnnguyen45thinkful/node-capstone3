//model
var cachedItems = [];
var List = {};
var existingList = false;
var clearModels = function(){
    cachedItems.length = 0;
    List = {};
    existingList = false;
};
//controller
var createItem = function(item, price){
    return {item: {name: item, price: price}};
};
var calculate = function(price, multiplyer) {
    return price * multiplyer;
};
var cacheItem = function(item){
    cachedItems.push(item);
};
var removeFromCache = function(id){
    for (var x = 0; x < cachedItems.length; x++) {
        if (cachedItems[x]._id == id) {
            deleteFromDB(cachedItems[x]._id);
            cachedItems.splice(x, 1);
        }
    }
};
// ENDPOINTS
// GET endpoint
var getCategory = function(name){
    var ajax = $.ajax('/category/' + name, {
        type: 'GET',
        dataType: 'json',
        // data: data,
        contentType: 'application/json'
    });
    ajax.done(  function  (result)    {
        $('#delete-category').show();
        displayCategoryName(result._id, result.name);
        for (var indx = 0; indx<result.items.length; indx++){
            var x = result.items[indx];
            displayItem(x._id, x.item.name, x.item.price);
        }
    });
};
// POST ENDPOINTS
var postCategoryName = function(name){
    var ajax = $.ajax('/category', {
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify(name),
        contentType: 'application/json'
    });
    ajax.done(function(result){
        cacheItem(result);
        displayCategoryName(result._id, result.name);
    });
}
var postItem = function(id, item){
    var ajax = $.ajax('/item/'+id, {
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify(item),
        // data: JSON.stringify(item),
        contentType: 'application/json'
    });
    ajax.done(function(result){
        console.log("I'm " + result);
        cacheItem(result);
        displayItem(result._id, result.item.name, result.item.price);
    });
}