import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography
} from '@material-ui/core';
import axios from 'axios';
import url from 'src/utils/developURL';

const ContractView = (props) => {
  const [contract, setContract] = useState([]);

  useEffect(() => {
    let getContract = async () => {
      axios.get(url() + `/api/user/contract/${props.user.ssn}`)
      .then(res => {
        setContract(res.data);
        console.log(contract);
      })
      .catch(err => {
        console.error(err.message);
      })
    }

    getContract();
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
