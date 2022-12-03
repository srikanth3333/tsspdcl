import {useEffect,useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getBilledCount} from "../redux/billedCount/billedCountSlice";
import Link from 'next/link';
import Head from 'next/head';
import TableData from "../components/TableData";
import FilterCard from "../components/FilterCard";
import CountCard from "../components/CountCard";


const Index = () => {

    let data = useSelector((state) => state.billCount)
    const user = useSelector((state) => state.users) 
    const [filterData,setFilterData] = useState([])
    
    let dispatch = useDispatch()

    let apiObject = {eroCode:"",billDate:"",mobileNo:""}

    useEffect(() => {
      dispatch(getBilledCount(apiObject))
      .then((res) => {
        filterMeterReader(apiObject)
      })
    }, [dispatch])  

  const filterMeterReader = (val) => {
    let filt = !val.mobileNo ? data.data : data.data.filter((item) => item.meterReader == val.mobileNo)
    setFilterData(filt)
  }

  const count = filterData.reduce((acc,d) => d.billCount + acc,0)
    
  return (
          <div>
            <Head>
              <title>Billed Count</title>
              <meta name="description" content="Powerthon" />
            </Head>
            <div className="count-card">
                <CountCard 
                    loading={data.loading}
                    data={[
                      {name:'Bill Count',count:count},
                    ]} />
              <div className="card mt-3">
                <div className="card-body">
                  
                    <FilterCard 
                      objectData={apiObject}
                      paginateApi={getBilledCount}
                      // flag={"Circle"}
                      data={[
                        {label:"ERO Code",type:"text",value:"eroCode"},
                        {label:"Bill Date",type:"date",value:"billDate"},
                        {label:"Mobile Number",type:"text",value:"mobileNo"},
                      ]} 
                      title="Billed Count"
                      filterApi={filterMeterReader}
                      filterApiStatus={true}
                    />
                    
                    <TableData 
                      data={filterData} 
                      link={false}
                      filters={{}}
                      paginate={false}
                      arrayData={[
                        {name:'eroCode',label:"Ero Code"},
                        {name:'billDate',label:"Bill Date"},
                        {name:'meterReader',label:"Meter Reader"},
                        {name:'billCount',label:"Bill Count"},
                      ]}
                    />
                </div>
              </div>
            </div>
          </div>
    );
}

export default Index;
