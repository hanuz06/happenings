import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Layout from "@/components/Layout";
import styles from "@/styles/Event.module.css";
import { API_URL } from "@/config/index";
import Link from "next/link";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

export default function EventPage({ evt }) {
  let eventData = evt[0].attributes;
  const router = useRouter();

  const deleteEvent = async (e) => {
    if (confirm("Are you surer?")) {
      const res = await fetch(`${API_URL}/api/events/${evt[0].id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        toast.success("Item deleted successfully!"); 
        router.push("/events");
      }
    }
  };

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt[0].id}`}>
            <a>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
          <a href='#' className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div>
        <span>
          {new Date(eventData.date).toLocaleDateString("en-US")} at{" "}
          {eventData.time}
        </span>
        <h1>{eventData.name}</h1>
        <ToastContainer />
        {eventData.image.data && (
          <div className={styles.image}>
            <Image
              src={eventData.image.data.attributes.formats.thumbnail.url}
              width={960}
              height={600}
            />
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
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();
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
  console.log("events in eventsPage2222= ", events);
  console.log("events in eventsPage2222= ", events);
  return {
    props: { evt: events.data.filter((evt) => evt.attributes.slug == slug) },
    revalidate: 1,
  };
}

// export async function getServerSideProps({ query: { slug } }) {
//   const res = await fetch(`${API_URL}/api/events/${slug}&populate=*`);
//   const events = await res.json();
//   return {
//     props: { evt: events.data.filter((evt) => evt.attributes.slug == slug) },
//   };
// }
