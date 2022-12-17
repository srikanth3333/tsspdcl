import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAnalysisException} from "../../../redux/analysisRemarks/analysisException";
import Link from 'next/link';
import Head from 'next/head';
import TableData from "../../../components/TableData";
import FilterCard from "../../../components/FilterCard";
import CountCard from "../../../components/CountCard";
import { useRouter } from 'next/router';


const Index = () => {

    let data = useSelector((state) => state.analysisException)
    
    let dispatch = useDispatch()
    const router = useRouter()
    const { id } = router.query
    let apiObject = {exception:id}

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
                    <TableData 
                      data={data.data} 
                      link={false}
                      loading={data}
                      filters={{}}
                      paginate={false}
                      deleteOption={false}
                      arrayData={[
                        {name:'consumerCount',label:"Consumer Count"},
                        {name:'mobileNo',label:"Mobile No",linkPage:"/analysisRemarks/summary/"},
                        {name:'IP',label:"IP"},
                        {name:'IR',label:"IR"},
                        {name:'II',label:"II"},
                        {name:'MM',label:"MM"},
                        {name:'OK',label:"OK"},
                        {name:'PU',label:"PU"},
                        {name:'SP',label:"SP"},
                        {name:'UI',label:"UI"},
                        
                      ]}
                    />
                </div>
              </div>
            </div>
          </div>
    );
}

export default Index;
