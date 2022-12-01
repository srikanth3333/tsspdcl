import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getBillStatus} from "../../redux/billStatus/billStatusSlice";
import Link from 'next/link';
import Head from 'next/head';
import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";

const Index = () => {
    

    const sdk = new ChartsEmbedSDK({
        baseUrl: "https://charts.mongodb.com/charts-project-0-sysep", // ~REPLACE~ with the Base URL from your Embed Chart dialog.
    });
    
    const chart = sdk.createChart({
        chartId: "63627b5e-8dde-4854-8e3b-6dfa56c43c69", // ~REPLACE~ with the Chart ID from your Embed Chart dialog.
        height: "700px",
    // Additional options go here
    });
    
    useEffect(() => {
        // chart.render(document.querySelector('#chart'))
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
                    <div className="chart"></div>
                </div>
              </div>
            </div>
          </div>
    );
}

export default Index;
