import {useEffect, useState} from 'react';
import { Input,Select, DatePicker,Button, Spin, message } from 'antd';
import {useDispatch} from 'react-redux';
import {addFilters} from "../redux/auth/userSlice";
import Download from "./Download";;
import moment from 'moment';

function FilterCard({title,objectData,paginateApi,data,finalCount,
                    download,db,selectLoading,staticData,dataDownload}) {

  const [objArr, setObjArr] = useState(objectData)
  

  let dispatch = useDispatch();
  
  const onChangeHandler = (val,lop) => {
    setObjArr({...objArr, [lop]:val})
    dispatch(paginateApi({...objArr, [lop]:val}))
    dispatch(addFilters({"data":{...objArr, [lop]:val}}))
  }

  const handleReset = () => {
    setObjArr(objectData)
    dispatch(paginateApi(objectData))
  }

  return (
    <>
        <div className="row align-items-center">
            <div className="col-lg-12">
                <div className="d-flex justify-content-between align-items-center flex-wrap">
                    <h3 className="filter-card-title">{title}</h3>
                    {/* <Download dataDownload={dataDownload} download={download} apiObject={objArr} finalCount={finalCount} /> */}
                </div>
            </div>
            {
                data && data.map((item, i) => {
                    if(item.type == "text") {
                        return (
                            <>
                                <div className="col-lg-3">
                                    <label htmlFor="">{item.label}</label>
                                    <Input placeholder={item.label} 
                                           allowClear
                                           value={objArr && objArr[item.value]}
                                           onChange={(val) => onChangeHandler(val.target.value,item.value)} 
                                    />
                                </div>
                            </>
                        )
                    }else if(item.type == "select") {
                        return (
                            <>
                                <div className="col-lg-3">
                                <label htmlFor="">{item.label}</label>
                                    {
                                        staticData == true
                                        ?
                                            <Select
                                                allowClear
                                                placeholder={item.label}
                                                showSearch
                                                value={objArr && objArr[item.value]}
                                                style={{ width: '100%' }}
                                                onChange={(val) => onChangeHandler(val,item.value)}
                                                >
                                                {
                                                    item.filterList?.map((val, index) => (
                                                        <Select.Option value={val} key={index}> 
                                                            {val}
                                                        </Select.Option>
                                                    ))
                                                }
                                                
                                            </Select>
                                        :
                                        <Select
                                            allowClear
                                            showSearch
                                            loading={selectLoading}
                                            value={objArr && objArr[item.value]}
                                            style={{ width: '100%' }}
                                            notFoundContent={selectLoading ? <Spin size="small" /> : null}
                                            onChange={(val) => onChangeHandler(val,item.value)}
                                            >
                                            {
                                                selectLoading ?
                                                    <Select.Option style={{textAlign: 'center'}}> 
                                                        <Spin size="small" />
                                                    </Select.Option>
                                                : item.filterList?.map((val, index) => (
                                                    <Select.Option value={val} key={index}> 
                                                        {val}
                                                    </Select.Option>
                                                ))
                                            }
                                            
                                        </Select>
                                    }
                                    
                                </div>
                            </>
                        )
                    }else if(item.type === 'date') {
                        return (
                            <>
                                <div className="col-lg-3">
                                    <label htmlFor="">{item.label}</label>
                                    <DatePicker  
                                        allowClear
                                        value={objArr && objArr[item.value] !== "" ? moment(objArr && objArr[item.value]) : null}
                                        format="DD-MM-YYYY" 
                                        style={{width:'100%'}} 
                                        onChange={(date,dateString) => {
                                            let finalDate = moment(date && date._d).format('YYYY-MM-DD')
                                            return onChangeHandler(finalDate,item.value)
                                        }} />
                                </div>
                            </>
                        )
                    }
                })
            }
            <div className="col-lg-3">
                <label htmlFor="">&nbsp;</label> <br/>
                <Button type="warning" className="" onClick={handleReset}>
                    Reset Filters
                </Button>
            </div>
        </div>
    </>
  )
}

export default FilterCard