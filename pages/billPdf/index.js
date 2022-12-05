import Head from 'next/head';
import { useEffect } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {getBillData} from "../../redux/billData/billDataSlice";
import html2canvas from "html2canvas";
import {jsPDF} from "jspdf";
import {Button} from "antd"
import FilterCard from "../../components/FilterCard";

const Index = () => {


    let data = useSelector((state) => state.billData)

    let dispatch = useDispatch()

    let apiObject = {uscNo:"104167680",serviceNo:""}

    useEffect(() => {
        dispatch(getBillData(apiObject))
    },[])

    const downloafFileDocument =  () => {
        const input = document.getElementById("pdf")
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL("image/png")
            const pdf = new jsPDF("p", "mm", [200, 900])
            pdf.addImage(imgData, "JPEG", 0, 0, 200, 900)
            pdf.save('bill')
        })
    }

    console.log(data.data)

    return (
          <div>
            <Head>
              <title>Bill PDF</title>
              <meta name="description" content="TSSPDCL" />
            </Head>
            <div className="count-card billPdf" >
              <div className="card mt-3">
                <div className="card-body bg-light">
                    <FilterCard 
                      objectData={apiObject}
                      paginateApi={getBillData}
                      data={[
                        {label:"Service Number",type:"text",value:"serviceNo"},
                        {label:"USC No",type:"text",value:"uscNo"},
                      ]} 
                      title="Bill Data"
                    />
                    <Button type="primary mt-2" onClick={downloafFileDocument}>Download PDF</Button>
                    <div className="row justify-content-center">
                        <div className="col-lg-4 bg-white border py-3" id="pdf">  
                            
                            <div className="text-center">
                                <div>
                                    <h2 className="title text-space">TSSPDCL</h2>                                
                                </div>
                                <hr />
                                <div>
                                    <h2 className="title color-red">Electricity bill cum notice</h2>                                
                                </div>
                            </div>
                            <hr className="hr-thick" />
                            <div className=""> 
                                <div className="flex-item">
                                    <p>DT: 02/12/2022</p>
                                    <p>TI: 11:02</p>
                                </div>
                                <div className="flex-item">
                                    <p>Bill No: 1</p>
                                    <p>ERO No: 2622</p>
                                </div>
                                <div className="flex-item"> 
                                    <p>ERO: TEST_ERO</p>
                                </div>
                                <div className="flex-item"> 
                                    <p>SEC: 76 </p>
                                    <p>CYCLE: M1</p>
                                </div>
                                <div className="flex-item"> 
                                    <p>AREA: Desaipet </p>
                                    <p>MRID: 41378</p>
                                </div>
                                <div className="flex-item"> 
                                    <p>PHOTO </p>
                                    <p>v00.0.221.18</p>
                                </div>
                                <hr />
                                {/* ---------- */}
                                <div className="flex-item"> 
                                    <p>USc No: 11112222</p>
                                </div>
                                <div className="flex-item"> 
                                    <p>SC NO: 11111-222222</p>
                                </div>
                                <div className="flex-item"> 
                                    <p>Name: Test User</p>
                                </div>
                                <div className="flex-item"> 
                                    <p>Address: 22-5-210/203 Desaipet
                                    Desaipet</p>
                                </div>
                                <div className="flex-item"> 
                                    <p>CAT: 1A </p>
                                    <p>PH: 1</p>
                                </div>
                                <div className="flex-item"> 
                                    <p>LOAD: 0.00 KW</p>
                                </div>
                                <div className="flex-item"> 
                                    <p>STR Code: 212201222017</p>
                                </div>
                                <div className="flex-item"> 
                                    <p>MM: LENUS 3-PH</p>
                                </div>
                                <div className="flex-item"> 
                                    <p>Pole No: LMTSHIP</p>
                                </div>
                                <div className="flex-item"> 
                                    <p>Reading</p>
                                    <p>Month</p> 
                                    <p>Sts</p>
                                </div>
                                <hr />
                                <div className="flex-item"> 
                                    <p>Ps</p> <p>55</p> <p>02/12/2022</p> <p>01</p>
                                </div>
                                <div className="flex-item"> 
                                    <p>Pv</p> <p>10</p> <p>20/09/2022</p> <p>01</p>
                                </div>
                                <div className="flex-item"> 
                                    <p>KWH Units: 45</p>
                                </div>
                                <hr />
                                
                                {/* -------- */}
                                <div className="flex-item"> 
                                    <p>Billed Units: 45</p> 
                                    <p>Days: 73</p>
                                </div>
                                
                                <div className="flex-item"> 
                                    <p>RMD: 0.0</p>
                                    <p>Avg: 18.7</p>
                                </div>
                                <div className="flex-item"> 
                                    <p>Meter No: 00000001</p>
                                    <p>MF: 1</p>
                                </div>
                                <div className="flex-item"> 
                                    <p>TC Seal: N</p>
                                    <p>CAP: 1</p>
                                </div>
                                <hr />
                                <div className="flex-item"> 
                                    <p>ENERGY CHARGES :</p> 
                                    <p>87.75</p>
                                </div>
                                <div className="flex-item"> 
                                    <p>CUST CHARGES :</p> 
                                    <p>40.00</p>
                                </div>
                                <div className="flex-item"> 
                                    <p>FIXED CHARGES :</p> 
                                    <p>10.00</p>
                                </div>
                                <div className="flex-item"> 
                                    <p>ELECTRICITY DUTY :</p> 
                                    <p>2.70</p>
                                </div>
                                <div className="flex-item"> 
                                    <p>EDINT :</p> 
                                    <p>0.00</p>
                                </div>
                                <div className="flex-item"> 
                                    <p>ADDITIONAL CHG :</p> 
                                    <p>0.00</p>
                                </div>
                                <div className="flex-item"> 
                                    <p>ADJUSTMENT :</p> 
                                    <p>0.00</p>
                                </div>
                                <div className="flex-item"> 
                                    <p>ROUNDING :</p> 
                                    <p>-0.45</p>
                                </div>
                                <div className=""> 
                                    <div className="d-flex justify-content-end">
                                        <hr style={{width:'30%'}} />
                                    </div>
                                    <div className="flex-item">
                                        <p>TOTAL AMOUNT :</p> 
                                        <p>{data?.data?.billamount}</p>
                                    </div>
                                </div>
                                <div className="flex-item"> 
                                    <p>Arr AS ON 01-04-2022:</p> 
                                    <p>0.00</p>
                                </div>
                                <div>
                                    <div className="flex-item">
                                        <p>Arr AFTER 01-04-2022:</p> 
                                        <p>0.00</p>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                            <hr style={{width:'30%'}} />
                                    </div>
                                </div>
                                <div className="flex-item"> 
                                        <p className="font-lg">NET AMOUNT :</p> 
                                        <p className="font-lg">140.00</p>
                                    </div>
                                <hr />
                                <div className="flex-item"> 
                                    <p>LAST PAID DATE:</p> 
                                    <p>23/07/2022</p>
                                </div>
                                <div className="flex-item"> 
                                    <p>LAST PAID AMT:</p> 
                                    <p>422.00</p>
                                </div>
                                <div className="flex-item"> 
                                    <p>DUE DATE:</p> 
                                    <p>16-12-2022</p>
                                </div>
                                <div className="flex-item"> 
                                    <p>DISC DATE:</p>
                                    <p>31-12-2022</p>
                                </div>
                                <div className="flex-item"> 
                                    <p>AE CELL NO:</p> 
                                    <p>9440811433</p>
                                </div>
                                <div className="flex-item"> 
                                    <p>AAO CELL NO:</p> 
                                    <p>7901674687</p>
                                </div>
                                <div className="flex-item"> 
                                    <p>SUBSIDY/UNIT :</p>
                                    <p>5.81</p>
                                </div>
                                <div className="flex-item"> 
                                    <p>SUBSIDY AMOUNT :</p> 
                                    <p>261.45</p>
                                </div>
                                <hr />
                                <div className="text-center font-lg">
                                    <p>For AAO/ERO/TEST_ERO</p>
                                    <p>TOLL FREE: 1912 / 18004250028</p>
                                    <p>https://tsspdcl.in/</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
    );
}

export default Index;
