import BarChart from '../components/BarChart';
import React, { useDebugValue, useEffect, useState }  from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import { Line, defaults } from 'react-chartjs-2'
import './graph.css'
import Firebase from 'firebase/app'


import firebase from "../firebase/Firebase";
import { useDispatch, useSelector } from "react-redux";
import Header from "./headergraph";
import { authSignIn } from "../actions";
import logo from "../assets/images/design2.jpg";
import logo2 from "../assets/images/design2.jpg";
import { render } from '@testing-library/react';

const Graph1 = (props) => {


  const [umail, setUmail] = useState("");
    const isSigned = useSelector((state) => state.authSignIn);
    const [single, setSingle] = useState(props.location.data);
    const [patDetails, setDetails] = useState(single);
    const [patientDetails,setPatientDetails]=useState(single);
    // const [abtem,setAbtem] = useState(single);
    console.log(props.location)

  const [abtem,setAbtem] = useState(single.abtem);
  const [abloodglu,setAbloodglu]=useState(single.abloodglu);
  const [aoxy,setAoxy]=useState(single.aoxy);
  const [ahbeat,setAhbeat]=useState(single.ahbeat);
  const [doc, setDoc] = useState(single.doc);




    
    const [docDetails, setDocDetails] = useState("");
    // const [single, setSingle] = useState(props.location.state);
    // const [patDetails, setDetails] = useState(single);
    const [submit, setSubmit] = useState("");
    const [test, setTest] = useState("");
    const dispatch = useDispatch();
  
    // function graphdataa() {
    //   firebase.db
    //     .collection("graphdata")
    //     .where("doctor", "==", umail)
    //     .get()
    //     .then((querySnapshot) => {
    //       const pat = [];
    //       querySnapshot.forEach((doc) => {
    //         pat.push(doc.data());
    //       });
    //       setPatientDetails(pat);
    //     })
    //     .catch((error) => {
    //       console.log("Error getting documents: ", error);
    //     });
    // }
    

    function arraycon(heree){

      // const arrayone = patDetails.adbloodglu;
      


    }
    
    
    
    // function update() {
    //   firebase.db
    //     .collection("patients")
    //     .doc(doc)
    //     .update({
             
    //       abtem:abtem,
    //       abloodglu:abloodglu,
    //       aoxy:aoxy,
    //       ahbeat:ahbeat
          
    //     })
    //     // .then(() => {
    //     //   alert("Data Removed Successfully! Back to Dashboard!");
    //     //   // props.history.replace("/dashboard/doctordashboard");
    //     // });
        
    // }
  
    function logout() {
      dispatch(authSignIn(""));
      firebase.logout();
      props.history.push("/");
    }


    useEffect(() => {
      setUmail(isSigned.email);
      umail && doctor();
      // umail && graphdataa();
    }, [umail]);
    
    function doctor() {
      firebase.db
        .collection("doctors")
        .doc(umail)
        .get()
        
        .then((doc) => {
          if (doc.exists) {
            setDocDetails(doc.data());
            
          } else {
            alert("Please Select Correct Login Option");
            props.history.replace("/choice");
          }
        })
        .catch((error) => {
          alert("Error getting document:", error);
        });
    }

    
  // function removed() {
  //   setAoxy(null);
  //   setAbtem(null);
  //   setAhbeat(null);
  //   setAbloodglu(null);
    
    
        

  //     }
      
      function patperonal() {
        let output = [];
        [single].forEach((item) => {
          output.push(
            <div className="grid grid-flow-col grid-cols-5 grid-rows-1 bg-gray-400 gap-10 h-16 w-screen items-center justify-center text-xs sm:text-xs md:text-base md:font-semibold mb-4">
              <div className="text-black-500 ml-2">
                Patient Name : {item.firstname} {item.lastname}
              </div>
              <div className="text-black-500 ml-2">Sex : {item.sex}</div>
              <div className="text-black-500 ml-2">
                Conatct No : {item.contactno}
              </div>
              <div className="text-black-500 ml-2">DOB : {gettime(item.dob)}</div>
              <div className="text-black-500 ml-2">
                Allergy to Med : {item.allergy}
              </div>
            </div>
          );
        });
        return output;
      } 

      

      function dataextract(u){
      const slicee = u;
      const lastten= slicee.slice(-10);
      return lastten;
      }

      
      function detailsextract(x){
          const slicee = x;
          const lastten= slicee.slice(-10);
          const darrayone = lastten.map(dtt => {return gettime(dtt)});
          return darrayone;
         
          }
      

      
      function gettime(timestamp) {
        const date = new Date(timestamp).toDateString().slice(4);
        const time = new Date(timestamp).toLocaleTimeString("en-US");
        const time2 = time.split(":");
        const time3 = time.split(" ");
    
        let finalDate = date + ", " + time2[0] + ":" + time2[1] + " " + time3[1];
    
        return finalDate;
      }



   return  (
    <>
    <Header firstname={docDetails && docDetails.firstname} logout={logout.bind(this)} />

    {patperonal()}

    
        
    <div>
      <div className="flex items-center justify-center mb-5">
      <div className="w-1/2 mt-6">
      <div class="chart-container">
      {/* <BarChart label={detailsextract(patDetails.adbtem)} name={"Temperature History"} data={dataextract(patDetails && patDetails.abtem)}/> */}
    


<Line
        data={{
          labels: detailsextract(patDetails.adbtem),
          datasets: [
            {
              
              label: 'Temeprature History',
              
              

              data: dataextract(patDetails.abtem),
              options: { legend: {
                labels: {
                    fontSize: 0
                }
            },
            aspectRatio: 2},
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                
              ],
              borderWidth: 2,
            },
            {
            //   label: 'Quantity',
            //   data: [47, 52, 67, 58, 9, 50],
              // backgroundColor: 'orange',
              // borderColor: 'red',
            },
          ],
        }}
        height={100}
        width={200}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                
                ticks: {
                  
                  beginAtZero: false,
                },
              },
            ],
          },
          legend: {
            labels: {
              fontSize: 25,
            },
          },
        }}
      />
        </div>
        </div>
        
        <div className="w-1/2">
        
          <br></br>
          <div class="chart-container">
          <Line
        data={{
          labels: detailsextract(patDetails.adhbeat),
          datasets: [
            {
              
              label: 'Heartbeat history',
              
              

              data: dataextract(patDetails.ahbeat),
              options: { legend: {
                labels: {
                    fontSize: 0
                }
            },
            aspectRatio: 2},
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(54, 162, 235, 1)'
                
              ],
              borderWidth: 2,
            },
            ],
        }}
        height={100}
        width={200}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                
                ticks: {
                  
                  beginAtZero: false,
                },
              },
            ],
          },
          legend: {
            labels: {
              fontSize: 25,
            },
          },
        }}
      />
    {/* </div>
        </div>
        </div>

        <br></br>


      <div className="flex items-center justify-center mb-5">
      <div className="w-1/2">
        <div class="chart-container">
          <Line
        data={{
          labels: detailsextract(patDetails.adbloodglu),
          datasets: [
            {
              
              label: 'Blood Glucose History',
              
              

              data: dataextract(patDetails.abloodglu),
              options: { legend: {
                labels: {
                    fontSize: 0
                }
            },
            aspectRatio: 2},
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 159, 64, 1)'
                
              ],
              borderWidth: 2,
            },
            ],
        }}
        height={100}
        width={200}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                
                ticks: {
                  
                  beginAtZero: false,
                },
              },
            ],
          },
          legend: {
            labels: {
              fontSize: 25,
            },
          },
        }}
      />
    </div>
    </div>
        


        <br></br>

        
      <div className="w-1/2">
    <div class="chart-container">
          <Line
        data={{
          labels: detailsextract(patDetails.adoxy),
          datasets: [
            {
              
              label: 'Oxy Meter History',
              
              

              data: dataextract(patDetails.aoxy),
              options: { legend: {
                labels: {
                    fontSize: 0
                }
            },
            aspectRatio: 2},
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(75, 192, 192, 1)'
                
              ],
              borderWidth: 2,
            },
            ],
        }}
        height={100}
        width={200}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                
                ticks: {
                  
                  beginAtZero: false,
                },
              },
            ],
          },
          legend: {
            labels: {
              fontSize: 25,
            },
          },
        }}
      />
    </div>
    </div>
    </div>
    


    <div className="flex ">
      <div className="w-1/2 float-left ml-10">
          <br></br><br></br>
    <NavLink
          to={{ pathname: "/dashboard/doctorupdate",data: patDetails}}
          className={
            "primary-btn w-24 text-center bg-blue-200 hover:bg-blue-800 border-blue-500 hover:text-white" +
            (submit
              ? "hover:bg-sec-500 text-black"
              : "hover:bg-blue-800 hover:text-white  focus:outline-none")
          }
          block
          
          data={patDetails}
         
        >
          Back
        </NavLink>

        <NavLink
          to={{ pathname: "/dashboard/doctorupdate1",state: patDetails}}
          className={
            "primary-btn w-40 ml-10 text-center bg-blue-200 hover:bg-blue-800 border-blue-500 hover:text-white" +
            (submit
              ? "hover:bg-sec-500 text-black"
              : "hover:bg-blue-800 hover:text-white  focus:outline-none")
          }
          block
          
          data={patDetails}
         
        >
          Back to Dashboard
        </NavLink>

          </div>
          
       <br></br>

       {/* <div className="w-1/2 float-right mr-10">
          <br></br><br></br>
    <button
          
          className="primary-btn w-40 text-center bg-blue-200 hover:bg-blue-800 border-blue-500 float-right hover:text-white" 
            
          
          onClick={() => {
            removed();
            update();

          // onClick={remove} >        
            {/* // updatethird(); */}         
            {/* } }>
         Remove Data
        </button>

          </div> */}
          <br></br><br></br>
    
          </div>
          </div>

        <div class="flex items-center w-full justify-center mt-5">
       <div class="flex items-center justify-center "><img src={logo2} alt={"MIS logo"} className={"h-20 md:h-24"} /></div>
      </div>
        </>
  )
    }


export default Graph1;