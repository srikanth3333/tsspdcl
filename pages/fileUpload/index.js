import {useEffect,useState,useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {uploadFile} from "../../redux/fileUpload/fileUploadSlice";
import Link from 'next/link';
import Head from 'next/head';
import TableData from "../../components/TableData";
import FilterCard from "../../components/FilterCard";
import CountCard from "../../components/CountCard";
import Messages from "../../components/Messages";
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';


const Index = () => {

    let data = useSelector((state) => state.uploadData)
    const [selectedFile, setSelectedFile] = useState([]);
	  const [isFilePicked, setIsFilePicked] = useState(false);
	  const [eroCode, setEroCode] = useState('');
    const [files, setFiles] = useState('');
    const [showMessage, setShowMessage] = useState(false);


    const inputRef = useRef(null);

    const resetFileInput = () => {
      inputRef.current.value = null;
    };

    
    let dispatch = useDispatch()

    let apiObject = {eroCode:"",page:0}

    useEffect(() => {
      dispatch(uploadFile(apiObject))
    }, [])


	const changeHandler = (event) => {
        console.log(event.target.files)
        setFiles(event.target.files);
		    setIsFilePicked(true);
	};


	const handleSubmission = (e) => {
    
    e.preventDefault();
		const formData = new FormData();
		formData.append('eroCode', eroCode);
    for (let i = 0; i < files.length; i++) {
        formData.append(`txtFile`, files[i])
    }

		fetch(
			'https://mr.bharatsmr.com/TSSPDCL/uploadinput',
			// 'http://192.168.0.101:5000/TSSPDCL/uploadinput',
			{
				method: 'POST',
				body: formData,
                headers: {
                    authkey: localStorage.getItem('mobileNo')
                }
			}
		)
    .then((response) => response.json())
    .then((result) => {
      console.log(result)
      alert(`Successfully uploaded ${result.count} files.`)
      setShowMessage(true)
      setTimeout(() => {
          setShowMessage(false)
      }, 9000)
      setFiles([])
      setEroCode('')
      resetFileInput()
      setSelectedFile(result)
      dispatch(uploadFile(apiObject))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
	};

  const props = {
    name: 'txtFile',
    action: 'http://192.168.0.101:5000/TSSPDCL/uploadinput',
    multiple: true,
    headers: {
      authorization: 'authorization-text',
      authkey: localStorage.getItem('mobileNo')
    },
    onChange(info) {
      setFiles(info.fileList)
      if (info.file.status !== 'uploading') {
        
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  };

  
    

    return (
          <div>
            {showMessage && <Messages type='success' messageText={`Successfully uploaded ${selectedFile.count} files`} />}
            <Head>
              <title>File Upload</title>
              <meta name="description" content="Powerthon" />
            </Head>
            <div className="count-card">
              <div className="card mt-3">
                <div className="card-body">
                    <h5>Upload file here</h5>
                    <form className="row my-2" onSubmit={handleSubmission}>
                        <div className="col-lg-4">
                            <div>
                                <input type="file" accept=".txt" ref={inputRef}  className="form-control" multiple name="file" onChange={changeHandler} />
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <input type="text" required value={eroCode} placeholder="Enter ero code" className="form-control" onChange={(e) => setEroCode(e.target.value)} /> <br />
                        </div>
                        <div className="col-lg-4">
                            <button className="btn btn-primary" type="submit">Submit</button>
                        </div>
                        {/* <div className="col-lg-4">
                          <Upload {...props}>
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                          </Upload>
                        </div> */}
                    </form>
                    <FilterCard 
                      objectData={apiObject}
                      paginateApi={uploadFile}
                      // flag={"Circle"}
                      data={[
                        {label:"ERO Code",type:"text",value:"eroCode"},
                      ]} 
                      title=""
                      arrayData={['']}
                    />
                    <TableData
                      data={data.data} 
                      link={true}
                      linkIndex={[
                        {index:1,linkUrl:""},
                      ]}
                      deleteOption={false}
                      filters={{}}
                      paginate={false}
                      arrayData={[
                        {name:'filename',label:'File Name'},
                        {name:'s3Url',label:'URL'},
                        {name:'processedFlag',label:'Processed Flag'},
                        {name:'insertedRows',label:'Inserted Records'},
                        {name:'exceptionRows',label:'Exception Records'},
                        {name:'createdAt',label:'Created Date'},
                      ]}
                    />
                </div>
              </div>
            </div>
          </div>
    );
}

export default Index;
