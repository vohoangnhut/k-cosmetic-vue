// const FIREBASE_CONFIG = {
//     apiKey: 'AIzaSyBDiWbU4KCPy-quxGgKeirgg4glz3wNK4Y',
//     authDomain: 'masan-census.firebaseapp.com',
//     databaseURL: 'https://masan-census.firebaseio.com',
//     projectId: 'masan-census',
//     storageBucket: 'masan-census.appspot.com',
//     messagingSenderId: '690428375880'
// }
// firebase.initializeApp(FIREBASE_CONFIG);

import  { PROVINCE, DISTRICT }  from './index'
import  _  from 'lodash';
const lstProvince = _.values(PROVINCE);
const lstDistrict = _.values(DISTRICT);

export const madapvienVakhuvuc = (data) => {
    let pad = '00000';
    let lastedProvice = '';
    let seq = 1;

    let rslt = []
    
    for(let i=0; i < data.length; i++) {
        
        let tmp = ['','']
        if (data[i].info) {
            let q = data[i].info

            //Ma Dap Vien
            let provinceObj = _.find(lstProvince, (o)=>{
                return o.name_with_type === q.province;
            });
            if(lastedProvice !== provinceObj.name_with_type){
                seq = 1;
                lastedProvice = provinceObj.name_with_type;
            }else{
                seq += 1;
            }
            let strSeq = '' + seq;
            tmp[0] = provinceObj.sequence + (pad.substring(0, pad.length - strSeq.length) + strSeq)
            tmp[1] = provinceObj.sequence
            rslt.push(tmp)
        } else {
            rslt.push(tmp)
        }       
    }
    // console.log(rslt)
    let header = ['Mã đáp viên','Khu vực thực hiện?']

    let mergeData = [];
    let mergeLv2Data = [];
    for(let i=0; i < header.length; i++) {
        mergeData.push('')
        mergeLv2Data.push('')
    }

    return {
        mergeDatalv2: mergeLv2Data,
        mergePostionlv2: null,
        mergeData: mergeData,
        mergePostion :  null,
        header: header,
        content: rslt
    }

}

export const anhchidangla = (data) => {
    let rslt = []
    for(let i=0; i < data.length; i++) {
        let q = data[i].questions[5]
        q = q.map(child => child.details)[0]
        // console.log(q)
        let tmp = ['']
        for(let j=0; j < q.length; j++) {
            if (q[j].selected) {
                tmp[0] = j+1
            } 
            // else {
            //     tmp.push(-1)
            // }
        }
        rslt.push(tmp)
    }
    // console.log(rslt)
    let header = ['Hiện nay anh chị đang là']
    // for(let i=0; i < rslt[0].length; i++) {
    //     header.push('Loại cám đang kinh doanh ' + (i+1))
    // }
    // console.log(header)

    return {
        mergeDatalv2: [''],
        mergePostionlv2: null,
        mergeData: [''],
        mergePostion :  null,
        header: header,
        content: rslt
    }
}

export const thongtin = (data) => {
    let rslt = []
    
    for(let i=0; i < data.length; i++) {
        let tmp = ['','','','','','','','','','']
        if (data[i].info) {
            let q = data[i].info
            // console.log(q)
            tmp[0] = q.name
            tmp[1] = q.owner
            tmp[2] = q.phone
            tmp[3] = q.phoneOfName
            tmp[4] = q.addr_num
            tmp[5] = q.stress
            tmp[6] = q.ward
            tmp[7] = q.district
            tmp[8] = q.province

            if (data[i].location) {
                let l = data[i].location
                tmp[9] = l.latitude + ',' + l.longitude
            }else{ 
                tmp[9] = '';
            }

            if (data[i].photos) {
                let p = data[i].photos
                tmp[10] = p[0] ? p[0].uri : '';
                tmp[11] = p[1] ? p[1].uri : '';
            }else {
                tmp[10] = '';
                tmp[11] = '';
            }
            rslt.push(tmp)
        } else {
            rslt.push(tmp)
        }       
    }
    // console.log(rslt)
    let header = ['Tên đại lý/ trại','Tên người được phỏng vấn','SĐT','SĐT Đại lý/Trại','Số nhà/ Tổ','Đường/ Ấp/ Thôn/ Khu Phố','Phường/Xã','Quận/Huyện','Tỉnh/Thành phố','Vị Trí','Hình 1','Hình 2']
    
    let mergeData = [];
    let mergeLv2Data = [];
    for(let i=0; i < header.length; i++) {
        mergeData.push('')
        mergeLv2Data.push('')
    }

    return {
        mergeDatalv2: mergeLv2Data,
        mergePostionlv2: null,
        mergeData: mergeData,
        mergePostion :  null,
        header: header,
        content: rslt
    }
}

