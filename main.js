const dataBase = [
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

function printReceipt(barcodes) {
    let cartList = countCartListNum(barcodes);
    let cartInfo = getCartInfo(cartList);
    let cartInfoWithSubtotal = getCartInfoWithSubtotal(cartInfo);
    let total = getCartTotal(cartInfoWithSubtotal);
    let receipt = formatReceipt(cartInfoWithSubtotal,total);

    console.log(receipt);
}

function countCartListNum(barcodes){
    let CartListNum = new Map();

    for(barCodeIndex in barcodes){
        if(CartListNum.has(barcodes[barCodeIndex])){
            let curItemQuantity = CartListNum.get(barcodes[barCodeIndex]);
            CartListNum.set(barcodes[barCodeIndex],curItemQuantity+1);
        }
        else{
            CartListNum.set(barcodes[barCodeIndex],1);
        }
    }
    return CartListNum;
}

function getCartInfo(cartList) {
    let cartInfo = new Array();
    for (var [itemBarcode, itemQuantity] of cartList) {
        for(dataBaseIndex in dataBase){
            if(itemBarcode == dataBase[dataBaseIndex].barcode){
                cartInfo.push({
                    name: dataBase[dataBaseIndex].name,
                    quantity: itemQuantity,
                    unitPrice: dataBase[dataBaseIndex].price
                })
            }
        }
    }
    return cartInfo;
}

function getCartInfoWithSubtotal(cartInfo){
    for(cartInfoIndex in cartInfo){
        let itemSubTotal= cartInfo[cartInfoIndex].quantity * cartInfo[cartInfoIndex].unitPrice;
        cartInfo[cartInfoIndex].subTotal=itemSubTotal;
    }
    return cartInfo ;
}

function getCartTotal(cartInfoWithSubtotal){
    let total = 0;
    for(cartIndex in cartInfoWithSubtotal){
        total += (cartInfoWithSubtotal[cartIndex].subTotal);
    }
    return total;
}

function formatReceipt(cartInfoWithSubtotal,total){
    let str='';
    let newLine='\n'
    str = newLine +'***<store earning no money>Receipt ***' + newLine;
    for(cartIndex in cartInfoWithSubtotal){
        str = str + 'Name: ' + cartInfoWithSubtotal[cartIndex].name + ', ';
        str = str + 'Quantity: ' + cartInfoWithSubtotal[cartIndex].quantity + ', ';
        str = str + 'Unit price: ' + cartInfoWithSubtotal[cartIndex].unitPrice + ' (yuan), ';
        str = str + 'Subtotal: ' + cartInfoWithSubtotal[cartIndex].subTotal + ' (yuan)' + newLine;
    }
    str = str + '----------------------' + newLine;
    str = str + 'Total: ' + total + ' (yuan)' + newLine;
    str = str + '**********************';

    return str;
}

module.exports = {
    printReceipt
};