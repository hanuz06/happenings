import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";

export default function EventPage({ events }) {

  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events?_sort=date:ASC&populate=*`);
  const events = await res.json();
console.log("event page 1111= ", events.data[0].attributes.image.data.attributes.formats.thumbnail.url);
  return {
    props: { events: events.data },
    revalidate: 1,
  };
}
