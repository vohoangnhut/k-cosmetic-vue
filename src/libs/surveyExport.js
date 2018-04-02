import  { PROVINCE, DISTRICT }  from './index'
import { saveAs } from 'file-saver';
import XLSX from 'xlsx';
import moment from 'moment';
import  _  from 'lodash';

const lstProvince = _.values(PROVINCE);
const lstDistrict = _.values(DISTRICT);
const fileName = 'export_' + moment().format('L LTS');


import  { 
    madapvienVakhuvuc,
    anhchidangla,
    thongtin,
    doituongpv,
    parseLoaiCam,
    findMaxArraySize,
    parseNhanCam,
    parseSoLuongNhanCam,
    parseDSTungLoaiCam,
    parseDSCamBanDuoc
 }  from './readCompany'

const loaicamkinhdoanh = (dataArray) => {
    let rsltArray = []
    for(let i=0; i < dataArray.length; i++) {
        let companyQuestion = dataArray[i].questions[1]
        companyQuestion = companyQuestion.filter(item => item.header == 'Phần Đại lý')[0]
        // console.log(companyQuestion)
        let answer = companyQuestion.details.map(item => ({
            selected: item.selected
        }))
        // console.log(answer)
        let _tmp = []
        for(let j=0; j < answer.length; j++) {
            if (answer[j].selected == true) {
                _tmp.push(j+1)
            } else {
                _tmp.push(-1)
            }
        }
        // console.log(_tmp)
        rsltArray.push(_tmp)
    }
}


