import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAnalysisSummary} from "../../../redux/analysisRemarks/analysisSummary";
import Link from 'next/link';
import Head from 'next/head';
import TableData from "../../../components/TableData";
import FilterCard from "../../../components/FilterCard";
import CountCard from "../../../components/CountCard";
import { useRouter } from 'next/router';


const Index = () => {

    let data = useSelector((state) => state.analysisSummary)
    
    let dispatch = useDispatch()
    const router = useRouter()
    const { id } = router.query
    let apiObject = {mobileNo:id,page:0}

    useEffect(() => {
      dispatch(getAnalysisSummary(apiObject))
    }, [dispatch])

    
    return (
          <div>
            <Head>
              <title>Summary</title>
              <meta name="description" content="Powerthon" />
            </Head>
            <div className="count-card">
              <div className="card mt-3">
                <div className="card-body">
                    <TableData 
                      data={data.data} 
                      link={false}
                      loading={data}
                      filters={{}}
                      paginate={true}
                      deleteOption={false}
                      paginateApi={getAnalysisSummary}
                      apiObject={apiObject}
                      arrayData={[
                        {name:'mobileNo',label:"Mobile No"},
                        {name:'uidNo',label:"Uid No"},
                        {name:'serialNo',label:"Serial No"},
                        {name:'readingStatus',label:"Reading Status"},
                        {name:'totalDuration',label:"Total Duration"},
                        {name:'billDate',label:"Bill Date"},
                        {name:'readings',label:"Readings"},
                      ]}
                     
                    />
                </div>
              </div>
            </div>
          </div>
    );
}

export default Index;
