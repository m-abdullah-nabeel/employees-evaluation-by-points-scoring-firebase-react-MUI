import { useState, useContext } from "react";
import { Slider, Grid, Paper, Typography, Container, Chip, 
  Card, CardActions, CardContent } from '@mui/material';
import { PointsCtx } from "../../providers/pointsctx";
import { SurveyCTx } from "../../providers/surveyctx";
import { updateDoc, serverTimestamp } from "firebase/firestore";
import { UserContext } from "../../providers/userCtx";

function UnitComponent(props) {
  const [identifier, setIdentifier] = useState('');
  const [slide_score, setSlide_score] = useState(0);
  const [feedComponent, setFeedComponent] = useState();
  const points = useContext(PointsCtx)
  const surveyCtx = useContext(SurveyCTx)
  const UserCtx = useContext(UserContext)
  const survey = surveyCtx.survey[0]['name']
  const PersonId = JSON.parse(props.person).id;
  const FeatureName = props.featureId;

  let newObj = {
    survey: survey,
    evaluator: UserCtx.Loguser.email, 
    being_eval: PersonId,
    feature: FeatureName,
    points: 0,
    timestamp: serverTimestamp(),
  }
  // var feedComponent2 = 0;

  const HandleChange = (e) => {
    let score_change = e.target.value;
    setSlide_score(score_change)
    let UniqId = PersonId.concat(FeatureName)
    setIdentifier(String(UniqId));
    // console.log(serverTimestamp())
    newObj = {
      survey: survey,
      evaluator: UserCtx.Loguser.email, 
      being_eval: PersonId,
      feature: FeatureName,
      points: score_change,
      timestamp: serverTimestamp(),
    }
    const test = {...points.pointsdata};
    // test[UniqId] = newObj;
    test[props.featureId] = newObj;
    points.setPointsdata(test);
    console.log(points.pointsdata)
    // const kis = Object.keys(points.pointsdata);
    // if (identifier!=='' && kis.includes(identifier)){
    //   feedComponent2 = String(points.pointsdata[identifier]['points']);
    //   setFeedComponent(feedComponent2)
    // }
  }

  return (
    <Grid item sm={12} md={6}>
      <Card elevation={10}>
        <CardContent>
        
        <Paper elevation={6} style={{padding: "10px"}}>
        Score Awarded: <Chip variant="outlined" label={(typeof(feedComponent) === 'undefined') ? 0 : feedComponent} color="info" />
        </Paper>

          <Typography gutterBottom variant="h5" component="div">
          Name: { JSON.parse(props.person).Name } <br />
          Email: { JSON.parse(props.person).Email } <br />
          </Typography>

          <Typography variant="body2" color="text.secondary">
          You can give a total scores of: {props.t_scores} <br />
          Your Unique Id is: {identifier} <br />
          Stats =&gt; Given: {feedComponent} <br />

          </Typography>
        </CardContent>

        <CardActions>
          <Container>
            <Slider defaultValue={0}  max={props.t_scores} step={0.5} 
              aria-label="Default" valueLabelDisplay="auto" 
              onChange={HandleChange}
            />
          </Container>
        </CardActions>

        <Typography variant="caption" display="block" gutterBottom>
          &nbsp;&nbsp;&nbsp;Id: { JSON.parse(props.person).id }
        </Typography>
      </Card>

    </Grid>
);
}

export default UnitComponent;