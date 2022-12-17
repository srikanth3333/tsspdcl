import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAnalysisRemark} from "../../redux/analysisRemarks/analysisGraph";
import Link from 'next/link';
import Head from 'next/head';
import PieGraph from "../../components/PieGraph";

const Index = () => {

    let data = useSelector((state) => state.analysisGraph)
    
    let dispatch = useDispatch()

    let apiObject = {}

    useEffect(() => {
      dispatch(getAnalysisRemark(apiObject))
    }, [dispatch])

    console.log(data)
    
    return (
          <div>
            <Head>
              <title>Analysis Remarks</title>
              <meta name="description" content="Powerthon" />
            </Head>
            <div className="count-card">
              <div className="card mt-3">
                <div className="card-body text-center">
                    <PieGraph data={data.data} link="/analysisRemarks/exception"  
                        
                    />
                </div>
              </div>
            </div>
          </div>
    );
}

export default Index;
