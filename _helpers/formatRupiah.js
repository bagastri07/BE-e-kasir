/**
 *
 * @param {Number} money Number that you want to convert to Rupiah 
 */

const formatRupiah = (money) => {
    return new Intl.NumberFormat('id-ID',
      { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }
    ).format(money);
 }

 module.exports = formatRupiah