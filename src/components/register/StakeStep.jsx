import "./StakeStep.scss";

import {
  Card,
  Divider,
  Stat,
  Dai,
  Box,
  Label,
  ButtonRow,
  Button,
} from "@unioncredit/ui";

export default function StakeStep() {
  return (
    <Card size="fluid" mb="24px">
      <Card.Header
        title="Stake DAI to earn UNION"
        subTitle="Your staked DAI is used to back vouches you provide to other members. It also accrues UNION at a rate relative to the amount of DAI you have staked."
      />
      <Card.Body>
        <Divider />
        <Box fluid mt="24px" mb="14px">
          <Box fluid>
            <Stat
              size="medium"
              label="Total Staked"
              value={
                <>
                  666.66 <Dai />
                </>
              }
            />
          </Box>
          <Box fluid>
            <Stat
              size="medium"
              label="UNION Earned"
              value={
                <>
                  0.66 <Dai />
                </>
              }
            />
          </Box>
        </Box>

        <Box
          className="StakeStep__Box__details"
          justify="space-between"
          pb="8px"
          mb="8px"
        >
          <Label m={0}>Membership Fee</Label>
          <Label m={0}>1.00 UNION</Label>
        </Box>
        <Box
          className="StakeStep__Box__details"
          justify="space-between"
          pb="8px"
          mb="12px"
        >
          <Label m={0}>Estimated daily earnings</Label>
          <Label m={0}>16.23 UNION</Label>
        </Box>

        <ButtonRow>
          <Button fluid label="Stake DAI" />
          <Button fluid variant="secondary" label="Withdraw" />
        </ButtonRow>
      </Card.Body>
    </Card>
  );
}
