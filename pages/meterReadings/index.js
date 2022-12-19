import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getMeterReadings} from "../../redux/meterReadings/meterReadingsSlice";
import Head from 'next/head';
import TableData from "../../components/TableData";
import FilterCard from "../../components/FilterCard";


const Index = () => {

    let data = useSelector((state) => state.meterData)
    
    let dispatch = useDispatch()

    let apiObject = {uidNo:"",page:0}

    useEffect(() => {
      dispatch(getMeterReadings(apiObject))
    }, [dispatch])

    
    return (
          <div>
            <Head>
              <title>Meter Readings</title>
              <meta name="description" content="Powerthon" />
            </Head>
            <div className="count-card">
              <div className="card mt-3">
                <div className="card-body">
                    <FilterCard 
                      objectData={apiObject}
                      paginateApi={getMeterReadings}
                      download={false}
                      dataDownload={data.data}
                      data={[
                        {label:"Consumer Number",type:"text",value:"uidNo"},
                      ]} 
                      title="Meter Readings"
                    />
                    <TableData 
                      data={data.data} 
                      link={false}
                      loading={data}
                      filters={{}}
                      paginate={true}
                      deleteOption={false}
                      paginateApi={getMeterReadings}
                      apiObject={apiObject}
                      arrayData={[
                        {name:'mobileNo',label:"Meter Reader"},
                        {name:'uidNo',label:"Consumer No"},
                        {name:'readingType',label:"Reading Type"},
                        {name:'valueType',label:"Parameter"},
                        {name:'finalValue',label:"Value"},
                        {name:'smallImg',label:"Image"},
                        {name:'timestamp',label:"Date",convert:true},
                        
                      ]}
                    />
                    {/* {
    "_id": "djbwmHMcT-CQKO9zAR30rN_null_1671462162",
    "abnormalityStatus": "Everything is Ok",
    "barcodeList": [],
    "bigImg": "https://mrdt.s3.amazonaws.com/MeterReading/SBPDCL/239207129978/djbwmHMcT-CQKO9zAR30rN_null_bigImg_1671462161.jpg",
    "capCount": 0,
    "createdAt": "2022-12-19T15:02:43.704Z",
    "deviceId": "djbwmHMcT-CQKO9zAR30rN_null",
    "lat": "24.5306104",
    "lon": "86.4651148",
    "mobileNo": "6201339016",
    "readingType": "MANUAL",
    "smallImg": "https://mrdt.s3.amazonaws.com/MeterReading/SBPDCL/239207129978/djbwmHMcT-CQKO9zAR30rN_null_smallImg_1671462162.jpg",
    "subDiv": "",
    "timestamp": "1671462162",
    "uidNo": "239207129978",
    "updatedAt": "2022-12-19T15:02:46.106Z",
    "valueType": "Max_Demand",
    "bot_annotation": {
        "class": "spoof",
        "value": "",
        "param": ""
    },
    "remark": "Rescan",
    "scanRemark": "Spoof",
    "validator": "BoT",
    "actualValue": "0.9",
    "fullImg": "https://mrdt.s3.amazonaws.com/MeterReading/SBPDCL/239207129978/jpg/v9cdeo6osir_exImg_1671462163.jpg",
    "insights": {
        "referer": "in.coral.met",
        "p_serial": "20864230"
    },
    "bCode": "SBPDCL",
    "finalValue": "0.9"
} */}
                </div>
              </div>
            </div>
          </div>
    );
}

export default Index;
