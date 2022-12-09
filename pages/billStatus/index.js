import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getBillStatus} from "../../redux/billStatus/billStatusSlice";
import Link from 'next/link';
import Head from 'next/head';
import TableData from "../../components/TableData";
import FilterCard from "../../components/FilterCard";
import CountCard from "../../components/CountCard";


const Index = () => {

    let data = useSelector((state) => state.billStatus)
    const user = useSelector((state) => state.users) 
    
    let dispatch = useDispatch()

    let apiObject = {uscNo:"",serviceNo:"",meterNo:''}

    useEffect(() => {
      dispatch(getBillStatus(apiObject))
    }, [dispatch])


    
    return (
          <div>
            <Head>
              <title>Bill Status</title>
              <meta name="description" content="Powerthon" />
            </Head>
            <div className="count-card">
              <div className="card mt-3">
                <div className="card-body">
                    <FilterCard 
                      objectData={apiObject}
                      paginateApi={getBillStatus}
                      download={false}
                      dataDownload={data.data.data}
                      data={[
                        {label:"Service Number",type:"text",value:"serviceNo"},
                        {label:"USC No",type:"text",value:"uscNo"},
                        {label:"Meter No",type:"text",value:"meterNo"},
                      ]} 
                      title="Bill Status"
                    />
                    <h3 className="my-4 text-center">{data.data?.message?.toUpperCase()}</h3>
                    <TableData 
                      data={data.data.data} 
                      link={false}
                      loading={data}
                      filters={{}}
                      paginate={false}
                      deleteOption={data.data?.data?.length > 0 ? true : false}
                    />
                </div>
              </div>
            </div>
          </div>
    );
}

export default Index;
