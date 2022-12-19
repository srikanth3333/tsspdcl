
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
import InnerImageZoom from 'react-inner-image-zoom';
import { Modal, Button } from 'react-bootstrap';
const Str = require('@supercharge/strings')
var momentTimezone = require('moment-timezone');



function TableData({data,paginateApi,apiObject,paginate,link,linkIndex,excludeItems,deleteOption,arrayData,loading,linkPage}) {

  let filtersData = useSelector((state) => state.users)
  let dispatch = useDispatch()
  const [page,setPage] = useState(1)
  const [show, setShow] = useState(false);
  const [zoomImage, setZoomImage] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
          sorter: (a, b) => {
            return a[item.name] - b[item.name]
          },
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
            sorter: (a, b) => {
              return a[item.name] - b[item.name]
            },
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
          sorter: (a, b) => {
            return a[item.name] - b[item.name]
          },
          render: (val,record) => {
            return(
              <>
                {val?.replace('100000.','')}
              </>
            )
          }
       }
      }else if(item.name == "mobileNo" && item.extraData == true) {
        
        return {
          title: `Consumer Details`,
          dataIndex: `${item.name}`,
          key: i,
          width: 180,
          textWrap: 'word-break',
          ellipsis: true,
          sorter: (a, b) => {
            return a[item.name] - b[item.name]
          },
          render: (val,record) => {
            return(
              <>
                {!item.linkPage ? val : <Link href={`${item.linkPage}/${val}/file/${val}`}>{val}</Link>}
                {
                  item.extraData == true ?
                  <>
                    <p>Uid No: {record.uidNo}</p>
                    <p>Serial No:{record.serialNo}</p>
                    <p>Reading Status: {record.readingStatus}</p>
                    <p>Duration: {record.totalDuration}</p>
                    <p>Bill Date: {record.billDate}</p>
                  </> : null
                }
                
              </>
            )
          }
       }
      }else if(item.name == "readings") {
        return {
          title: `Readings`,
          dataIndex: `${item.name}`,
          key: i,
          width: 500,
          textWrap: 'word-break',
          ellipsis: true,
          sorter: (a, b) => {
            return a[item.name] - b[item.name]
          },
          render: (val,record,index) => {
            return(
              <div className="d-flex  align-items-center">
                {val != null ?
                    Object.entries(val).map(([key, value]) => {
                        return (
                            <>
                              {
                                  <div className="text-center me-4">
                                      <img style={{cursor: 'pointer'}}
                                      onClick={() => {
                                          setZoomImage(value.bigImg)
                                          handleShow()
                                      }}
                                      src={value.smallImg} height="90px"></img>
                                      <p className="mt-2"><b>Value: {value.actualValue ? value.actualValue : value.scanValue} </b></p>
                                      {/* <p className="mt-2"><b>Serial Number: {value?.insights && value.insights?.p_serial ? value.insights?.p_serial : value?.insights?.p_serial} </b></p> */}
                                      <p><b>{key}</b></p>
                                      <p><b>{value.analysisRemark}</b></p>
                                  </div>
                              }
                              
                            </>
                        )
                    })
                :
                   null
                }
              </div>
            )
          }
       }
      }
      
      else if(item.name == "timestamp") {
        return {
          title: `last Updated`,
          dataIndex: `${item.name}`,
          key: i,
          width: 180,
          textWrap: 'word-break',
          ellipsis: true,
          sorter: (a, b) => {
            return a[item.name] - b[item.name]
          },
          render: (val,record) => {
            let string = val * 1 + 19800;
            
            return(
              <>
                {
                  item.convert == true ?
                    <>
                      {moment.unix(val).format("DD/MM/YYYY")} <br />
                      {moment.unix(string.toString()).utc().format("hh:mm:ss A")}
                    </>
                  :
                  <>
                    <Moment format="DD/MM/YYYY">{val}</Moment> <br />
                    <Moment format="hh:mm:ss A">{val}</Moment>
                  </>
                }
                
              </>
            )
          }
       }
      }else if(item.name == "smallImg") {
        return {
          title: `Small Img`,
          dataIndex: `${item.name}`,
          key: i,
          width: 180,
          textWrap: 'word-break',
          ellipsis: true,
          sorter: (a, b) => {
            return a[item.name] - b[item.name]
          },
          render: (val,record,index) => {
            let getImg = data[index].bigImg
            return(
              <>
                <img style={{cursor: 'pointer'}}
                    onClick={() => {
                        setZoomImage(getImg)
                        handleShow()
                    }}
                    src={val} height="90px"></img>
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
          textWrap: 'break-word',
          ellipsis: true,
          sorter: (a, b) => {
            return a[item.name] - b[item.name]
          },
          render: (val,record) => {
            
            return(
              <>
                {
                  !item.linkPage ? val : <Link href={`${item.linkPage}/${record.mobileNo}/file/${item.name}`}>{val}</Link>
                }
              </>
            )
          }
      }
    })

  deleteOption ==  true ? lp?.push({
    title: ``,
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

  const onChange = (pagination, filters, sorter, extra) => {
    return extra.currentDataSource.sort();
  };


  return (
    <>
     
        <div className="row mt-3">
          <div className="col-lg-12">
            <Table
                style={{ whiteSpace: 'break-spaces'}}
                loading={loading?.loading}
                columns={lp}
                dataSource={data}
                onChange={onChange}
                scroll={{
                  x:600,
                  y: 300,
                }}
                pagination={paginate == true ? {
                  pageSize: 20,
                  current: page, 
                  total: data.length == 20  ? page * 20 + data.length : 1,
                  onChange: (page) => {
                    setPage(page)
                    dispatch(paginateApi({...filtersData.filterObject,page:page - 1}))
                  },
                } : {showSizeChanger:true,pageSize:20}}
              />
              <Modal
                show={show} onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="mt-4"
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Image View
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-1">
                    <div className="text-center">
                        <InnerImageZoom src={zoomImage} className="zoom-img-main" style={{height: '800px',objectFit: 'contain'}} zoomSrc={zoomImage} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
          </div>
        </div>
    </>
    
  )
}

export default TableData