export const doituongpv = (data) => {
    let rslt = []
    for(let i=0; i < data.length; i++) {
        let q = data[i].questions[0]
        q = q.map(child => child.details)[0]
        // console.log(q)
        let tmp = ['']
        for(let j=0; j < q.length; j++) {
            if (q[j].selected) {
                tmp[0] = j+1
            } 
            // else {
            //     tmp.push(-1)
            // }
        }
        rslt.push(tmp)
    }
    // console.log(rslt)
    let header = ['Đối tượng phỏng vấn là']
    // for(let i=0; i < rslt[0].length; i++) {
    //     header.push('Loại cám đang kinh doanh ' + (i+1))
    // }
    // console.log(header)
    return {
        mergeData: [''],
        mergePostion :  null,
        header: header,
        content: rslt
    }
}

export const parseLoaiCam = (data, cellMerge, type) => {
    let rslt = []
    for(let i=0; i < data.length; i++) {
        let q = data[i].questions[1]
        q = q.filter(item => item.header.toLowerCase() == type).map(child => child.details)[0]
        // console.log(q)
        let tmp = []
        for(let j=0; j < q.length; j++) {
            if (q[j].selected) {
                tmp.push(j+1)
            } 
            // else {
            //     tmp.push(-1)
            // }
        }
        rslt.push(tmp)
        let maxSize = findMaxArraySize(rslt)
        // console.log(maxSize)
        for(let i=0; i < rslt.length; i++) {
            for(let j=0; j < (maxSize - rslt[i].length); j++) {
                rslt[i].push('')
            }
        }

    }
    // console.log(rslt)
    
    let header = []
    for(let i=0; i < rslt[0].length; i++) {
        header.push('Loại cám đang kinh doanh ' + (i+1))
    }

    let mergeData = [];
    let mergeLv2Data = [];
    for(let i=0; i < header.length; i++) {
        if(mergeData.length === 0) mergeData.push('NHÃN HIÊU CÁM ĐANG KINH DOANH')
        else mergeData.push('')
        mergeLv2Data.push('')
    }

    return {
        mergeDatalv2: mergeLv2Data,
        mergePostionlv2: null,
        mergeData: mergeData,
        mergePostion :  { s: {r:1, c:cellMerge}, e: {r:2, c: (cellMerge + header.length - 1)}},
        header: header,
        content: rslt
    }
}

export const findMaxArraySize = (array) => {
    let max = 0
    for(let i=0; i < array.length; i++) {
        if (array[i].length > max) max = array[i].length
    }
    return max
}

