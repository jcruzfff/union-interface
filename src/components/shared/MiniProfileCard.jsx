import { Link } from "react-router-dom";
import { Heading, Badge, Box, BadgeRow } from "@unioncredit/ui";
import { ReactComponent as External } from "@unioncredit/ui/lib/icons/external.svg";

import Avatar from "components/shared/Avatar";

export default function MiniProfileCard({ address }) {
  const addressEtherscanLink = "";

  if (!address) {
    // TODO: skeleton
    return null;
  }

  return (
    <Box mb="24px" align="center">
      <Box align="center">
        <Link to={`/profile/${address}`}>
          <Avatar size={54} address={address} />
        </Link>

        <Box direction="vertical" mx="12px">
          <Link to={`/profile/${address}`}>
            <Box>
              <Heading level={2} mb="4px">
                Primary
              </Heading>
              <Heading level={2} ml="4px" mb="4px" grey={500}>
                Secondary
              </Heading>
            </Box>
          </Link>
          <Box>
            <BadgeRow>
              <Badge mr="4px" color="grey" label="0x0000" />
              {/*<StatusBadge address={address} />*/}
            </BadgeRow>

            <a href={addressEtherscanLink} target="_blank" rel="noreferrer">
              <External width="24px" />
            </a>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
