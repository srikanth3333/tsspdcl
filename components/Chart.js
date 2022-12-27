import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";
import Head from 'next/head';

const Chart = ({id,name,filterId}) => {
    
    let user = useSelector((state) => state.users)
    // const [defaultEroId, setDefaultEroId] = useState(user?.logData?.eroList?.[0])
    const [eroId, setEroId] = useState(user?.logData?.eroList?.[0])

    const sdk = new ChartsEmbedSDK({
        baseUrl: "https://charts.mongodb.com/charts-project-0-sysep",
    });
    
    const chart = sdk.createChart({
      chartId: id,
      height:'400px',
      width:'100%',
    });

    useEffect(() => {
        const filterSelect =  document.querySelector(`.ids`)
        filterSelect.addEventListener('change', async (e) => {
            if(filterSelect.value == "") {
                if(user?.role != "SAD") {
                    chart.setFilter({"spoterocd": eroId})
                }else {
                    chart.setFilter({"spoterocd": ""})
                }
            }else {
              chart.setFilter({ "spoterocd": filterSelect.value })
            }
        })
        chart.render(document.querySelector(`.${name}`))
        
        return () => {}
    }, [])

    return (
        <>
            <div>
                {
                    !filterId
                    ? null :
                    <>
                        <input type="text" className="test d-none " />
                        <label htmlFor="">Ero List</label>
                        <select name="" onChange={(e) => setEroId(e.target.value)} id="" className={`ids form-select mb-3`}>
                            <option value="">{"No Select"}</option>
                            {user?.logData?.eroList?.map((item,i) => (
                                <option value={item} key={i}>{item}</option>
                            ))}
                        </select>
                    </>
                }
            </div>  
            <div className={`${name}`}></div>
        </>
    );
}

export default Chart;