export const parseNhanCam = (data, cellMerge, type) => {
    let d = data[0].questions[2].filter(item => item.header.toLowerCase() == type).map(e => ({id: e.id, ref: e.ref[0]}))
    for(let i=0; i < d.length; i++) {
        d[i].name = d[i].ref.indexOf('heo') > -1 ? 'HEO' : (d[i].ref.indexOf('ga') > -1 ? 'GÀ' : (d[i].ref.indexOf('vit') > -1 ? 'VỊT' : 'CÚT'))
    }
    // console.log(d)
    const ids = d.map(e => e.id) //['34QWU6Z3WTO', '2FSQUMPQKLH', '3J0AOJHQKFP', '6DWNFQIYB1']
    let map = {}
    for(let i=0; i < d.length; i++) {
        map[d[i].id] = d[i].name
    }
    // const map = {'34QWU6Z3WTO': 'HEO', '2FSQUMPQKLH': 'GÀ', '3J0AOJHQKFP': 'VỊT', '6DWNFQIYB1': 'CÚT'}


    let array = []
    ids.forEach(id => {
        let rslt = []
        for(let i=0; i < data.length; i++) {
            let q = data[i].questions[2]
            q = _.cloneDeep(q.filter(item => item.id == id).map(child => child.details))
            q.forEach(item => {
                item = item.shift()
            })
            q = _.flatten(q)
            // console.log(q)
            let tmp = []
            for(let j=0; j < q.length; j++) {
                if (q[j].selected) {
                    tmp.push(j+1)
                } 
                // else {
                //     tmp.push(-1)
                // }
            }
            rslt.push(tmp)
            let maxSize = findMaxArraySize(rslt)
            // console.log(maxSize)
            for(let i=0; i < rslt.length; i++) {
                for(let j=0; j < (maxSize - rslt[i].length); j++) {
                    rslt[i].push('')
                }
            }
        }

        // console.log(rslt)
        
        let header = []
        for(let i=0; i < rslt[0].length; i++) {
            header.push('Anh/ Chị đang bán những NHÃN HIỆU CÁM ' + map[id] + ' CỦA CÔNG TY?')
        }
        // console.log(header)
       
        array.push({
            header: header,
            content: rslt
        })    
    })

    let tContent = []
    let tHeader = []

    //Merge level 2
    let mergeLv2Data = [];
    let mergeLv2Postion = [];
    let beginLv2Merge = cellMerge;

    let itemLength = array[0].content.length
    for(let j=0; j < itemLength; j++) {
        let tmp = []
        for(let i=0; i < array.length; i++) {
            tmp.push(array[i].content[j])

            if (j == 0) {
                tHeader.push(array[i].header)
                
                //Merge cell level 2
                let mercel = []
                for(let k = 0; k < array[i].header.length; k++){

                    let text = '';
                    if(i===0){
                        text = 'CÁM CHO HEO';
                    }else if(i===1){
                        text = 'CÁM CHO GÀ';
                    }else if(i===2){
                        text = 'CÁM CHO VỊT';
                    }else{
                        text = 'CÁM CHO CÚT';
                    }

                    if(mercel.length === 0) mercel.push(text);
                    else mercel.push('')
                }

                if(mercel.length > 0){
                    mergeLv2Data.push(_.flatten(mercel));
                    mergeLv2Postion.push( { s: {r:2, c:beginLv2Merge}, e: {r:2, c: (beginLv2Merge + mercel.length - 1)}} )
                    beginLv2Merge += mercel.length;
                }
                
            }
        }
        tContent.push(_.flatten(tmp))
    }

    let header = _.flatten(tHeader);
    let mergeData = [];
    for(let i=0; i < header.length; i++) {
        if(mergeData.length === 0) mergeData.push('NHÃN HIÊU CÁM ĐANG KINH DOANH')
        else mergeData.push('')
    }

    // return array
    return {
        mergeDatalv2: _.flatten(mergeLv2Data),
        mergePostionlv2: mergeLv2Postion,
        mergeData: mergeData,
        mergePostion :  { s: {r:1, c:cellMerge}, e: {r:1, c: (cellMerge + header.length - 1)}},
        content: tContent,
        header: header
    }
}

