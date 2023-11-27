import Head from "next/head";
import { OverviewLatestOrders } from "src/sections/overview/overview-latest-orders";
import { OverviewLatestProducts } from "src/sections/overview/overview-latest-products";
import { OverviewSales } from "src/sections/overview/overview-sales";
import { subDays, subHours } from "date-fns";
import {
  Box,
  Badge,
  Container,
  IconButton,
  SvgIcon,
  Tooltip,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import BellIcon from "@heroicons/react/24/solid/BellIcon";
import getTopContributors from "./api/topContributors";
import getAuthor from "./api/getAuthor";
import getLatestPosts from "./api/latestPosts";

export const getServerSideProps = async () => {
  const contributors = await getTopContributors();
  const latestPosts = await getLatestPosts();
  
  return {
    props: {
      contributors: JSON.parse(JSON.stringify(contributors)),
      latestPosts: JSON.parse(JSON.stringify(latestPosts)),
    },
  };
};

const Page = (props) => (
  <>
    <Head>
      <title>Campuswire Analytics</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Box sx={{ position: "fixed", top: 20, right: 20, zIndex: 1000 }}>
        <Tooltip title="Urgent Questions">
          <IconButton
            onClick={() => {
              alert("clicked");
            }}
          >
            <Badge
              badgeContent={2}
              color="primary"
              sx={{
                "& .MuiBadge-badge": { height: 30, minWidth: 30, borderRadius: 10, fontSize: 20 },
              }}
            >
              <SvgIcon sx={{ fontSize: 50 }}>
                <BellIcon />
              </SvgIcon>
            </Badge>
          </IconButton>
        </Tooltip>
      </Box>
      <Container maxWidth="xl">
        <Grid xs={6} md={6} lg={6}>
          <OverviewLatestOrders orders={props.latestPosts} sx={{ height: "100%" }} />
        </Grid>
        <Grid xs={12} md={12} lg={8}>

          <Grid xs={6} md={6} lg={6}>
            <OverviewLatestOrders
              orders={[
                {
                  id: "f69f88012978187a6c12897f",
                  category: "Homework 1",
                  title: "Title",
                  body: "abcabacacacacac abcabacacacacac abcabacacacacac abcabacacacacac",
                },
                {
                  id: "9eaa1c7dd4433f413c308ce2",
                  category: "Homework 2",
                  title: "Title",
                  body: "abcabacacacacac abcabacacacacac abcabacacacacac abcabacacacacac",
                },
                {
                  id: "01a5230c811bd04996ce7c13",
                  category: "Homework 3",
                  title: "Title",
                  body: "abcabacacacacac abcabacacacacac abcabacacacacac abcabacacacacac",
                },
                {
                  id: "1f4e1bd0a87cea23cdb83d18",
                  category: "Homework 4",
                  title: "Title",
                  body: "abcabacacacacac abcabacacacacac abcabacacacacac abcabacacacacac",
                },
                {
                  id: "9f974f239d29ede969367103",
                  category: "Homework 5",
                  title: "Title",
                  body: "abcabacacacacac abcabacacacacac abcabacacacacac abcabacacacacac",
                },
                {
                  id: "ffc83c1560ec2f66a1c05596",
                  category: "Homework 6",
                  title: "Title",
                  body: "abcabacacacacac abcabacacacacac abcabacacacacac abcabacacacacac",
                },
              ]}
              sx={{ height: "100%" }}
            />
          </Grid>
          <Grid xs={12} md={6} lg={4}>
            <OverviewLatestProducts products={props.contributors} sx={{ height: "100%" }} />
          </Grid>
          <Grid xs={9} lg={9}>
            <OverviewSales
              chartSeries={[
                {
                  name: "Data",
                  data: [18, 16, 5, 8, 3, 14],
                },
              ]}
              sx={{ height: "100%" }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
