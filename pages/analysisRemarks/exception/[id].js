import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAnalysisException} from "../../../redux/analysisRemarks/analysisException";
import Link from 'next/link';
import Head from 'next/head';
import TableData from "../../../components/TableData";
import FilterCard from "../../../components/FilterCard";
import CountCard from "../../../components/CountCard";
import { useRouter } from 'next/router';
import {exceptionNames} from "../../../utils/expNames";

const Index = () => {

    let data = useSelector((state) => state.analysisException)
    
    let dispatch = useDispatch()
    const router = useRouter()
    const { id } = router.query
    let apiObject = {exception:id,startDate:'',endDate:''}

    useEffect(() => {
      dispatch(getAnalysisException(apiObject))
    }, [dispatch])

    
    return (
          <div>
            <Head>
              <title>Exceptions</title>
              <meta name="description" content="Powerthon" />
            </Head>
            <div className="count-card">
              <div className="card mt-3">
                <div className="card-body">
                  <FilterCard 
                      objectData={apiObject}
                      paginateApi={getAnalysisException}
                      download={false}
                      dataDownload={data.data}
                      data={[
                        {label:"Start Date",type:"date",value:"startDate"},
                        {label:"End Date",type:"date",value:"endDate"},
                        {label:"Exception",type:"select",filterList:['Incorrect Parameter','Incorrect Reading','Invalid Image','Meter Mismatch','Parameter is unclear','Spoof','Unclear Image'],
                        value:"exception",getKeys:true}
                      ]} 
                      title=""
                    />
                    <p className="mt-2"><b>Note:</b> Only top 20 data shown in below table.</p>
                    <TableData 
                      data={data.data} 
                      link={false}
                      loading={data}
                      filters={{}}
                      paginate={false}
                      deleteOption={false}
                      arrayData={[
                        {name:'consumerCount',label:"Consumer Count"},
                        {name:'mobileNo',label:"Mobile No"},
                        {name:'IP',label:"Incorrect Parameter",linkPage:"/analysisRemarks/summary/"},
                        {name:'IR',label:"Incorrect Reading",linkPage:"/analysisRemarks/summary/"},
                        {name:'II',label:"Invalid Image",linkPage:"/analysisRemarks/summary/"},
                        {name:'MM',label:"Meter Mismatch",linkPage:"/analysisRemarks/summary/"},
                        {name:'OK',label:"OK",linkPage:"/analysisRemarks/summary/"},
                        {name:'PU',label:"Parameter is unclear",linkPage:"/analysisRemarks/summary/"},
                        {name:'SP',label:"Spoof",linkPage:"/analysisRemarks/summary/"},
                        {name:'UI',label:"Unclear Image",linkPage:"/analysisRemarks/summary/"},
                      ]}
                    />
                </div>
              </div>
            </div>
          </div>
    );
}

export default Index;
