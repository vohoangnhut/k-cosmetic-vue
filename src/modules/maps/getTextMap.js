import  { 
    getBrandsOfCompany, getTongDanhSo
 }  from '../../libs/readCompany'
 import  { brands }  from '../../libs/index'

 export const getInfo = (item) => {

          let nhancamdaily = [];
          let nhancamtrai = [];
          let brandDaiLy = [];
          let brandTrai = [];
          let compnaySize = null; //0 nhỏ,1 vừa,2 lớn
          let tongDoanhSo = 0;
          if(item.questions)
          {
            nhancamdaily = getBrandsOfCompany([item] , 'phần đại lý')
            let seqno = 0;
            nhancamdaily.name.forEach((heogavitcut, index)=>{
              let type = '';
              let brandNm = '';

              if(heogavitcut){
                let firstCome = true;
                heogavitcut.forEach((value)=>{
                  if(firstCome){
                    type = 'CÁM ' + value;
                    firstCome = false;
                  }

                  if(value){
                    if(brands[index][(nhancamdaily.content[0][seqno] - 1)])
                      brandNm = brandNm + (brandNm.length > 0 ? ', ' : '') + brands[index][(nhancamdaily.content[0][seqno] - 1)];
                    seqno++;
                  }
                })
              }

              if(type){
                brandDaiLy.push(type + ': '+ brandNm)
                //console.log(type + ': '+ brandNm)
              }
            })


            nhancamtrai = getBrandsOfCompany([item] , 'phần trại trực tiếp')
            seqno = 0;
            nhancamtrai.name.forEach((heogavitcut, index)=>{
              let type = '';
              let brandNm = '';

              if(heogavitcut){
                let firstCome = true;
                heogavitcut.forEach((value)=>{
                  if(firstCome){
                    type = 'CÁM ' + value;
                    firstCome = false;
                  }

                  if(value){
                    if(brands[index][(nhancamtrai.content[0][seqno] -1)])
                      brandNm = brandNm + (brandNm.length > 0 ? ', ' : '') + brands[index][(nhancamtrai.content[0][seqno] -1)];
                    seqno++;
                  }
                })
              }

              if(type){
                brandTrai.push(type + ': '+ brandNm)
              }
            })
          }


          item.brandDaiLy = brandDaiLy;
          item.brandTrai = brandTrai;

          return item;

    }