export const parseSoLuongNhanCam = (data, cellMerge, type) => {
    let d = data[0].questions[2].filter(item => item.header.toLowerCase() == type).map(e => ({id: e.id, ref: e.ref[0]}))
    for(let i=0; i < d.length; i++) {
        d[i].name = d[i].ref.indexOf('heo') > -1 ? 'HEO' : (d[i].ref.indexOf('ga') > -1 ? 'GÀ' : (d[i].ref.indexOf('vit') > -1 ? 'VỊT' : 'CÚT'))
    }
    // console.log(d)
    const ids = d.map(e => e.id) //['34QWU6Z3WTO', '2FSQUMPQKLH', '3J0AOJHQKFP', '6DWNFQIYB1']
    let map = {}
    for(let i=0; i < d.length; i++) {
        map[d[i].id] = d[i].name
    }
    // const map = {'34QWU6Z3WTO': 'HEO', '2FSQUMPQKLH': 'GÀ', '3J0AOJHQKFP': 'VỊT', '6DWNFQIYB1': 'CÚT'}

    let array = []
    ids.forEach(id => {
        let rslt = []
        for(let i=0; i < data.length; i++) {
            let q = data[i].questions[2]
            q = _.cloneDeep(q.filter(item => item.id == id).map(child => child.details))
            let sumQ = 0
            q.forEach(item => {
                sumQ = item[0].extra_data
                // console.log(sumQ)
                item = item.shift()
            })
            q = _.flatten(q)
            // console.log(q)
            let tmp = []
            for(let j=0; j < q.length; j++) {
                tmp.push(q[j].extra_data)
                // if (q[j].selected) {
                //     tmp.push(j+1)
                // } 
                // else {
                //     tmp.push(-1)
                // }
            }
            tmp.push(sumQ)
            rslt.push(tmp)
            // let maxSize = findMaxArraySize(rslt)
            // // console.log(maxSize)
            // for(let i=0; i < rslt.length; i++) {
            //     for(let j=0; j < (maxSize - rslt[i].length); j++) {
            //         rslt[i].push(-1)
            //     }
            // }
        }

        // console.log(rslt)
        let q = data[0].questions[2]
            q = _.cloneDeep(q.filter(item => item.id == id).map(child => child.details))
            q.forEach(item => {
                item = item.shift()
            })
            q = _.flatten(q)
        // console.log(q)
        let header = []
        for(let i=0; i < q.length; i++) {
            header.push('Số tấn cám ' + map[id] + ' ' + q[i].content)
        }
        header.push('Tổng Doanh Số')
        // console.log(header)
        array.push({
            header: header,
            content: rslt
        })
    })

    let tContent = []
    let tHeader = []
    let mergeLv2Data = []
    let mergeLv2Postion = []
    let beginLv2Merge = cellMerge;
    let itemLength = array[0].content.length
    
    for(let j=0; j < itemLength; j++) {
        let tmp = []
        for(let i=0; i < array.length; i++) {
            tmp.push(array[i].content[j])

            if (j == 0) {
                tHeader.push(array[i].header)

                //Merge cell level 2
                let mercel = []
                for(let k = 0; k < array[i].header.length; k++){

                    let text = '';
                    if(i===0){
                        text = 'DOANH SỐ TỪNG NHÃN HIỆU CÁM HEO';
                    }else if(i===1){
                        text = 'DOANH SỐ TỪNG NHÃN HIỆU CÁM GÀ';
                    }else if(i===2){
                        text = 'DOANH SỐ TỪNG NHÃN HIỆU CÁM VỊT';
                    }else{
                        text = 'DOANH SỐ TỪNG NHÃN HIỆU CÁM CÚT';
                    }

                    if(mercel.length === 0) mercel.push(text);
                    else mercel.push('')
                }

                if(mercel.length > 0){
                    mergeLv2Data.push(_.flatten(mercel));
                    mergeLv2Postion.push( { s: {r:2, c:beginLv2Merge}, e: {r:2, c: (beginLv2Merge + mercel.length - 1)}} )
                    beginLv2Merge += mercel.length;
                }
            }
        }
        tContent.push(_.flatten(tmp))
    }

    let header = _.flatten(tHeader);
    let mergeData = [];
    for(let i=0; i < header.length; i++) {
        if(mergeData.length === 0) mergeData.push('DOANH SỐ CÁC NHÃN HIÊU CÁM')
        else mergeData.push('')
    }

    // console.log(tContent)
    // console.log(tHeader)
    // return array
    return {
        mergeDatalv2: _.flatten(mergeLv2Data),
        mergePostionlv2: mergeLv2Postion,
        mergeData: mergeData,
        mergePostion :  { s: {r:1, c:cellMerge}, e: {r:1, c: (cellMerge + header.length - 1)}},
        content: tContent,
        header: header
    }
    // return array
}

