import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Layout from "@/components/Layout";
import styles from "@/styles/Event.module.css";
import { API_URL } from "@/config/index";
import Link from "next/link";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import axios from "axios";

export default function EventPage({ evt }) {
  const router = useRouter();
  // const deleteEvent = async (e) => {
  //   if (confirm("Are you surer?")) {
  //     const res = await axios(`${API_URL}/api/events/${evt.id}`, {
  //       method: "DELETE",
  //     });

  //     if (!res.ok) {
  //       toast.error(res.data.message);
  //     } else {
  //       toast.success("Item deleted successfully!");
  //       router.push("/events");
  //     }
  //   }
  // };

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          {/* <Link href={`/events/edit/${evt.id}`}>
            <a>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
          <a href='#' className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a> */}
        </div>
        <span>
          {new Date(evt.date).toLocaleDateString("en-US")} at {evt.time}
        </span>
        <h1>{evt.name}</h1>
        <ToastContainer />
        {evt.image.data && (
          <div className={styles.image}>
            <Image
              src={evt.image.data.attributes.formats.thumbnail.url}
              width={960}
              height={600}
            />
          </div>
        )}
        <h3>Performers:</h3>
        <p>{evt.performers}</p>
        <h3>Description</h3>
        <p>{evt.description}</p>
        <h3>Venue: {evt.venue}</h3>
        <p>{evt.address}</p>

        <Link href='/events'>
          <a className={styles.back}>{"<"} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const events = await axios(`${API_URL}/api/events`);
  const paths = events.data.data.map((evt) => ({
    params: { slug: evt.attributes.slug },
  }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const foundEvent = await axios(
    `${API_URL}/api/events?filters[slug][$eq]=${slug}&_sort=date:ASC&populate=*`
  );
  return {
    props: {
      evt: { id: foundEvent.data.data[0].id, ...foundEvent.data.data[0].attributes },
    },
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
