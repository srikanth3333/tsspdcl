import {useEffect} from 'react';
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
    
    let dispatch = useDispatch()

    let apiObject = {eroCode:"021",billDate:""}

    useEffect(() => {
      dispatch(getBilledCount(apiObject))
    }, [dispatch])
    

    return (
          <div>
            <Head>
              <title>Billed Count</title>
              <meta name="description" content="Powerthon" />
            </Head>
            <div className="count-card">
              <div className="card mt-3">
                <div className="card-body">
                    <FilterCard 
                      objectData={apiObject}
                      paginateApi={getBilledCount}
                      // flag={"Circle"}
                      data={[
                        {label:"ERO Code",type:"text",value:"eroCode"},
                        {label:"Bill Date",type:"date",value:"billDate"},
                      ]} 
                      title="Billed Count"
                    />
                    
                    <TableData 
                      data={data} 
                      link={false}
                      filters={{}}
                      paginate={false}
                    />
                </div>
              </div>
            </div>
          </div>
    );
}

export default Index;
