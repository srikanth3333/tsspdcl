import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAnalysisRemark} from "../../redux/analysisRemarks/analysisGraph";
import Link from 'next/link';
import Head from 'next/head';
import PieGraph from "../../components/PieGraph";
import FilterCard from '../../components/FilterCard';

const Index = () => {

    let data = useSelector((state) => state.analysisGraph)
    
    let dispatch = useDispatch()

    let apiObject = {startDate:'',endDate:'',}

    useEffect(() => {
      dispatch(getAnalysisRemark(apiObject))
    }, [dispatch])

    
    
    return (
          <div>
            <Head>
              <title>Analysis Remarks</title>
              <meta name="description" content="Powerthon" />
            </Head>
            <div className="count-card">
              <div className="card mt-3">
                <div className="card-body">
                    <FilterCard 
                      objectData={apiObject}
                      paginateApi={getAnalysisRemark}
                      download={true}
                      dataDownload={data.data}
                      data={[
                        {label:"Start Date",type:"date",value:"startDate"},
                        {label:"End Date",type:"date",value:"endDate"},
                      ]} 
                      title=""
                    />
                    <PieGraph data={data.data} link="/analysisRemarks/exception"  />
                </div>
              </div>
            </div>
          </div>
    );
}

export default Index;
