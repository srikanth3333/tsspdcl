import axios from 'axios';
import {useState,useRef, useEffect} from "react";
import Head from 'next/head';
import { useSelector } from 'react-redux';

const Index = () => {

    let user = useSelector((state) => state.users)
    const [eroList,setEroList] = useState('')
    const [mobileNo,setMobileNo] = useState('')
    const [hint,setHint] = useState('Ero List')

    let inputRef = useRef();


    const handleSubmit = (e) => {
        e.preventDefault();
        var data = JSON.stringify({
            "mobileNo": mobileNo,
            "eroList": eroList.split(',')
        });
        
        var config = {
            method: 'post',
            url: 'https://mr.bharatsmr.com/TSSPDCL/register/user',
            headers: { 
                'authkey': localStorage.getItem('mobileNo'), 
                'Content-Type': 'application/json'
            },
            data : data
        };
        
        axios(config)
        .then(function (response) {
            alert(response.data.message)
        })
        .catch(function (error) {
            alert("Something went wrong please try again later")
        });
        
    }

    const getData = (val) => {
        axios.get(`https://mr.bharatsmr.com/TSSPDCL/user/erodata?mobileNo=${val}`, {
            headers: {
                authkey:localStorage.getItem('mobileNo'),
                'content-type': 'application/json'
            }
        })
        .then(res => {
            console.log(res)
            inputRef.current.value = res.data.join(',') 
        })
        .catch(err => {
            inputRef.current.value = '' 
            setHint('New user')
        })
    }

    
    useEffect(() => {
        console.log(window.location.href)
        
        
    },[])


    return (
          <div>
            <Head>
              <title>Add User</title>
              <meta name="description" content="Powerthon" />
            </Head>
            <div className="count-card">
              <div className="card mt-3">
                <div className="card-body">
                    <form onSubmit={handleSubmit} className="row">
                        <div className="col-lg-4">
                            <label htmlFor="">Mobile Number</label>
                            <input type="text" onChange={(e) => {
                                getData(e.target.value)
                                setMobileNo(e.target.value)
                            }} placeholder='Mobile Number' className="form-control" />
                        </div>
                        <div className="col-lg-4">
                            <label htmlFor="">Ero List</label>
                            <input type="text"  ref={inputRef} onChange={(e) => setEroList(e.target.value)} placeholder={hint} className="form-control" />
                            <p>Example: <b>012,456</b></p>
                        </div>
                        <div className="col-lg-12">
                            <button type="submit" className="btn btn-success">Add User</button>
                        </div>
                        {/* <div className="col-lg-4">
                            <label htmlFor="">Search Mobile Number</label>
                            <input type="text" onChange={(e) => getData(e.target.value)} placeholder='Search Mobile Number' className="form-control" />
                        </div> */}
                    </form>
                </div>
              </div>
            </div>
          </div>
    );
}

export default Index;
