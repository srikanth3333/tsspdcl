import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getInputData} from "../../redux/inputData/inputDataSlice";
import Link from 'next/link';
import Head from 'next/head';
import TableData from "../../components/TableData";
import FilterCard from "../../components/FilterCard";
import CountCard from "../../components/CountCard";


const Index = () => {

    let data = useSelector((state) => state.inputData)
    const user = useSelector((state) => state.users) 
    
    let dispatch = useDispatch()

    let apiObject = {eroCode:"",structureCode:"",page:0}

    useEffect(() => {
      dispatch(getInputData(apiObject))
    }, [dispatch])

    console.log(apiObject.structureCode)
    
    return (
          <div>
            <Head>
              <title>Input Data</title>
              <meta name="description" content="Powerthon" />
            </Head>
            <div className="count-card">
              <div className="card mt-3">
                <div className="card-body">
                    <FilterCard 
                      objectData={apiObject}
                      paginateApi={getInputData}
                      download={false}
                      dataDownload={data.data}
                      data={[
                        {label:"Ero Code",type:"text",value:"eroCode"},
                        {label:"Structure Code",type:"text",value:"structureCode"},
                      ]} 
                      title="Input Data"
                    />
                    <TableData 
                      data={data.data} 
                      link={false}
                      loading={data}
                      filters={{}}
                      paginate={true}
                      paginateApi={getInputData}
                      apiObject={apiObject}
                      deleteOption={false}
                    />
                </div>
              </div>
            </div>
          </div>
    );
}

export default Index;
