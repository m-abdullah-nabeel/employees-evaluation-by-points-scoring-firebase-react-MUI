import { useState, useEffect } from "react";
import { Db } from "../../firebase-config/db";
import { collection, getDocs } from "firebase/firestore";
import { Paper, Typography, Button, TextField, Container, Stack, Grid } from '@mui/material';
import EvaluationTable from "./EvaluationTable";

function EvaluationList() {
    const [eval_data, setEval_data] = useState([]);
    const usersCollectionRef_eval_data = collection(Db, "evaluation data");
      
    useEffect(() => {
      const getEvaluationData = async () => {
        const data = await getDocs(usersCollectionRef_eval_data);
        console.log(data);
        console.log("check");
        console.log(data.docs);
        setEval_data(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
      getEvaluationData();
    }, []);

    return (
      <Container>      
        <Typography variant="h5" gutterBottom component="div">
          <h1>eval_data</h1>
        </Typography>
        <EvaluationTable title={["id", "being_eval", "evaluator", "feature", "points", "delete"]} body={eval_data}/>
    </Container>
    );
  }
  
  export default EvaluationList;
  