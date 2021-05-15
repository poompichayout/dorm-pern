import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Typography
} from '@material-ui/core';
import axios from 'axios';

const ContractView = (props) => {
  const user = props.user;
  const [contract, setContract] = useState([]);

  const handleChange = (event) => {
    setContract({
      ...contract,
      [event.target.name]: event.target.value
    });
  };

  useEffect(() => {
    axios.get(`/api/user/contract/${user.ssn}`)
    .then(res => {
      setContract(res.data);
    }).catch(err => {
      console.error(err.message);
    })
  }, []);

  return (
    <form
      autoComplete="off"
      noValidate
      {...props}
    >
      <Card>
        <CardHeader
          subheader="รายละเอียด"
          title="สัญญาการจองห้องพัก"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
            <Typography color="textSecondary" gutterBottom>
              {`You have ${contract.length} Contract`}
            </Typography>
            </Grid>
            <Grid item md={6} xs={12}>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        {/* <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            variant="contained"
            type="submit"
            disabled={user.bname && user.roomid}
          >
            จองห้องพัก
          </Button>
        </Box> */}
      </Card>
    </form>
  );
};

export default ContractView;
