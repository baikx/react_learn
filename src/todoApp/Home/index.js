import { useState, useEffect, useRef } from "react";
import { API_GET_DARA } from "../global/constants";

import Edit from "./components/Edit";
import List from "./components/List";
import './index.css'

async function fetchData(setData) {
    const res = await fetch(API_GET_DARA);
    const { data } = await res.json();
    setData(data);
}

async function fetchSetData(data) {
    console.log({data});
    await fetch(API_GET_DARA, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ data })
    });
}

const Home = () => {

    const [data, setData] = useState([]);
    const submittingStatus = useRef(false);

    useEffect(() => {
        if (!submittingStatus.current) {
            return;
        }
        fetchSetData(data).then(data => submittingStatus.current = false)
    }, [data])

    useEffect(() => {
        fetchData(setData)
    }, [])

    return <div className="app">
        <Edit add={setData} submittingStatus={submittingStatus} />
        <List listData={data} deleteData={setData} submittingStatus={submittingStatus} />
    </div>
}

export default Home;