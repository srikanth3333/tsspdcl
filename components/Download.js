import {useState}  from 'react';
import { Progress,Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { CSVLink } from "react-csv";
import axios from 'axios';
import { useRouter } from "next/router";

function Download({apiObject,finalCount}) {

    let [downloadDataArray,setDownloadDataArray] = useState([]);
    let [dataLoading,setDataLoading] = useState(false)
    let [count,setCount] = useState(0)

    const router = useRouter();

    const downloadData = async () => {
        setDataLoading(true)
        let finalData = Math.ceil(parseInt(finalCount) / 5000);
        if(finalData > 5) {
            finalData = 5;
        }
        for(let i=0; i<finalData; i++) {
            setCount(i * 5000)
            console.log('started', count)
            await axios.post(`/api/${router.pathname}/dataDownload?page=${i}`,apiObject)
            .then(res => {
                setDownloadDataArray(oldArray => [...oldArray, res.data.data]);
            })
            .catch(err => {
                console.log(JSON.stringify(err))
            })   
        }
        setDataLoading(false)
        setTimeout(() => {
            let button = document.getElementById('dn-btn')
            button.click();
            setDownloadDataArray([])
        },1000)
    }

  return (
    <div>
        {
            dataLoading == true ?
                <Progress type="circle" percent={Math.ceil(count / finalCount * 100)} width={40} />
            :
            <div>
                <Button onClick={() => downloadData()} type="primary" shape="round" icon={<DownloadOutlined />} size={"medium"}>
                    Download Excel
                </Button>
            </div>
        }
        
        <CSVLink
            filename={`${Math.floor((Math.random() * 100) + 1)}.xls`}
            data={downloadDataArray.flat()}
            className="btn btn-primary btn-sm d-none"
            id="dn-btn"
        >
            Download Excel
        </CSVLink>
        
    </div>
  )
}

export default Download