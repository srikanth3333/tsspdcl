import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getTsnBilled} from "../../redux/tsnBilled/tsnBilledSlice";
import Head from 'next/head';
import TableData from "../../components/TableData";
import FilterCard from "../../components/FilterCard";


const Index = () => {

    let data = useSelector((state) => state.tsnBilled)
    const user = useSelector((state) => state.users);

    let dataEro = user.logData?.eroList?.toString()
    
    let dispatch = useDispatch()

    let apiObject = {eroList:dataEro,sectionList:"",prsStatus:'',prvStatus:'',mobileNo:'',groupBy:'section'}

    useEffect(() => {
      dispatch(getTsnBilled(apiObject))
    }, [dispatch])

    
    return (
          <div>
            <Head>
              <title>TSNPDCL Billed</title>
              <meta name="description" content="Powerthon" />
            </Head>
            <div className="count-card">
              <div className="card mt-3">
                <div className="card-body">
                    <FilterCard 
                      objectData={apiObject}
                      paginateApi={getTsnBilled}
                      download={false}
                      dataDownload={data.data}
                      data={[
                        {label:"Ero List",type:"text",value:"eroList", disabled:true},
                        {label:"Section List",type:"text",value:"sectionList"},
                        {label:"PRS Status List",type:"text",value:"prsStatus"},
                        {label:"PRV Status List",type:"text",value:"prvStatus"},
                        {label:"Mobile Number",type:"text",value:"mobileNo"},
                        {label:"Group By",type:"select",filterList:['section','ero','mobileNo'],
                         value:"groupBy",getKeys:true}
                      ]} 
                      title="TSNPDCL Billed"
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
