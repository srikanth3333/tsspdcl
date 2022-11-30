import {useEffect,useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {uploadFile} from "../../redux/fileUpload/fileUploadSlice";
import Link from 'next/link';
import Head from 'next/head';
import TableData from "../../components/TableData";
import FilterCard from "../../components/FilterCard";
import CountCard from "../../components/CountCard";
import Messages from "../../components/Messages";

const Index = () => {

    let data = useSelector((state) => state.uploadData)
    const [selectedFile, setSelectedFile] = useState([]);
	const [isFilePicked, setIsFilePicked] = useState(false);
	const [eroCode, setEroCode] = useState('');
    const [files, setFiles] = useState('');
    const [showMessage, setShowMessage] = useState(false);


    
    let dispatch = useDispatch()

    let apiObject = {eroCode:"022",page:0}

    useEffect(() => {
      dispatch(uploadFile(apiObject))
    }, [dispatch])


	const changeHandler = (event) => {
        setFiles(event.target.files);
		setIsFilePicked(true);
        console.log(event.target.files)
	};


	const handleSubmission = (e) => {
        e.preventDefault();
		const formData = new FormData();
		formData.append('eroCode', eroCode);
        for (let i = 0; i < files.length; i++) {
            formData.append(`txtFile`, files[i])
        }
        

		fetch(
			'http://192.168.0.101:5000/TSSPDCL/uploadinput',
			{
				method: 'POST',
				body: formData,
                headers: {
                    authkey: '9391962924'
                }
			}
		)
			.then((response) => response.json())
			.then((result) => {
                setSelectedFile(result)
                dispatch(uploadFile(apiObject))
                setShowMessage(true)
                setTimeout(() => {
                    setShowMessage(false)
                }, 2000)
			})
			.catch((error) => {
				console.error('Error:', error);
			});
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
                                <input type="file" required className="form-control" multiple name="file" onChange={changeHandler} />
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <input type="text" required placeholder="Enter ero code" className="form-control" onChange={(e) => setEroCode(e.target.value)} /> <br />
                        </div>
                        <div className="col-lg-4">
                            <button className="btn btn-primary" type="submit">Submit</button>
                        </div>
                    </form>
                    <FilterCard 
                      objectData={apiObject}
                      paginateApi={uploadFile}
                      // flag={"Circle"}
                      data={[
                        {label:"ERO Code",type:"text",value:"eroCode"},
                      ]} 
                      title="Billed Count"
                    />
                    <TableData
                      data={data} 
                      link={true}
                      linkIndex={[
                        {index:2,linkUrl:""},
                      ]}
                      deleteOption={true}
                      filters={{}}
                      paginate={false}
                    />
                </div>
              </div>
            </div>
          </div>
    );
}

export default Index;