export const parseDSTungLoaiCam = (data, cellMerge, type) => {
  
        let rslt = []
        let header = []
        
        for(let i=0; i < data.length; i++) {
            let q = _.cloneDeep(data[i].questions[3])
            q = q.filter(item => item.header.toLowerCase() == type) //q.slice(0, 116)
            //console.log(q)
            let tmp = []
            for(let j=0; j < q.length; j++) {
                const brandName = q[j].content.split('$')[1]
                // console.log(brandName)
                for(let k=0; k < q[j].details.length; k++) {
                    let content = q[j].details[k].content.split(' ')
                    content.shift()
                    content = content.join(' ')
                    const childHeader = 'Doanh thu đang chiếm của ' + brandName + ' ' + content
                    
                    if (i == 0) {
                        header.push(childHeader)
                    }

                    tmp.push(q[j].details[k].extra_data)
                }
            }

            rslt.push(tmp)
     
        }

        let mergeLv2Data = []
        let mergeLv2Postion = []
        let beginLv2Merge = cellMerge; //87 + 58 + 58 + 58
        
        mergeLv2Postion.push( { s: {r:2, c:beginLv2Merge}, e: {r:2, c: (beginLv2Merge + 86)}} )
        beginLv2Merge += 87;
        mergeLv2Postion.push( { s: {r:2, c:beginLv2Merge}, e: {r:2, c: (beginLv2Merge + 57)}} )
        beginLv2Merge += 58;        
        mergeLv2Postion.push( { s: {r:2, c:beginLv2Merge}, e: {r:2, c: (beginLv2Merge + 57)}} )
        beginLv2Merge += 58;        
        mergeLv2Postion.push( { s: {r:2, c:beginLv2Merge}, e: {r:2, c: (beginLv2Merge + 57)}} )
   

        let mergeData = [];
        for(let i=0; i < header.length; i++) {
            if(mergeData.length === 0) mergeData.push('DOANH SỐ TỪNG LOẠI CÁM')
            else mergeData.push('')

            if(mergeLv2Data.length === 0) 
                mergeLv2Data.push('CÁM HEO')
            else if(mergeLv2Data.length === 87) 
                mergeLv2Data.push('CÁM GÀ')
            else if(mergeLv2Data.length === 145) //87+58 
                mergeLv2Data.push('CÁM VỊT')
            else if(mergeLv2Data.length === 203) 
                mergeLv2Data.push('CÁM CÚT')
            else mergeLv2Data.push('')
        }

        return {
            mergeDatalv2: mergeLv2Data,
            mergePostionlv2: mergeLv2Postion,
            mergeData: mergeData,
            mergePostion :  { s: {r:1, c:cellMerge}, e: {r:1, c: (cellMerge + header.length - 1)}},
            content: rslt,
            header: header
        }
}

