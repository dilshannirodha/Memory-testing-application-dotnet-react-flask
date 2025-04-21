import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import dayjs from 'dayjs';
import AppContext from "../contexts/AppContext";
import LoginRegister from './LoginRegister';

const EvaluationProgressChart = () => {
  const [data, setData] = useState([]);
  const { isLoggedIn } = useContext(AppContext);

  useEffect(() => {
    const token = localStorage.getItem('token');
 const id = parseInt(localStorage.getItem('id'), 10);
 
    axios.get(`http://localhost:5000/api/Evaluation/results/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        const formatted = response.data.map(item => ({
          ...item,
          createdAt: dayjs(item.createdAt).format('MMM D, HH:mm'),
        }));
        setData(formatted);
      })
      .catch(error => {
        console.error("Error fetching evaluation data:", error);
      });
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <div className=" rounded-xl  max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Evaluation Progress Over Time</h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="createdAt" angle={-45} textAnchor="end" height={60} />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="overallScore" stroke="#8884d8" strokeWidth={2} />
              <Line type="monotone" dataKey="contentAccuracy" stroke="#82ca9d" strokeWidth={2} />
              <Line type="monotone" dataKey="coverage" stroke="#ffc658" strokeWidth={2} />
              <Line type="monotone" dataKey="clarity" stroke="#ff8042" strokeWidth={2} />
              <Line type="monotone" dataKey="structure" stroke="#8dd1e1" strokeWidth={2} />
              <Line type="monotone" dataKey="terminology" stroke="#a4de6c" strokeWidth={2} />
              <Line type="monotone" dataKey="originality" stroke="#d0ed57" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-screen ">
          <div className="text-center bg-white rounded-lg w-full">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Please login to see your Progress</h3>
            <LoginRegister />
          </div>
        </div>
      )}
    </>
  );
};

export default EvaluationProgressChart;
