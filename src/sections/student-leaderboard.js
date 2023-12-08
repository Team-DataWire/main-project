import PropTypes from "prop-types";
import EllipsisVerticalIcon from "@heroicons/react/24/solid/EllipsisVerticalIcon";
import {
  Box,
  Card,
  CardActions,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIcon,
} from "@mui/material";

export const StudentLeaderboard = (props) => {
  const { products = [], sx } = props;
  // Images for first, second, and third place
  const trophies = [
    "/assets/leaderboard-pictures/trophy.png",
    "/assets/leaderboard-pictures/silver.png",
    "/assets/leaderboard-pictures/bronze.png",
  ];

  return (
    <Card sx={sx}>
      <CardHeader title="Leaderboard" />
      <List>
        {products.map((product, index) => {
          const hasDivider = index < products.length - 1;
          if (product.totalCount === 0) return null;
          return (
            <ListItem divider={hasDivider} key={index}>
              <ListItemAvatar>
                {index < 3 ? (
                  // Creates the component box for the top 3 contributors
                  <Box
                    component="img"
                    src={trophies[index]}
                    alt="top contributor trophy"
                    sx={{
                      borderRadius: 1,
                      height: 48,
                      width: 48,
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      borderRadius: 1,
                      height: 48,
                      width: 48,
                    }}
                  />
                )}
              </ListItemAvatar>
              <ListItemText
                // Displays first and last name of each contributor
                primary={`${product.firstName} ${product.lastName}`}
                primaryTypographyProps={{ variant: "subtitle1" }}
                // Displays number of posts for each contributor
                secondary={`Number of posts: ${product.totalCount}`}
                secondaryTypographyProps={{ variant: "body2" }}
              />
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}></CardActions>
    </Card>
  );
};

StudentLeaderboard.propTypes = {
  products: PropTypes.array,
  sx: PropTypes.object,
};
