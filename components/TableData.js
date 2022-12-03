
import {useState} from "react";
import {Table} from "antd";
import {useSelector,useDispatch} from 'react-redux';
import Moment from 'react-moment';
import moment from 'moment';
import React from "react";
import {addFilters} from "../redux/auth/userSlice";
import Link from 'next/link'
import { isDate } from "moment/moment";
import {billDelete} from "../redux/billDelete/billDeleteSlice";
const Str = require('@supercharge/strings')
var momentTimezone = require('moment-timezone');



function TableData({data,paginateApi,apiObject,paginate,link,linkIndex,excludeItems,deleteOption,arrayData}) {

  let filtersData = useSelector((state) => state.users)
  let dispatch = useDispatch()
  const [page,setPage] = useState(1)

  React.useEffect(() => {
    dispatch(addFilters({data:apiObject}))
  },[dispatch])

  // if(!data || data.length == 0) {
  //   return (
  //     <>
  //       <div className="text-center mt-4">
  //         <h6>Not valid data found for table. Please select filters correctly.</h6>
  //       </div>
  //     </>
  //   )
  // }


  const handleForm = (e,uscNo,serviceNo,meterNo) => {
    e.preventDefault();
    dispatch(billDelete({uscNo:uscNo,serviceNo:'',meterNo:''}))
    .then(res => {
      console.log('resp....')
      console.log(res)
      location.reload();
    })
  }


  

  let objectData = data?.length > 0 ? data.find((item,index) => index == 0) : null
  let mapData = objectData != null ? Object.keys(objectData) : null;
  let filteredArray = excludeItems != undefined ? mapData && mapData.filter(e => !excludeItems.includes(e)) : mapData;

  let lp = !arrayData ? filteredArray && filteredArray.map((item,i) => {

      return {
          title: `${Str(item).replaceAll('_', ' ').title().get()}`,
          dataIndex: `${item}`,
          key: i,
          width: 180,
          textWrap: 'word-break',
          ellipsis: true,
          render: (val,record) => {
            let ids = linkIndex && linkIndex.map((ddr) => ddr.index)
            let final = linkIndex && linkIndex.reduce((acc,ddr) => {
              return {...acc, [ddr.index]:{index:ddr.index,link:ddr.linkUrl,
                linkExtend:ddr.linkExtend,noLink:ddr.noLink}}
            },{})
            
            return(
              <>
                {
                        link == true && ids.includes(i) ?
                          <Link href={final[i]?.linkExtend == true ? `/${final[i]?.link}${record.id}` : final[i]?.noLink == true ? `${final[i]?.link}` : `${val}`}>
                                {val}
                          </Link>
                         : val
                }
              </>
            )
          }
      }
    }) : arrayData.map((item,i) => {
      
      if(item.name == "pendingCount") {
        return {
            title: `Pending Sync`,
            dataIndex: `${item.name}`,
            key: i,
            width: 180,
            textWrap: 'word-break',
            ellipsis: true,
            render: (val,record) => {
              
              return(
                <>
                  {val < 0 ? '0' : val}
                </>
              )
            }
        }
      }else if (item.name == "version") {
        return {
          title: `App Version`,
          dataIndex: `${item.name}`,
          key: i,
          width: 180,
          textWrap: 'word-break',
          ellipsis: true,
          render: (val,record) => {
            
            return(
              <>
                {val.replace('100000.','')}
              </>
            )
          }
       }
      }else if(item.name == "timestamp") {
        return {
          title: `last Updated`,
          dataIndex: `${item.name}`,
          key: i,
          width: 180,
          textWrap: 'word-break',
          ellipsis: true,
          render: (val,record) => {
            
            return(
              <>
                <Moment format="DD/MM/YYYY">{val}</Moment> <br />
                <Moment format="hh:mm:ss A">{val}</Moment>
              </>
            )
          }
       }
      }


      return {
          title: `${item.label}`,
          dataIndex: `${item.name}`,
          key: i,
          width: 180,
          textWrap: 'word-break',
          ellipsis: true,
          render: (val,record) => {
            let ids = linkIndex && linkIndex.map((ddr) => ddr.index)
            let final = linkIndex && linkIndex.reduce((acc,ddr) => {
              return {...acc, [ddr.index]:{index:ddr.index,link:ddr.linkUrl,
                linkExtend:ddr.linkExtend,noLink:ddr.noLink}}
            },{})
            
            return(
              <>
                {
                        link == true && ids.includes(i) ?
                          <Link href={final[i]?.linkExtend == true ? `/${final[i]?.link}${record.id}` : final[i]?.noLink == true ? `${final[i]?.link}` : `${val}`}>
                                {val}
                          </Link>
                         : val
                }
              </>
            )
          }
      }
    })

    console.log(deleteOption)

  deleteOption ==  true ? lp?.push({
    title: `Delete`,
    dataIndex: `Delete`,
    key: 10,
    width: 180,
    textWrap: 'word-break',
    ellipsis: true,
    render: (val,record) => {
      return(
        <>
          <form onSubmit={(e) => handleForm(e,record.uscNo,record.service_number,record.meter_number)}>
            <button type="submit" className="btn btn-info text-white btn-sm">Enable Rebill</button>
          </form>
        </>
      )
    }
  }) : null


  return (
    <>
     
        <div className="row mt-3">
          <div className="col-lg-12">
            <Table
                style={{ whiteSpace: 'break-spaces'}}
                loading={data?.loading}
                columns={lp}
                dataSource={data}
                scroll={{
                  x:600,
                  y: 300,
                }}
                pagination={paginate == true ? {
                  pageSize: 20,
                  current: page, 
                  total: page * 20 + data.length,
                  onChange: (page) => {
                    setPage(page)
                    dispatch(paginateApi({...filtersData.filterObject,page:page - 1}))
                  },
                } : {showSizeChanger:true,pageSize:20,}}
              />
          </div>
        </div>
    </>
    
  )
}

export default TableData