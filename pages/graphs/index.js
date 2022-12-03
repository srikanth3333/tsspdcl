import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getBillStatus} from "../../redux/billStatus/billStatusSlice";
import Link from 'next/link';
import Head from 'next/head';
import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";

const Index = () => {
    
    let user = useSelector((state) => state.users)
    const [eroId, setEroId] = useState(user?.logData?.eroList?.[0])

    const sdk = new ChartsEmbedSDK({
        baseUrl: "https://charts.mongodb.com/charts-project-0-sysep",
    });
    
    // const chart = sdk.createDashboard({
    //     dashboardId: "6188b97e-0623-4559-878a-45da62bfcbde",
    //     height: "700px",
    //     filter: { "spoterocd": "034" }
    // });
    const chart = sdk.createChart({
      chartId: '63627b5e-8dde-455c-8549-6dfa56c43c7a',
      height:'500px',
      width:'100%',
      // background:'#0f0f0f'
      // filter: { "spoterocd": eroId }
    });

    const chart2 = sdk.createChart({
      chartId: '638a07a4-eca4-4b43-81bb-550f6ce019bc',
      height:'500px',
      width:'100%',
    });

    const chart3 = sdk.createChart({
      chartId: '638a07a4-eca4-4cc1-8b6f-550f6ce019c2',
      height:'500px',
      width:'100%',
    });

    const chart4 = sdk.createChart({
      chartId: '638a07a4-eca4-4329-8bf5-550f6ce019e4',
      height:'500px',
      width:'100%',
    });

    const chart5 = sdk.createChart({
      chartId: '638a07a4-eca4-493e-841b-550f6ce019ca',
      height:'500px',
      width:'100%',
    });
    

    useEffect(() => {
        chart.render(document.querySelector('.chart'))
        chart2.render(document.querySelector('.chart2'))
        chart3.render(document.querySelector('.chart3'))
        chart4.render(document.querySelector('.chart4'))
        chart5.render(document.querySelector('.chart5'))
        const eroIdsData = document.querySelector('.ids')
        const date = document.querySelector('.date')
        eroIdsData.addEventListener('change', async (e) => {
          if(eroIdsData.value == "") {
            chart.setFilter({})
          }else {
            chart.setFilter({ "spoterocd": eroIdsData.value })
          }
        })
        date.addEventListener('change', async (e) => {
          console.log(date.value)
          if(eroIdsData.value == "") {
            chart5.setFilter({})
          }else {
            chart5.setFilter({ "createdAt": new Date(date.value) })
          }
        })
        return () => {}
    }, [])

    return (
          <div>
            <Head>
              <title>Graphs</title>
              <meta name="description" content="TSSPDCL" />
            </Head>
            <div className="count-card">
              <div className="card mt-3">
                <div className="card-body">
                    <div className="row">
                      <div className="col-lg-4">
                          <label htmlFor="">Ero List</label>
                          <select name="" onChange={(e) => setEroId(e.target.value)} id="" className="ids form-select mb-3">
                            <option value={""}>{"No Select"}</option>
                            {user?.logData?.eroList?.map((item,i) => (
                              <option value={item} key={i}>{item}</option>
                            ))}
                          </select>
                          <div className="chart"></div>
                      </div>
                      <div className="col-lg-4">
                          <div className="chart2"></div>
                      </div>
                      <div className="col-lg-4">
                        <div className="chart3"></div>
                      </div>
                      <div className="col-lg-6">
                        <div className="chart4"></div>
                      </div>
                      <div className="col-lg-6">
                        <input type="date" className="date form-control" />
                        <div className="chart5"></div>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
    );
}

export default Index;
