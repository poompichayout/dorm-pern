import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Button,
  Grid,
  Typography,
  MenuItem,
  Menu
} from '@material-ui/core';
import { ChevronDown } from 'react-feather'
import axios from 'axios';
import url from 'src/utils/developURL';

const ContractView = (props) => {
  const [contracts, setContracts] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  useEffect(() => {
    let getContract = async () => {
      axios.get(url() + `/api/user/contract/${props.user.ssn}`)
      .then(res => {
        setContracts(res.data);
      })
      .catch(err => {
        console.error(err.message);
      })
    }

    getContract();
  }, []);

  return (
      <Card>
        <CardHeader
          subheader="รายละเอียด"
          title="สัญญาการจองห้องพัก"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
            <Typography color="textSecondary" gutterBottom>
              {`You have ${contracts.length} Contracts. ${contracts.filter((contract) => contract.status).length} Active.`}
            </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        {contracts.filter((contract) => contract.status).map((contract, index) => {
          return ( <>
              <Card>
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item md={12} xs={12}>
                      <Typography color="textSecondary" gutterBottom variant="subtitle1">
                      {`สัญญาหมายเลข ${('0000'+contract.contractno).slice(-4)}`}
                      </Typography>
                      <Typography color="textSecondary" gutterBottom variant="body1">
                        {`   ตึก: ${contract.bname}`}
                      </Typography>
                      <Typography color="textSecondary" gutterBottom variant="body1">
                        {`   หมายเลขห้อง: ${contract.roomid}`}
                      </Typography>
                      <Typography color="textSecondary" gutterBottom variant="body1">
                        {`   วันที่เริ่มสัญญา: ${contract.start_date}`}
                      </Typography>
                      <Typography color="textSecondary" gutterBottom variant="body1">
                        {`   วันสิ้นสุดสัญญา: ${contract.end_date}`}
                      </Typography>
                      <Typography color="textSecondary" gutterBottom variant="body1">
                        {`   ค่าเช่ารายเดือน: ${contract.rent} บาท`}
                      </Typography>
                      <Typography color="textSecondary" gutterBottom variant="body1">
                        {`   เงินประกัน: ${contract.deposit} บาท`}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              </>
        )}).slice(-2)}
        
      </Card>
  );
};

export default ContractView;
