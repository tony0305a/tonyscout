import React, { useEffect, useState } from "react";
import * as S from "./styled";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  ArcElement,
} from "chart.js";
import { M } from "../MasteryItem/styled";
ChartJS.register(
  ArcElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Roles = ({matchs, sId}) => {
    const [roles,setRoles] = useState([])
    const getIndex = (item) => {
        for (var i in item.participants) {
          if (item.participants[i].summonerId == sId) {
            return i;
          }
        }
      };
   
    useEffect(()=>{
        var TOP = 0
        var JUNGLE = 0
        var MIDDLE = 0
        var CARRY = 0
        var UTILITY = 0
        matchs.map((item)=>{

            
                switch(item.participants[getIndex(item)].individualPosition){
                    case 'TOP': 
                    TOP += 1; 
                    break ;
                    case 'JUNGLE': 
                    JUNGLE ++; 
                    break 
                    case 'MIDDLE': 
                    MIDDLE += 1; 
                    break 
                    case 'BOTTOM': 
                    CARRY += 1; 
                    break 
                    case 'UTILITY': 
                    UTILITY += 1; 
                    break 
               }
               setRoles([TOP,JUNGLE,MIDDLE,CARRY,UTILITY])
        })
    },[matchs])
    useEffect(()=>{
        console.log(roles)
    },[roles])
  const data = {
    labels: ["Top", "Jungle", "Mid", "Carry", "Utility"],
    datasets: [
      {
        label: "Roles",
        data: roles,
        backgroundColor: [
          "rgba(255, 0, 0, 1)",
          "rgba(0, 120, 0, 1)",
          "rgba(0, 0, 255, 1)",
          "rgba(255, 255, 0, 1)",
          "rgba(128, 0, 128, 1)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Games played`,
      },
    },
  };

  return (
    <S.Wrapper>
      <Doughnut options={options} data={data} />
    </S.Wrapper>
  );
};

export default Roles;