export const parseDSCamBanDuoc = (data, cellMerge, type) => {
  
    let rslt = []
    let header = []
    let mergeLv2Data = []
    let mergeLv2Postion = []
    let beginLv2Merge = cellMerge;
    let headerFormat = ['Tổng Doanh Số', 'Nhập từ công ty', 'Mua từ đại lý cấp 1']
    for(let i=0; i < data.length; i++) {
        let q = _.cloneDeep(data[i].questions[4])
        q = q.filter(item => item.header.toLowerCase() == type)
        // console.log(q)
        let tmp = []
        for(let j=0; j < q.length; j++) {
            for(let k=0; k < q[j].details.length; k++) {
                tmp.push(q[j].details[k].extra_data)
            }
            if (i == 0) {
                header.push(headerFormat)

                 // //Merge cell level 2
                let mercel = []
                for(let idx = 0; idx < headerFormat.length; idx++){

                    let text = '';
                    if(j===0){
                        text = 'CÁM HEO';
                    }else if(j===1){
                        text = 'CÁM GÀ';
                    }else if(j===2){
                        text = 'CÁM VỊT';
                    }else{
                        text = 'CÁM CÚT';
                    }

                    if(mercel.length === 0) mercel.push(text);
                    else mercel.push('')
                }

                if(mercel.length > 0){
                    mergeLv2Data.push(_.flatten(mercel));
                    mergeLv2Postion.push( { s: {r:2, c:beginLv2Merge}, e: {r:2, c: (beginLv2Merge + mercel.length - 1)}} )
                    beginLv2Merge += mercel.length;
                }
            }
        }
        rslt.push(tmp)
    }

    let headerFlat = _.flatten(header);
    let mergeData = [];
    for(let i=0; i < headerFlat.length; i++) {
        if(mergeData.length === 0) mergeData.push('DOANH SỐ CÁM BÁN ĐƯỢC 12/2016')
        else mergeData.push('')
    }

    return {
        mergeDatalv2: _.flatten(mergeLv2Data),
        mergePostionlv2: mergeLv2Postion,
        mergeData: mergeData,
        mergePostion :  { s: {r:1, c:cellMerge}, e: {r:1, c: (cellMerge + headerFlat.length - 1)}},
        content: rslt,
        header: headerFlat
    }
}


export const getBrandsOfCompany = (data, type) => {
    let d = data[0].questions[2].filter(item => item.header.toLowerCase() == type).map(e => ({id: e.id, ref: e.ref[0]}))
    for(let i=0; i < d.length; i++) {
        d[i].name = d[i].ref.indexOf('heo') > -1 ? 'HEO' : (d[i].ref.indexOf('ga') > -1 ? 'GÀ' : (d[i].ref.indexOf('vit') > -1 ? 'VỊT' : 'CÚT'))
    }
    // console.log(d)
    const ids = d.map(e => e.id) //['34QWU6Z3WTO', '2FSQUMPQKLH', '3J0AOJHQKFP', '6DWNFQIYB1']
    let map = {}
    for(let i=0; i < d.length; i++) {
        map[d[i].id] = d[i].name
    }
    // const map = {'34QWU6Z3WTO': 'HEO', '2FSQUMPQKLH': 'GÀ', '3J0AOJHQKFP': 'VỊT', '6DWNFQIYB1': 'CÚT'}


    let array = []
    ids.forEach(id => {
        let rslt = []
        for(let i=0; i < data.length; i++) {
            let q = data[i].questions[2]
            q = _.cloneDeep(q.filter(item => item.id == id).map(child => child.details))
            q.forEach(item => {
                item = item.shift()
            })
            q = _.flatten(q)
            // console.log(q)
            let tmp = []
            for(let j=0; j < q.length; j++) {
                if (q[j].selected) {
                    tmp.push(j+1)
                } 
                // else {
                //     tmp.push(-1)
                // }
            }
            rslt.push(tmp)
            let maxSize = findMaxArraySize(rslt)
            // console.log(maxSize)
            for(let i=0; i < rslt.length; i++) {
                for(let j=0; j < (maxSize - rslt[i].length); j++) {
                    rslt[i].push('')
                }
            }
        }

        // console.log(rslt)
        let header = []
        let name = []
        for(let i=0; i < rslt[0].length; i++) {
            header.push('Anh/ Chị đang bán những NHÃN HIỆU CÁM ' + map[id] + ' CỦA CÔNG TY?')
            name.push(map[id])
        }
        // console.log(header)

        array.push({
            name: name,
            header: header,
            content: rslt
        })    
    })

    // console.log(array)

    let tContent = []
    let tHeader = []
    let tName = []
    let itemLength = array[0].content.length
    
    for(let j=0; j < itemLength; j++) {
        let tmp = []
        for(let i=0; i < array.length; i++) {
            tmp.push(array[i].content[j])

            if (j == 0) {
                tHeader.push(array[i].header)
                tName.push(array[i].name)
            }
        }
        tContent.push(_.flatten(tmp))
    }

    // console.log(tContent)
    // console.log(tHeader)
    // return array
    return {
        content: tContent,
        name: tName,
        header: _.flatten(tHeader)
    }
}


