import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Layout from "@/components/Layout";
import styles from "@/styles/Event.module.css";
import { API_URL } from "@/config/index";
import Link from "next/link";
import Image from "next/image";

export default function EventPage({ evt }) {
  let eventData = evt.attributes;
  const deleteEvent = (e) => {
    console.log("delete");
  };

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${eventData.id}`}>
            <a>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
          <a href='#' className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div>
        <span>
          {eventData.date} at {eventData.time}
        </span>
        <h1>{eventData.name}</h1>
        {eventData.image && (
          <div className={styles.image}>
            <Image src={eventData.image.data.attributes.formats.thumbnail.url} width={960} height={600} />
          </div>
        )}
        <h3>Performers:</h3>
        <p>{eventData.performers}</p>
        <h3>Description</h3>
        <p>{eventData.description}</p>
        <h3>Venue: {eventData.venue}</h3>
        <p>{eventData.address}</p>

        <Link href='/events'>
          <a className={styles.back}>{"<"} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events?_sort=date:ASC&populate=*`);
  const events = await res.json();
  console.log("events events events= ", events);
  const paths = events.data.map((evt) => ({
    params: { slug: evt.attributes.slug },
  }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/api/events?slug=${slug}&populate=*`);
  const events = await res.json();
  console.log("CURRENT events 55555555=", events.data[0]);
  return {
    props: { evt: events.data[0] },
    revalidate: 1,
  };
}

// export async function getServerSideProps({ query: { slug } }) {
//   const res = await fetch(`${API_URL}/api/events/${slug}`);
//   const events = await res.json();
//   console.log(slug);
//   return {
//     props: { evt: events[0] },
//   };
// }