export const exportSurvey = (data) => {

    data = data.filter(o => {
        if(!o.info || !o.questions || !o.completed)
            return false;
    
        return true
    });
    
    data = _.sortBy(data, [function(o) { return o.info.province; }])


    
        //let data = Object.values(raw).filter(item => item.questions && item.completed)
        //console.log(data)

         let rslt = []
         let typeGetting = 'phần đại lý';

        const madapvien_khuvuc = madapvienVakhuvuc(data)
        rslt.push(madapvien_khuvuc)
        //console.log('madapvien_khuvuc', madapvien_khuvuc)

        const acdangla = anhchidangla(data)
        rslt.push(acdangla)
        //console.log('acdangla', acdangla)

        const thtin = thongtin(data)
        rslt.push(thtin)
        //console.log('thongtin', thtin)

        const doituong = doituongpv(data)
        rslt.push(doituong)
        //console.log('doituong', doituong)

        
        let mergeFromCell = 16;

        ///=========================================================================================///
        const loaicam = parseLoaiCam(data, mergeFromCell, typeGetting)
        rslt.push(loaicam)
        //console.log('Loaicams', loaicam)

        mergeFromCell = mergeFromCell + (loaicam.header ? (loaicam.header.length) : 0);
        const nhancam = parseNhanCam(data, mergeFromCell, typeGetting)
        rslt.push(nhancam)
        //console.log('Nhan cam', nhancam)

        mergeFromCell = mergeFromCell + (nhancam.header ? (nhancam.header.length) : 0);
        const soluongnhancam = parseSoLuongNhanCam(data, mergeFromCell, typeGetting)
        rslt.push(soluongnhancam)
        //console.log('So luong nhan cam', soluongnhancam)

        mergeFromCell = mergeFromCell + (soluongnhancam.header ? soluongnhancam.header.length : 0);
        const dstungloaicam = parseDSTungLoaiCam(data, mergeFromCell, typeGetting)
        rslt.push(dstungloaicam)
        //console.log('DS tung loai cam', dstungloaicam)

        mergeFromCell = mergeFromCell + (dstungloaicam.header ? dstungloaicam.header.length : 0);      
        const dscambanduoc = parseDSCamBanDuoc(data, mergeFromCell, typeGetting)
        rslt.push(dscambanduoc)
        //onsole.log('DS cam ban duoc', dscambanduoc)

        //*********//
        


        typeGetting = 'phần trại trực tiếp';
        mergeFromCell = mergeFromCell + (dscambanduoc.header ? dscambanduoc.header.length : 0);      

        let startFirstRowSecondCell = mergeFromCell;

        const loaicam1 = parseLoaiCam(data, mergeFromCell, typeGetting)
        rslt.push(loaicam1)
        //console.log('Loaicams', loaicam)

        mergeFromCell = mergeFromCell + (loaicam1.header ? (loaicam1.header.length) : 0);
        const nhancam1 = parseNhanCam(data, mergeFromCell, typeGetting)
        rslt.push(nhancam1)
        //console.log('Nhan cam', nhancam)

        mergeFromCell = mergeFromCell + (nhancam1.header ? (nhancam1.header.length) : 0);
        const soluongnhancam1 = parseSoLuongNhanCam(data, mergeFromCell, typeGetting)
        rslt.push(soluongnhancam1)
        //console.log('So luong nhan cam', soluongnhancam)

        mergeFromCell = mergeFromCell + (soluongnhancam1.header ? soluongnhancam1.header.length : 0);
        const dstungloaicam1 = parseDSTungLoaiCam(data, mergeFromCell, typeGetting)
        rslt.push(dstungloaicam1)
        //console.log('DS tung loai cam', dstungloaicam)

        mergeFromCell = mergeFromCell + (dstungloaicam1.header ? dstungloaicam1.header.length : 0);      
        const dscambanduoc1 = parseDSCamBanDuoc(data, mergeFromCell, typeGetting)
        rslt.push(dscambanduoc1)
        //onsole.log('DS cam ban duoc', dscambanduoc)

        //console.log(rslt)

        let tContent = []
        let tHeader = []
        let tMergedata = []
        let tMergePostion = []
        let tMergedata_lv2 = []
        let tMergePostion_lv2 = []
        let itemLength = rslt[0].content.length //So Luong Cau Hoi ?

        for(let j=0; j < itemLength; j++) {
            let tmp = []
            for(let i=0; i < rslt.length; i++) {
                tmp.push(rslt[i].content[j])

                if (j == 0) {
                    tHeader.push(rslt[i].header)
                    tMergedata.push(rslt[i].mergeData)
                    if(rslt[i].mergePostion)
                        tMergePostion.push(rslt[i].mergePostion)

                    tMergedata_lv2.push(rslt[i].mergeDatalv2)
                    if(rslt[i].mergePostionlv2)
                        tMergePostion_lv2.push(rslt[i].mergePostionlv2)
                }
            }
            tContent.push(_.flatten(tmp))
        }

        const obj = {
            content: tContent,
            merge: tMergePostion,
            mergeData: _.flatten(tMergedata),
            mergelv2: _.flatten(tMergePostion_lv2),
            mergeDatalv2: _.flatten(tMergedata_lv2),
            org_header: tHeader,
            flat_header: _.flatten(tHeader)
        }

        console.log(obj)

        let fristRowMergeData = Array.apply(0, Array(obj.mergeData.length)).map(function(){return '';});
        fristRowMergeData[16] = 'PHẦN KINH DOANH';
        fristRowMergeData[startFirstRowSecondCell] = 'PHẦN TRẠI';

        let lstExport = [];
        lstExport = obj.content;
        lstExport.unshift(obj.flat_header)
        lstExport.unshift(obj.mergeDatalv2)//Second Row merge
        lstExport.unshift(obj.mergeData)//Lasted Row merge
        lstExport.unshift(fristRowMergeData)//First row merge

        //Merge cells
        let merge = obj.merge;
        merge.push({ s: {r:0, c:16}, e: {r:0, c: ( startFirstRowSecondCell - 1)}})
        merge.push({ s: {r:0, c:(startFirstRowSecondCell)}, e: {r:0, c: (obj.mergeData.length - 1)}})

        //Merge Cells Level 2
        for(let i=0; i < obj.mergelv2.length; i++) {
            merge.push(obj.mergelv2[i]);
        }
        
        const ws = XLSX.utils.aoa_to_sheet(obj.content);
        /* add merges */
        if(!ws['!merges']) ws['!merges'] = [];
        ws['!merges'] = merge;

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Raw data');
        const wbout = XLSX.write(wb, {type:'array', bookType:'xlsx'});
        saveAs(new Blob([wbout],{type:'application/octet-stream'}), fileName +'.xlsx');

}
