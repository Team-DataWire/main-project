import Head from "next/head";
import { Layout as DashboardLayout } from "src/theme/layout";
import { Posts } from "src/sections/posts";
import { StudentLeaderboard } from "src/sections/student-leaderboard";
import { CategoriesChart } from "src/sections/post-categories-chart";
import Typography from "@mui/material/Typography";
import { Box, Container, Stack, Unstable_Grid2 as Grid } from "@mui/material";
import { useState, useEffect } from "react";
import CalendarItem from "../components/calendar";

const Page = () => {
  // global date variable assigned to the calendar element
  const [date, setDate] = useState([new Date(2022, 8, 5), new Date(2022, 11, 15)]);

  // state variables for the dashboard
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
  const [categories, setCategories] = useState({
    "Course Logistics": 0,
    "HW 1": 0,
    "HW 2": 0,
    "HW 3": 0,
    "HW 4": 0,
    "HW 5": 0,
    "HW 6": 0,
    "Final Exam": 0,
  });
  const [topPosts, setTopPosts] = useState([]);

  /**
   * Run all the fetching functions on page load
   * and whenever the date is updated from user
   * interaction on the calendar
   */
  useEffect(() => {
    console.log("new date: ", date);

    // fetches the top 3 contributors for the given date
    const fetchContributors = async () => {
      const contributors = await fetch(`/api/topContributors?date=${date}`).then((res) =>
        res.json()
      );
      setContributors(contributors);
    };

    // fetches the latest unresolved posts for the given date
    const fetchLatestUnresolvedPosts = async () => {
      const posts = await fetch(`/api/latestUnresolved?date=${date}`).then((res) => res.json());
      setLatestUnresolvedPosts(posts);
    };

    // fetches the number of posts for each day of the week for the given date
    const fetchDayPosts = async () => {
      const posts = await fetch(`/api/dayPosts?date=${date}`).then((res) => res.json());
      setDayPosts(posts);
    };

    // fetches the categories and number of posts for that category for the given date
    const fetchCategories = async () => {
      const categories = await fetch(`/api/categories?date=${date}`).then((res) => res.json());
      setCategories(categories);
    };

    // fetches the top posts for the given date
    const fetchTopPosts = async () => {
      const posts = await fetch(`/api/topPosts?date=${date}`).then((res) => res.json());
      setTopPosts(posts);
    };

    fetchContributors();
    fetchLatestUnresolvedPosts();
    fetchDayPosts();
    fetchCategories();
    fetchTopPosts();
  }, [date]);

  // Creating and formatting all webpage features.
  return (
    <>
      <Head>
        <title>Campuswire Analytics</title> {/*Set name of website as appears in browser tabs*/}
      </Head>
      <Container maxWidth="xl">
        {/*Grid which stores Welcome texts and displays them on top of each other*/}
        <Grid xs={12} md={6} lg={4}>
          <Typography variant="h1">Welcome to Campuswire Analytics!</Typography>
          <Typography variant="h5" gutterBottom>
            Built by Team DataWire
          </Typography>
          <Typography variant="h5" gutterBottom>
            Select a date range to begin!
          </Typography>
        </Grid>
        {/*Stack component stores Date Picker and Student Leaderboard to display them side by side*/}
        <Stack direction="row" spacing={10} alignItems="center" useFlexGap flexWrap="wrap">
          <CalendarItem value={date} onChange={setDate} /> {/*Date Picker Feature*/}
          <StudentLeaderboard
            products={contributors}
            sx={{ height: "100%", minWidth: "20%", maxWidth: "20%" }}
          />{" "}
          {/*Student Leaderboard Feature*/}
        </Stack>
      </Container>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3} direction="column" alignItems="center">
            <Grid xs={12}>
              {/*Creating and formatting Unresolved Posts Feature*/}
              {/*Access state var to get the most trending posts within the current date range*/}
              <Posts posts={topPosts} sx={{ height: "100%" }} title={"Trending Posts"} />
            </Grid>
            <Grid xs={12}>
              {/*Creating and formatting Unresolved Posts Feature*/}
              {/*Access state var to get latest unresolved posts within the current date range*/}
              <Posts
                posts={latestUnresolvedPosts}
                sx={{ height: "100%" }}
                title={"Unresolved Posts"}
              />
            </Grid>
            <Grid xs={9} lg={9}>
              {/*Creating and formatting Posts by Category Graph*/}
              {/*Get data by accessing state variables*/}
              <CategoriesChart
                chartSeries={[
                  {
                    name: "Num Posts",
                    data: Object.values(categories),
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
              {/*Creating and formatting Posts by Day of Week Graph*/}
              {/*Get data by accessing state variables*/}
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

//Apply layout.js formatting to the page
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
