import {useEffect,useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {billDelete} from "../../redux/billDelete/billDeleteSlice";
import Link from 'next/link';
import Head from 'next/head';
import TableData from "../../components/TableData";
import FilterCard from "../../components/FilterCard";
import CountCard from "../../components/CountCard";


const Index = () => {
    
    let dispatch = useDispatch()
    let [useNo, setUseNo] = useState('')
    let [serviceNo, setServiceNo] = useState('')
    let [meterNo, setMeterNo] = useState('')

    let apiObject = {uscNo:"",serviceNo:"",meterNo:''}

    useEffect(() => {
    //   dispatch(billDelete(apiObject))
    }, [dispatch])

    const handleForm = (e) => {
        e.preventDefault();
        dispatch(billDelete({uscNo:useNo,serviceNo:serviceNo,meterNo:meterNo}))
        .then(res => console.log(res))
    }
    

    return (
          <div>
            <Head>
              <title>Bill Delete</title>
              <meta name="description" content="Powerthon" />
            </Head>
            <div className="count-card">
              <div className="card mt-3">
                <div className="card-body">
                    <form onSubmit={handleForm} className="row">
                        <div className="col-lg-4">
                            <label htmlFor="">Usc No</label>
                            <input className="form-control" type="text" onChange={(e) => setUseNo(e.target.value) } />
                        </div>
                        <div className="col-lg-4">
                            <label htmlFor="">Service No</label>
                            <input className="form-control" type="text" onChange={(e) => setServiceNo(e.target.value) } />
                        </div>
                        <div className="col-lg-4">
                            <label htmlFor="">Meter No</label>
                            <input className="form-control" type="text" onChange={(e) => setMeterNo(e.target.value) } />
                        </div>
                        <div className="col-lg-4 mt-2">
                            <button className="btn btn-danger">Delete</button>
                        </div>
                    </form>
                    
                    
                </div>
              </div>
            </div>
          </div>
    );
}

export default Index;
