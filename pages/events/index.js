import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";
import Pagination from "@/components/Pagination";
import { API_URL, PER_PAGE } from "@/config/index";
import axios from "axios";

const qs = require("qs");

export default function EventPage({ events, paginationMeta }) {
  // const lastPage = Math.ceil(total / PER_PAGE);
  const { page, pageSize, pageCount, total } = paginationMeta;

  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
      <Pagination paginationMeta={paginationMeta} />
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  // Calculate start page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  const query = qs.stringify(
    {
      pagination: {
        page,
        pageSize: PER_PAGE,
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  // Fetch total
  // const totalEventCount = await axios(`${API_URL}/api/events/count`);
  // Fetch events
  const events = await axios(
    `${API_URL}/api/events?${query}&_sort=date:ASC&populate=*`
  );
  console.log("events99= ", events.data.meta.pagination);
  return {
    props: {
      events: events.data.data,
      paginationMeta: events.data.meta.pagination,
    },
  };
}
