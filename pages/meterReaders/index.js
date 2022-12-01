import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getBilledCount} from "../../redux/billedCount/billedCountSlice";
import Link from 'next/link';
import Head from 'next/head';
import TableData from "../../components/TableData";
import FilterCard from "../../components/FilterCard";
import CountCard from "../../components/CountCard";


const Index = () => {

    let data = useSelector((state) => state.billCount)
    const user = useSelector((state) => state.users) 
    
    let dispatch = useDispatch()

    let apiObject = {eroCode:"",billDate:""}

    useEffect(() => {
      dispatch(getBilledCount(apiObject))
    }, [dispatch])  
    
  return (
          <div>
            <Head>
              <title>Meter Reader Status</title>
              <meta name="description" content="Powerthon" />
            </Head>
            <div className="count-card">
              <div className="card mt-3">
                <div className="card-body">
                    <FilterCard 
                      objectData={apiObject}
                      paginateApi={getBilledCount}
                      data={[
                        {label:"ERO Code",type:"text",value:"eroCode"},
                      ]} 
                      title="Meter Reader Status"
                    />
                    
                    <TableData 
                      data={data.meterReaderData} 
                      link={false}
                      filters={{}}
                      paginate={false}
                      arrayData={[
                        {name:'mobileNo',label:"Mobile Number"},
                        {name:'name',label:"Name"},
                        {name:'timestamp',label:"Last Updated"},
                        {name:'bl',label:"Battery Percentage"},
                        {name:'pendingCount',label:"Pending Sync"},
                        {name:'version',label:"App Version"},
                      ]}
                    />
                </div>
              </div>
            </div>
          </div>
    );
}

export default Index;
