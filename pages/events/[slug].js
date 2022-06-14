import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Layout from "@/components/Layout";
// import EventMap from "@/components/EventMap";
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

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}></div>
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

        {/* <EventMap evt={evt} /> */}

        <Link href='/events'>
          <a className={styles.back}>{"<"} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
}

// export async function getStaticPaths() {
//   const events = await axios(`${API_URL}/api/events`);
//   const paths = events.data.data.map((evt) => ({
//     params: { slug: evt.attributes.slug },
//   }));
//   return {
//     paths,
//     fallback: true,
//   };
// }

// export async function getStaticProps({ params: { slug } }) {
//   const foundEvent = await axios(
//     `${API_URL}/api/events?filters[slug][$eq]=${slug}&_sort=date:ASC&populate=*`
//   );
//   return {
//     props: {
//       evt: { id: foundEvent.data.data[0].id, ...foundEvent.data.data[0].attributes },
//     },
//     revalidate: 1,
//   };
// }

export async function getServerSideProps({ params: { slug } }) {
  const foundEvent = await axios(
    `${API_URL}/api/events?filters[slug][$eq]=${slug}&_sort=date:ASC&populate=*`
  );
  return {
    props: {
      evt: {
        id: foundEvent.data.data[0].id,
        ...foundEvent.data.data[0].attributes,
      },
    },
  };
}
