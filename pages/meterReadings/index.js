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
                        {label:"Usc number",type:"text",value:"uidNo"},
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
                        {name:'uidNo',label:"Usc No"},
                        {name:'readingType',label:"Reading Type"},
                        {name:'valueType',label:"Parameter"},
                        {name:'finalValue',label:"Value"},
                        {name:'smallImg',label:"Image"},
                        {name:'timestamp',label:"Date",convert:true},
                        
                      ]}
                    />
                  
                </div>
              </div>
            </div>
          </div>
    );
}

export default Index;
