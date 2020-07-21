const productList = [
    {
       barcode: 'ITEM000000',
       name: 'Coca-Cola',
       price: 3
     },
     {
       barcode: 'ITEM000001',
       name: 'Sprite',
       price: 3
     },
     {
       barcode: 'ITEM000002',
       name: 'Apple',
       price: 5
     },
     {
       barcode: 'ITEM000003',
       name: 'Litchi',
       price: 15
     },
     {
       barcode: 'ITEM000004',
       name: 'Battery',
       price: 2
     },
     {
       barcode: 'ITEM000005',
       name: 'Instant Noodles',
       price: 4
     }
 ];
 var cartItemDetails = new Array();
 var total=0;

function printReceipt(barcodes) {
    var count=countItems(barcodes);
    
    //getItemInfo
    for (i in barcodes) {
        var item=getItemInfo(barcodes[i])

        if(cartItemDetails.length==0){
            cartItemDetails.push(item);
        }
        else{
            for(i in cartItemDetails){
                if(cartItemDetails[i].name==item.name){
                    cartItemDetails[i].quantity++;
                }
                else if(i==(cartItemDetails.length-1)){
                    cartItemDetails.push(item);
                }
            }
        }
   }

   //getItemSubTotal
   for(i in cartItemDetails){
       var subTotal=getItemSubTotal(cartItemDetails[i]);
       cartItemDetails[i].subTotal=subTotal;
   }


   //getTotal
   for(i in cartItemDetails){
       total=total+getTotal(cartItemDetails[i]);
   }

   
   var str='';
   str='\n***<store earning no money>Receipt ***\n';
   for(i in cartItemDetails){
       str = str + 'Name: ' + cartItemDetails[i].name + ', ';
       str = str + 'Quantity: ' + cartItemDetails[i].quantity + ', ';
       str = str + 'Unit price: ' + cartItemDetails[i].unitPrice + ' (yuan), ';
       str = str + 'Subtotal: ' + cartItemDetails[i].subTotal + ' (yuan)\n';
   }
   str = str + '----------------------\n';
   str = str + 'Total: ' + total + ' (yuan)\n';
   str = str + '**********************';
   console.log(str);

}

function countItems(barcodes){
    return barcodes.length;
}

function getItemInfo(barcode){
    for (i in productList) {
        if(productList[i].barcode==barcode){
            return ({name: productList[i].name, quantity: 1, unitPrice:productList[i].price});
        }
   }
}

function getItemSubTotal(cartItemDetail){
    return cartItemDetail.quantity*cartItemDetail.unitPrice;
}
function getTotal(cartItemDetail){
    return cartItemDetail.subTotal;
}

module.exports = {
    printReceipt
};