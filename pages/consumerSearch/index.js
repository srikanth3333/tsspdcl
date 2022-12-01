import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getConsumer} from '../../redux/divsionWise/consumerSlice';
import Head from 'next/head';
import TableData from "../../components/TableData";
import FilterCard from "../../components/FilterCard";

const Index = () => {

    let data = useSelector((state) => state.consumer)
    const user = useSelector((state) => state.users) 
    
    let dispatch = useDispatch()

    let apiObject = {page:0,consumer:'',startDate:"",endDate:"",search:""}

    useEffect(() => {
        dispatch(getConsumer(apiObject))
    }, [dispatch,user.boardCode,user.agency])

    
    return (
          <div>
            <Head>
              <title>Consumer Search</title>
              <meta name="description" content="Powerthon" />
            </Head>
            <div className="count-card">
              <div className="card mt-3">
                <div className="card-body">
                    <FilterCard 
                      finalCount={data.data.length}
                      objectData={apiObject}
                      paginateApi={getConsumer}
                      flag={"Circle"}
                      data={[
                        {label:"Start Date",type:"date",value:"startDate"},
                        {label:"End Date",type:"date",value:"endDate"},
                        {label:"Consumer Number",type:"text",value:"search"},
                      ]} 
                      title="Consumer Search"
                    />
                    <TableData 
                      data={data} 
                      apiObject={apiObject}
                      filters={{}}
                      paginate={true}
                      paginateApi={getConsumer}
                      excludeItems={[
                        "_id",
                        "deviceId",
                        "readings",
                        "lat",
                        "lon",
                        "abnormalityStatus",
                        "readingStatus",
                        "photoUrl",
                        "duration",
                        "timestamp",
                        "billDate",
                        "validationTime",
                        "totalDuration",
                        "phase",
                        "category",
                        "mrid",
                        "areaCode",
                        "sectionCode",
                        "subDiv",
                        "activityType",
                        "mruConsumerCount",
                        "agencyId",
                        "accountId",
                        "prevReadings",
                        "statusCode",
                        "updatedAt",
                        "readingsData",
                        "timestampIds",
                        "readingValues"
                      ]}
                    />
                </div>
              </div>
            </div>
          </div>
    );
}

export default Index;
