import Head from "next/head";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { TrendingPosts } from "src/sections/overview/trending-posts";
import { StudentLeaderboard } from "src/sections/overview/student-leaderboard";
import { CategoriesChart } from "src/sections/overview/post-categories-chart";
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
import { useState, useEffect } from "react";
import CalendarItem from "../components/calendar";

const Page = () => {
  const [date, setDate] = useState([new Date(2022, 8, 5), new Date(2022, 11, 15)]);
  const [contributors, setContributors] = useState([]);
  const [latestUnresolvedPosts, setLatestUnresolvedPosts] = useState([]);
  const [dayPosts, setDayPosts] = useState({
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
    Sunday: 0,
  });

  useEffect(() => {
    const fetchContributors = async () => {
      const contributors = await fetch(`/api/topContributors?date=${date}`).then((res) =>
        res.json()
      );
      setContributors(contributors);
    };

    const fetchLatestUnresolvedPosts = async () => {
      const posts = await fetch(`/api/latestUnresolved?date=${date}`).then((res) => res.json());
      setLatestUnresolvedPosts(posts);
    };

    const fetchDayPosts = async () => {
      const posts = await fetch(`/api/dayPosts?date=${date}`).then((res) => res.json());
      setDayPosts(posts);
    };

    fetchContributors();
    fetchLatestUnresolvedPosts();
    fetchDayPosts();
  }, [date]);

  return (
    <>
      <Head>
        <title>Campuswire Analytics</title>
      </Head>
      <Container maxWidth="xl">
        <Grid xs={12} md={6} lg={4}>
          <CalendarItem value={date} onChange={setDate} />
        </Grid>
      </Container>
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
            <TrendingPosts posts={[]} sx={{ height: "100%" }} title={"Trending Posts"} />
          </Grid>
          <Grid xs={12} md={12} lg={8}>
            <Grid xs={6} md={6} lg={6}>
              <TrendingPosts
                posts={latestUnresolvedPosts}
                sx={{ height: "100%" }}
                title={"Unresolved Posts"}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4}>
              <StudentLeaderboard products={contributors} sx={{ height: "100%" }} />
            </Grid>
            <Grid xs={9} lg={9}>
              <CategoriesChart
                chartSeries={[
                  {
                    name: "Data",
                    data: [18, 16, 5, 8, 3, 14],
                  },
                ]}
                sx={{ height: "100%" }}
                title={"Posts by Category"}
                labels={[
                  "Course Logistics",
                  "HW 1",
                  "HW 2",
                  "HW 3",
                  "HW 4",
                  "HW 5",
                  "HW 6",
                  "Final Exam",
                ]}
              />
            </Grid>
            <Grid xs={9} lg={9}>
              <CategoriesChart
                chartSeries={[
                  {
                    name: "Num Posts",
                    data: Object.values(dayPosts),
                  },
                ]}
                sx={{ height: "100%" }}
                title={"Posts by Day of Week"}
                labels={[
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ]}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