export const getTongDanhSo = (data, type) => {
    let d = data[0].questions[2].filter(item => item.header.toLowerCase() == type).map(e => ({id: e.id, ref: e.ref[0]}))
    for(let i=0; i < d.length; i++) {
        d[i].name = d[i].ref.indexOf('heo') > -1 ? 'HEO' : (d[i].ref.indexOf('ga') > -1 ? 'GÀ' : (d[i].ref.indexOf('vit') > -1 ? 'VỊT' : 'CÚT'))
    }
    // console.log(d)
    const ids = d.map(e => e.id) //['34QWU6Z3WTO', '2FSQUMPQKLH', '3J0AOJHQKFP', '6DWNFQIYB1']
    let map = {}
    for(let i=0; i < d.length; i++) {
        map[d[i].id] = d[i].name
    }
    // const map = {'34QWU6Z3WTO': 'HEO', '2FSQUMPQKLH': 'GÀ', '3J0AOJHQKFP': 'VỊT', '6DWNFQIYB1': 'CÚT'}

    let array = []
    ids.forEach(id => {
        let rslt = []
        for(let i=0; i < data.length; i++) {
            let q = data[i].questions[2]
            q = _.cloneDeep(q.filter(item => item.id == id).map(child => child.details))
            let sumQ = 0
            q.forEach(item => {
                sumQ = parseInt(item[0].extra_data)
                // console.log(sumQ)
                item = item.shift()
            })
            q = _.flatten(q)
            // console.log(q)
            let tmp = []
            for(let j=0; j < q.length; j++) {
                tmp.push(parseInt(q[j].extra_data))
                // if (q[j].selected) {
                //     tmp.push(j+1)
                // } 
                // else {
                //     tmp.push(-1)
                // }
            }
            tmp.push(sumQ)
            rslt.push(tmp)
            // let maxSize = findMaxArraySize(rslt)
            // // console.log(maxSize)
            // for(let i=0; i < rslt.length; i++) {
            //     for(let j=0; j < (maxSize - rslt[i].length); j++) {
            //         rslt[i].push(-1)
            //     }
            // }
        }

        // console.log(rslt)
        let q = data[0].questions[2]
            q = _.cloneDeep(q.filter(item => item.id == id).map(child => child.details))
            q.forEach(item => {
                item = item.shift()
            })
            q = _.flatten(q)
        // console.log(q)
        let header = []
        for(let i=0; i < q.length; i++) {
            header.push('Số tấn cám ' + map[id] + ' ' + q[i].content)
        }
        header.push('Tổng Doanh Số')
        // console.log(header)
        array.push({
            header: header,
            content: rslt
        })
    })

    let tContent = []
    let tHeader = []
    let itemLength = array[0].content.length
    
    for(let j=0; j < itemLength; j++) {
        let tmp = []
        for(let i=0; i < array.length; i++) {
            tmp.push(array[i].content[j])

            if (j == 0) {
                tHeader.push(array[i].header)
            }
        }
        tContent.push(_.flatten(tmp))
    }

    // console.log(tContent)
    // console.log(tHeader)
    // return array
    return {
        content: tContent,
        header: _.flatten(tHeader)
    }
    // return array
}
