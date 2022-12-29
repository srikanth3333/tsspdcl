import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getTsnBilledData} from "../../redux/tsnBilled/tsnDataSlice";
import Head from 'next/head';
import TableData from "../../components/TableData";
import FilterCard from "../../components/FilterCard";


const Index = () => {

    let data = useSelector((state) => state.tsnData)
    const user = useSelector((state) => state.users) 
    
    let dispatch = useDispatch()

    let dataEro = user.logData?.eroList?.toString();

    let apiObject = {eroList:dataEro,sectionList:"",prsStatus:'',prvStatus:'',mobileNo:''}

    useEffect(() => {
      dispatch(getTsnBilledData(apiObject))
    }, [dispatch])

    
    return (
          <div>
            <Head>
              <title>TSNPDCL Data Billed</title>
              <meta name="description" content="Powerthon" />
            </Head>
            <div className="count-card">
              <div className="card mt-3">
                <div className="card-body">
                    <FilterCard 
                      objectData={apiObject}
                      paginateApi={getTsnBilledData}
                      download={false}
                      dataDownload={data.data}
                      data={[
                        {label:"Ero List",type:"text",value:"eroList"},
                        {label:"Section List",type:"text",value:"sectionList"},
                        {label:"PRS Status List",type:"text",value:"prsStatus"},
                        {label:"PRV Status List",type:"text",value:"prvStatus"},
                        {label:"Mobile Number",type:"text",value:"mobileNo"},
                      ]} 
                      title="TSNPDCL Data Billed"
                    />
                    <TableData 
                      data={data.data} 
                      link={false}
                      loading={data}
                      filters={{}}
                      paginate={false}
                      deleteOption={false}
                    />
                </div>
              </div>
            </div>
          </div>
    );
}

export default Index;
